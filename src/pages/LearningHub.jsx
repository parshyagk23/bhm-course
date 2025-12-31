import React, { useState, useRef, useEffect } from 'react';
import {
    PlayCircle, FileText, ChevronRight, Info, ChevronLeft, Folder, Sparkles, CheckCircle2
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getEnrolledCourseContent, getEnrolledCourseContentWithFolderId, updateCompletedContentList } from '../services/enrollment';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const LearningHub = () => {
    const videoRef = useRef(null);
    const { coursename } = useParams();

    const [modules, setModules] = useState([]);
    const [rootModules, setRootModules] = useState([])
    const [enrolledId, setEnrolledId] = useState([])
    const [loading, setLoading] = useState(false);
    const [activeContent, setActiveContent] = useState(null);
    const [history, setHistory] = useState([{ id: null, name: 'Curriculum' }]);
    const [completedItems, setCompletedItems] = useState(new Set());

    const fetchCourseContent = async (folderId = null) => {
        try {
            setLoading(true);
            let response;
            if (folderId) {
                response = await getEnrolledCourseContentWithFolderId(coursename, folderId)
            } else {
                response = await getEnrolledCourseContent(coursename);
                setRootModules(response.data)
            }
            setEnrolledId(response?.enrollmentId)
            const completedIds = new Set(
                (response?.completedcontent || []).map(item => item.contentId)
            );
            setCompletedItems(completedIds);
            if (response.status && response.data) setModules(response.data);
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCourseContent(); }, [coursename]);

    const currentIndex = modules.findIndex(m => (m.videoId || m.fileId) === (activeContent?.videoId || activeContent?.fileId));

    const handleNext = async () => {
        if (currentIndex < modules.length - 1) {
            const nextItem = modules[currentIndex + 1];
            if (nextItem.type === 'folder') {
                handleModuleClick(nextItem);
            } else {
                setActiveContent(nextItem);
            }
        } else if (history.length > 1) {
            const currentFolder = history[history.length - 1];
            const currentFolderIndex = rootModules.findIndex(m => m.folderId === currentFolder.id);
            if (currentFolderIndex !== -1 && currentFolderIndex < rootModules.length - 1) {
                const nextFolder = rootModules[currentFolderIndex + 1];
                const root = history[0];
                setHistory([root]);
                handleModuleClick(nextFolder);
            }
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevItem = modules[currentIndex - 1];
            if (prevItem.type === 'folder') {
                handleModuleClick(prevItem);
            } else {
                setActiveContent(prevItem);
            }
        } else if (history.length > 1) {
            handleBack();
        }
    };

    const handleVideoEnded = async () => {
        try {

            const payload = {
                contentId: activeContent?.type == 'video' ? activeContent?.videoId : activeContent?.fileId,
                type: activeContent?.type
            };
            const response = await updateCompletedContentList(enrolledId, payload);

            // FIX: Convert the returned array back to a Set of IDs
            const updatedIds = new Set(
                (response || []).map(item => item.contentId)
            );
            setCompletedItems(updatedIds);

            handleNext();

        } catch (error) {
            console.log(error);
        }
    };

    const handleModuleClick = async (item) => {
        if (item.type === 'folder') {
            setLoading(true);
            try {
                const response = await getEnrolledCourseContentWithFolderId(coursename, item.folderId);
                if (response.status && response.data) {
                    setModules(response.data);
                    setHistory(prev => [...prev, { id: item.folderId, name: item.name }]);
                    const firstVideo = response.data.find(m => m.type === 'video');
                    if (firstVideo) setActiveContent(firstVideo);
                }
            } catch (error) {
                console.error("Folder fetch error:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setActiveContent(item);
        }
    };

    const handleBack = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop();
            const prevFolder = newHistory[newHistory.length - 1];
            setHistory(newHistory);
            fetchCourseContent(prevFolder.id);
        }
    };

    console.log(activeContent)

    return (
        <div className="flex h-[90vh] bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-inner my-8">

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">

                {/* 1. Video/Player Section */}
                <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
                    {loading ? (
                        <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center">
                            <PlayCircle size={48} className="text-slate-700" />
                        </div>
                    ) : activeContent ? (
                        activeContent.type === 'video' ? (
                            <video
                                ref={videoRef}
                                key={activeContent.videoUrl}
                                src={activeContent.videoUrl}
                                className="w-full h-full"
                                controls
                                onEnded={handleVideoEnded}
                                onContextMenu={(e) => e.preventDefault()}
                                controlsList="nodownload"

                                autoPlay
                            />
                        ) : (
                            /* This handles PDF, DOCX, CSV, etc. */
                            <div onContextMenu={(e) => e.preventDefault()} className="w-full h-full border rounded-lg overflow-hidden">
                                <iframe
                                    src={`${activeContent.fileUrl}#toolbar=0`}
                                    className="w-full h-full"
                                    title="Document Viewer"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </div>
                        )

                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400">
                            <Sparkles size={40} className="text-blue-500 mb-4" />
                            <h2 className="text-xl font-bold text-slate-700">Select a Lesson</h2>
                        </div>
                    )}
                </div>
                {activeContent?.type === 'file' && <div className='flex justify-end items-center mt-5 mr-4' >
                    <button
                        onClick={handleVideoEnded}
                        disabled={completedItems?.has(activeContent?.fileId)}
                        className={` ${completedItems?.has(activeContent?.fileId) ? "bg-green-200 text-green-600" : "text-green-100 bg-green-600"} cursor-pointer flex items-center gap-2 text-sm font-bold  disabled:opacity-20 transition-all px-4 py-2 rounded-xl `}
                    >
                        <CheckCircle2 size={18} />  {completedItems?.has(activeContent?.fileId) ? "Completed" : "Mark as Completed"}
                    </button>
                </div>}
                {/* 2. PERSISTENT NAVIGATION BAR (Prev/Next) */}
                <div className="bg-white border-y border-slate-100 px-8 py-5 flex justify-between items-center shadow-sm z-10">
                    <button
                        onClick={handlePrev}
                        disabled={loading || (history.length === 1 && currentIndex <= 0)}
                        className="cursor-pointer flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 disabled:opacity-20 transition-all px-4 py-2 rounded-xl hover:bg-slate-50"
                    >
                        <ChevronLeft size={20} /> Previous Lesson
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={loading || (currentIndex >= modules.length - 1 && history.length === 1)}
                        className="cursor-pointer flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:opacity-20 transition-all"
                    >
                        Next Lesson <ChevronRight size={20} />
                    </button>
                </div>

                {/* 3. Session Info Footer */}
                <div className="p-4 bg-slate-50">
                    <div className="bg-white p-4 rounded-[24px] border border-slate-200 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <Info size={20} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-bold text-slate-800 truncate">
                                {activeContent?.name || "Welcome to the Course"}
                            </h3>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate">
                                {history.map(h => h.name).join(' / ')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Curriculum Sidebar */}
            <div className="w-96 bg-white border-l border-slate-100 flex flex-col h-full">
                <div className="p-4 border-b border-slate-50 shrink-0">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-slate-800">Curriculum</h2>
                        {history.length > 1 && (
                            <button onClick={handleBack} className="cursor-pointer p-2 hover:bg-slate-50 rounded-lg text-blue-600 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
                        {history.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <span className={`text-[10px] font-bold uppercase tracking-tight ${idx === history.length - 1 ? 'text-blue-600' : 'text-slate-400'}`}>{step.name}</span>
                                {idx < history.length - 1 && <ChevronRight size={10} className="text-slate-300" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            {[1, 2, 3,].map((i) => (
                                <div key={i} className="flex items-center gap-4 px-2">
                                    <div className="w-10 h-10 shrink-0 bg-slate-200 animate-pulse rounded-xl" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 bg-slate-200 animate-pulse rounded" />
                                        <div className="h-3 w-1/2 bg-slate-200 animate-pulse rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        modules.map((item) => {
                            const isDone = completedItems?.has(item?.videoId || item.fileId);
                            const isCurrent = (item.videoId || item.fileId) === (activeContent?.videoId || activeContent?.fileId);
                            return (
                                <button key={item.videoId || item.folderId || item.name} onClick={() => handleModuleClick(item)} className={`cursor-pointer w-full flex items-center gap-4 px-6 py-4 border-b border-slate-50 transition-all hover:bg-slate-50 group ${isCurrent ? 'bg-blue-50/50' : ''}`}>
                                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all ${isDone ? 'bg-green-100 text-green-600' : isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {isDone ? <CheckCircle2 size={18} /> : item.type === 'folder' ? <Folder size={18} /> : item?.type == "file" ? <FileText size={18} /> : <PlayCircle size={18} />}
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <p className={`text-sm font-bold truncate ${isCurrent ? 'text-blue-900' : 'text-slate-700'}`}>{item?.name || item?.title}</p>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{isDone ? "• Completed" : item.type}</p>
                                    </div>
                                    <ChevronRight size={16} className={`text-slate-300 group-hover:text-blue-600 transition-all ${isCurrent ? 'text-blue-600' : ''}`} />
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default LearningHub;