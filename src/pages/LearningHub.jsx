import React, { useState, useRef, useEffect } from 'react';
import {
    PlayCircle, FileText, ChevronRight, Info, ChevronLeft, Folder, Sparkles, CheckCircle2
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getEnrolledCourseContent, getEnrolledCourseContentWithFolderId } from '../services/enrollment';

const LearningHub = () => {
    const videoRef = useRef(null);
    const { coursename } = useParams();

    // --- State Management ---
    const [modules, setModules] = useState([]);
    const [rootModules, setRootModules] = useState([])
    const [loading, setLoading] = useState(false);
    const [activeContent, setActiveContent] = useState(null);
    const [history, setHistory] = useState([{ id: null, name: 'Curriculum' }]);

    // This state tracks which videos have reached the end
    const [completedItems, setCompletedItems] = useState(new Set());

    // --- API Fetching ---
    const fetchCourseContent = async (folderId = null) => {
        try {
            setLoading(true);
            let response;
            if (folderId) {
                response = await getEnrolledCourseContentWithFolderId(coursename, folderId)
            }
            else {
                response = await getEnrolledCourseContent(coursename);
                setRootModules(response.data)
            }

            if (response.status && response.data) setModules(response.data);
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCourseContent(); }, [coursename]);

    // --- Navigation & Auto-Completion Logic ---
    const currentIndex = modules.findIndex(m => (m.videoId || m.fileId) === (activeContent?.videoId || activeContent?.fileId));


    // --- Advanced Cross-Folder Navigation ---
    const handleNext = async () => {
        // 1. If there's another item in the CURRENT view (modules), just play it
        if (currentIndex < modules.length - 1) {
            const nextItem = modules[currentIndex + 1];
            if (nextItem.type === 'folder') {
                handleModuleClick(nextItem);
            } else {
                setActiveContent(nextItem);
            }
        }
        // 2. If we are at the end of the current view, we need to "Jump"
        else if (history.length > 1) {
            // Find the folder we are currently in
            const currentFolder = history[history.length - 1];

            // Find where this folder sits in the root curriculum
            const currentFolderIndex = rootModules.findIndex(m => m.folderId === currentFolder.id);

            // If there is a folder after the one we just finished
            if (currentFolderIndex !== -1 && currentFolderIndex < rootModules.length - 1) {
                const nextFolder = rootModules[currentFolderIndex + 1];

                // Go back to root first to reset the view state, then enter the next folder
                const root = history[0];
                setHistory([root]);
                handleModuleClick(nextFolder);
            } else {
                console.log("End of Course");
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
        }
        // If at the start of a folder, go back to the parent level
        else if (history.length > 1) {
            handleBack();
        }
    };

    // Triggered ONLY when the video naturally finishes
    const handleVideoEnded = () => {
        if (activeContent?.videoId) {
            setCompletedItems(prev => new Set([...prev, activeContent.videoId]));
            // Optional: move to next video automatically
            handleNext();
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

                    // --- AUTO-PLAY FIRST VIDEO IN NEW FOLDER ---
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

    return (
        <div className="flex h-full bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-inner my-8">

            {/* Main Player Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {activeContent ? (
                    <div className="flex-1 flex flex-col">
                        <div className="relative aspect-video bg-black w-full overflow-hidden shadow-2xl">
                            {activeContent.type === 'video' ? (
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
                                <div className="flex flex-col items-center justify-center h-full text-white">
                                    <FileText size={48} className="text-slate-500 mb-4" />
                                    <p className="font-bold">{activeContent.name}</p>
                                </div>
                            )}
                        </div>

                        {/* Navigation Row */}
                        <div className="flex justify-between items-center px-8 py-4">
                            <button
                                onClick={handlePrev}
                                // Only disable if we are at the very root curriculum and index 0
                                disabled={history.length === 1 && currentIndex <= 0}
                                className="cursor-pointer flex items-center gap-2 text-sm font-bold text-slate-500 disabled:opacity-20 transition-all"
                            >
                                <ChevronLeft size={20} /> Previous
                            </button>

                            <button
                                onClick={handleNext}
                                // Only disable if we are at the very last item of the very last root module
                                disabled={
                                    currentIndex >= modules.length - 1 &&
                                    (history.length === 1 || rootModules.findIndex(m => m.folderId === history[history.length - 1].id) >= rootModules.length - 1)
                                }
                                className="cursor-pointer flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 disabled:opacity-20 transition-all"
                            >
                                Next Lesson <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <Sparkles size={40} className="text-blue-500 mb-4" />
                        <h2 className="text-xl font-bold text-slate-700">Select a Lesson</h2>
                    </div>
                )}

                {/* Bottom Info Bar - No Manual Buttons */}
                <div className="p-4">
                    <div className="bg-white p-4 rounded-[28px] border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><Info size={24} /></div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{activeContent?.name || "Session Overview"}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    {history.map(h => h.name).join(' / ')}
                                </p>
                            </div>
                        </div>
                        {/* Show status only if completed */}
                        {completedItems.has(activeContent?.videoId) && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl font-bold text-xs border border-green-100">
                                <CheckCircle2 size={16} /> COMPLETED
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Curriculum Sidebar */}
            {/* Curriculum Sidebar */}
            <div className="w-96 bg-white border-l border-slate-100 flex flex-col h-full">

                {/* 1. Static Header Section (Always Visible) */}
                <div className="p-4 border-b border-slate-50 shrink-0">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-slate-800">Curriculum</h2>
                        {history.length > 1 && (
                            <button
                                onClick={handleBack}
                                className="cursor-pointer p-2 hover:bg-slate-50 rounded-lg text-blue-600 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                    </div>

                    {/* Dynamic Breadcrumb Trail */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
                        {history.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <span className={`text-[10px] font-bold uppercase tracking-tight ${idx === history.length - 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {step.name}
                                </span>
                                {idx < history.length - 1 && <ChevronRight size={10} className="text-slate-300" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* 2. Scrollable List Section */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-16 w-full bg-slate-50 animate-pulse rounded-2xl" />)}
                        </div>
                    ) : (
                        modules.map((item) => {
                            const isDone = completedItems.has(item.videoId);
                            const isCurrent = (item.videoId || item.fileId) === (activeContent?.videoId || activeContent?.fileId);

                            return (
                                <button
                                    key={item.videoId || item.folderId || item.name}
                                    onClick={() => handleModuleClick(item)}
                                    className={`cursor-pointer w-full flex items-center gap-4 px-6 py-4 border-b border-slate-50 transition-all hover:bg-slate-50 group ${isCurrent ? 'bg-blue-50/50' : ''}`}
                                >
                                    {/* Icon Container */}
                                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all ${isDone ? 'bg-green-100 text-green-600' :
                                        isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {isDone ? <CheckCircle2 size={18} /> : item.type === 'folder' ? <Folder size={18} /> : <PlayCircle size={18} />}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 text-left min-w-0">
                                        <p className={`text-sm font-bold truncate ${isCurrent ? 'text-blue-900' : 'text-slate-700'}`}>
                                            {item?.name || item?.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                                                {isDone ? "• Completed" : item.type}
                                            </p>
                                        </div>
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