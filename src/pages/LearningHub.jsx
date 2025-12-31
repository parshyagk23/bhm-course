import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
    PlayCircle, FileText, ChevronRight, Info, ChevronLeft, Folder, Sparkles, CheckCircle2
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getEnrolledCourseContent, getEnrolledCourseContentWithFolderId, updateCompletedContentList } from '../services/enrollment';


const LearningHub = () => {
    const videoRef = useRef(null);
    const { coursename } = useParams();

    const [modules, setModules] = useState([]);
    const [rootModules, setRootModules] = useState([])
    const [enrolledId, setEnrolledId] = useState([])
    const [loading, setLoading] = useState(false);
    const [activeContent, setActiveContent] = useState(null);
    const [history, setHistory] = useState([]);
    const [completedItems, setCompletedItems] = useState(new Set());
    // Stores folder data in memory
    // --- CACHE IMPLEMENTATION ---
    // Stores folder data in memory so moving back/forth is instant
    const [contentCache, setContentCache] = useState({});

    const fetchCourseContent = useCallback(async (folderId = null) => {
        // Check cache first
        const cacheKey = folderId || 'root';
        if (contentCache[cacheKey]) {
            setModules(contentCache[cacheKey]);
            return;
        }

        try {
            setLoading(true);
            let response;
            if (folderId) {
                response = await getEnrolledCourseContentWithFolderId(coursename, folderId);
            } else {
                response = await getEnrolledCourseContent(coursename);
                setRootModules(response.data);
            }

            setEnrolledId(response?.enrollmentId);

            const completedIds = new Set(
                (response?.completedcontent || []).map(item => item.contentId)
            );
            setCompletedItems(completedIds);

            if (response.status && response.data) {
                setModules(response.data);
                // Update Cache
                setContentCache(prev => ({ ...prev, [cacheKey]: response.data }));
            }
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    }, [coursename, contentCache]);

    useEffect(() => {
        fetchCourseContent();
    }, [coursename]);

    // Memoize the current index to avoid recalculating on every render
    const currentIndex = useMemo(() =>
        modules.findIndex(m => (m.videoId || m.fileId) === (activeContent?.videoId || activeContent?.fileId)),
        [modules, activeContent]);

    const handleNext = async () => {
        // 1. If there's another item in the current active list (modules)
        if (currentIndex < modules.length - 1) {
            const nextItem = modules[currentIndex + 1];
            if (nextItem.type === 'folder') {
                handleModuleClick(nextItem); // Enter the folder
            } else {
                setActiveContent(nextItem);
            }
        }
        // 2. If we are at the end of a folder's content, go to the next folder/item in the root
        else if (history.length > 0) {
            const lastFinishedFolder = history[history.length - 1];

            // Find where this folder sits in the main course structure
            const currentFolderIndex = rootModules.findIndex(m =>
                (m.folderId || m.id) === lastFinishedFolder.id
            );

            if (currentFolderIndex !== -1 && currentFolderIndex < rootModules.length - 1) {
                const nextRootItem = rootModules[currentFolderIndex + 1];

                // Clear sub-history (going back to root) and load the next main section
                setHistory([]);
                handleModuleClick(nextRootItem);
            } else {
                console.log("Course completed!");
            }
        }
    };

    const handlePrev = () => {
        // Case 1: Just move to the previous item in the current list
        if (currentIndex > 0) {
            const prevItem = modules[currentIndex - 1];
            if (prevItem.type === 'folder') {
                handleModuleClick(prevItem);
            } else {
                setActiveContent(prevItem);
            }
        }
        // Case 2: We are at the start of a folder, go to the previous folder's END
        else if (history.length > 0) {
            const currentFolder = history[history.length - 1];

            // Find where we are in the main course structure
            const currentFolderIndex = rootModules.findIndex(m =>
                (m.folderId || m.id) === currentFolder.id
            );

            if (currentFolderIndex > 0) {
                const prevRootItem = rootModules[currentFolderIndex - 1];

                // If the previous root item is a folder, we want to go to its LAST content
                if (prevRootItem.type === 'folder') {
                    navigateToFolderEnd(prevRootItem);
                } else {
                    setHistory([]); // Back to root
                    setActiveContent(prevRootItem);
                    setModules(rootModules);
                }
            } else {
                // We are at the very first item of the very first folder
                handleBack();
            }
        }
    };
    const navigateToFolderEnd = async (folderItem) => {
        const folderId = folderItem.folderId || folderItem.id;
        let folderData = contentCache[folderId];

        if (!folderData) {
            setLoading(true);
            try {
                const response = await getEnrolledCourseContentWithFolderId(coursename, folderId);
                folderData = response.data;
                setContentCache(prev => ({ ...prev, [folderId]: folderData }));
            } catch (e) {
                console.error(e);
                return;
            } finally {
                setLoading(false);
            }
        }

        if (folderData && folderData.length > 0) {
            setModules(folderData);
            setHistory([{ id: folderId, name: folderItem.name }]);
            setActiveContent(folderData[folderData.length - 1]); // Set to LAST item
        }
    };

    const handleVideoEnded = async () => {
        try {
            const payload = {
                contentId: activeContent?.videoId || activeContent?.fileId,
                type: activeContent?.type
            };
            const response = await updateCompletedContentList(enrolledId, payload);
            const updatedIds = new Set((response || []).map(item => item.contentId));
            setCompletedItems(updatedIds);
            setTimeout(() => {
                handleNext();
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleModuleClick = async (item) => {
        if (item.type === 'folder') {
            const folderId = item.folderId || item.id;
            const cacheKey = folderId;

            // Helper function to pick the first playable content in a folder
            const autoSelectFirstContent = (data) => {
                // Priority 1: First Video
                // Priority 2: First File
                // Priority 3: Nothing (don't set if empty)
                const firstPlayable = data.find(m => m.type === 'video') || data.find(m => m.type === 'file');
                if (firstPlayable) setActiveContent(firstPlayable);
            };

            // 1. Check cache first
            if (contentCache[cacheKey]) {
                setModules(contentCache[cacheKey]);
                setHistory(prev => [...prev, { id: folderId, name: item.name }]);
                autoSelectFirstContent(contentCache[cacheKey]);
                return;
            }

            // 2. Fetch from API if not in cache
            setLoading(true);
            try {
                const response = await getEnrolledCourseContentWithFolderId(coursename, folderId);
                if (response.status && response.data) {
                    const newContent = response.data;

                    // Update state and cache
                    setModules(newContent);
                    setContentCache(prev => ({ ...prev, [cacheKey]: newContent }));
                    setHistory(prev => [...prev, { id: folderId, name: item.name }]);

                    // Auto-select the first lesson/file
                    autoSelectFirstContent(newContent);
                }
            } catch (error) {
                console.error("Folder fetch error:", error);
            } finally {
                setLoading(false);
            }
        } else {
            // If it's a file or video, just set it as the active content
            setActiveContent(item);
        }
    };

    const handleBack = useCallback(() => {
        if (history.length > 0) {
            const newHistory = [...history];
            newHistory.pop();
            setHistory(newHistory);

            const parentFolder = newHistory.length > 0 ? newHistory[newHistory.length - 1] : null;
            const cacheKey = parentFolder ? parentFolder.id : 'root';

            if (contentCache[cacheKey]) {
                setModules(contentCache[cacheKey]);
                // Optional: set the active content to the folder we just exited
            } else {
                fetchCourseContent(parentFolder?.id);
            }
        }
    }, [history, contentCache, fetchCourseContent]);
    console.log(history)
    console.log(currentIndex)
    return (
        <div className="flex flex-col lg:flex-row h-screen lg:h-[90vh] bg-slate-50 lg:rounded-[40px] overflow-hidden border border-slate-100 shadow-inner my-0 lg:my-8">

            {/* LEFT SIDE: Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white order-1 lg:order-none overflow-hidden">

                {/* 1. Video/Player Section - Responsive Height */}
                <div className="relative w-full aspect-video lg:flex-1 bg-black flex items-center justify-center overflow-hidden">
                    {loading ? (
                        <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center">
                            <PlayCircle size={48} className="text-slate-700 animate-bounce" />
                        </div>
                    ) : activeContent ? (
                        activeContent.type === 'video' ? (
                            <video
                                ref={videoRef}
                                key={activeContent.videoUrl}
                                src={activeContent.videoUrl}
                                className="w-full h-full object-contain"
                                controls
                                onEnded={handleVideoEnded}
                                onContextMenu={(e) => e.preventDefault()}
                                controlsList="nodownload"
                                autoPlay
                            />
                        ) : (
                            <div onContextMenu={(e) => e.preventDefault()} className="w-full h-full p-2 lg:p-4">
                                <iframe
                                    src={`${activeContent.fileUrl}#toolbar=0`}
                                    className="w-full h-full rounded-lg border border-slate-200"
                                    title="Document Viewer"
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

                {/* 2. File Completion Toggle (Only for non-video files) */}
                {activeContent?.type === 'file' && (
                    <div className='flex justify-end items-center py-2 px-4 bg-white border-b border-slate-100'>
                        <button
                            onClick={handleVideoEnded}
                            disabled={completedItems?.has(activeContent?.fileId)}
                            className={`flex items-center gap-2 text-xs lg:text-sm font-bold transition-all px-4 py-2 rounded-xl cursor-pointer
                ${completedItems?.has(activeContent?.fileId)
                                    ? "bg-green-100 text-green-600 border border-green-200"
                                    : "text-white bg-green-600 hover:bg-green-700"} 
                disabled:opacity-50`}
                        >
                            <CheckCircle2 size={18} />
                            {completedItems?.has(activeContent?.fileId) ? "Completed" : "Mark as Completed"}
                        </button>
                    </div>
                )}

                {/* 3. Navigation Bar (Prev/Next) */}
                <div className="bg-white border-b border-slate-100 px-4 lg:px-8 py-3 lg:py-5 flex justify-between items-center shadow-sm z-10 shrink-0">
                    <button
                        onClick={handlePrev}
                        disabled={loading || (history.length === 0 && currentIndex <= 0)}
                        className="cursor-pointer flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-bold text-slate-600 hover:text-blue-600 disabled:opacity-20 transition-all"
                    >
                        <ChevronLeft size={20} /> <span className="">Previous</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={loading || (currentIndex >= modules.length - 1 && history.length === 0)}
                        className={`cursor-pointer flex items-center gap-2 px-6 lg:px-8 py-2 lg:py-3 rounded-2xl text-xs lg:text-sm font-bold shadow-lg transition-all
              ${(currentIndex >= modules.length - 1 && history.length === 0)
                                ? "bg-gray-400 text-white"
                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"}`}
                    >
                        Next <span className="hidden sm:inline">Lesson</span> <ChevronRight size={20} />
                    </button>
                </div>

                {/* 4. Session Info Footer */}
                <div className="p-3 lg:p-4 bg-slate-50 shrink-0">
                    <div className="bg-white p-3 lg:p-4 rounded-[20px] lg:rounded-[24px] border border-slate-200 flex items-center gap-3 lg:gap-4">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <Info size={18} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-xs lg:text-sm font-bold text-slate-800 truncate">
                                {activeContent?.name || "Welcome to the Course"}
                            </h3>
                            <p className="text-[8px] lg:text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate">
                                {history.map(h => h.name).join(' / ')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Curriculum Sidebar */}
            <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col h-[45vh] lg:h-full shrink-0">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-slate-50 shrink-0">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg lg:text-xl font-bold text-slate-800">Curriculum</h2>
                        {history.length > 1 && (
                            <button onClick={handleBack} className="cursor-pointer p-2 hover:bg-slate-50 rounded-lg text-blue-600 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                    </div>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
                        {
                            <React.Fragment>
                                <span className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-tight ${history.length != 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {history[history?.length - 1]?.name}
                                </span>
                                {history.length != 0 && <ChevronRight size={10} className="text-slate-300" />}
                            </React.Fragment>
                        }
                    </div>
                </div>

                {/* Scrollable Module List */}
                <div className="flex-1 overflow-y-auto bg-white">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4 px-2">
                                    <div className="w-10 h-10 shrink-0 bg-slate-100 animate-pulse rounded-xl" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-3/4 bg-slate-100 animate-pulse rounded" />
                                        <div className="h-2 w-1/2 bg-slate-100 animate-pulse rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        modules.map((item) => {
                            const itemId = item.videoId || item.fileId || item.folderId;
                            const isDone = completedItems?.has(itemId);
                            const isCurrent = itemId === (activeContent?.videoId || activeContent?.fileId || activeContent?.folderId);

                            return (
                                <button
                                    key={itemId || item.name}
                                    onClick={() => handleModuleClick(item)}
                                    className={`cursor-pointer w-full flex items-center gap-4 px-5 lg:px-6 py-4 border-b border-slate-50 transition-all hover:bg-slate-50 group 
                    ${isCurrent ? 'bg-blue-50/50' : ''}`}
                                >
                                    <div className={`w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded-xl flex items-center justify-center transition-all 
                    ${isDone ? 'bg-green-100 text-green-600' : isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {isDone ? <CheckCircle2 size={18} /> :
                                            item.type === 'folder' ? <Folder size={18} /> :
                                                item.type === 'file' ? <FileText size={18} /> :
                                                    <PlayCircle size={18} />}
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <p className={`text-xs lg:text-sm font-bold truncate ${isCurrent ? 'text-blue-900' : 'text-slate-700'}`}>
                                            {item.name || item.title}
                                        </p>
                                        <p className="text-[9px] lg:text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                                            {isDone ? "• Completed" : item.type}
                                        </p>
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