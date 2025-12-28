import { useEffect, useState } from "react";
import {
    Play,
    ChevronDown,
    ChevronUp,
    Lock,
    Unlock
} from "lucide-react";

import { getCourseVideos, getCourseVideosByFolder } from "../services/contents";
import VideoContentModal from "./VideoContentModal";

const VideoContent = ({ courseId }) => {
    const [folders, setFolders] = useState([]);
    const [openFolders, setOpenFolders] = useState({});
    const [contentByFolder, setContentByFolder] = useState({});
    const [loadingFolder, setLoadingFolder] = useState(null);

    const [showVodeosModal, setShowVideosModal] = useState(false);
    const [videoId, setVideoId] = useState(null);
    // 1️⃣ Load root folders
    useEffect(() => {
        const loadFolders = async () => {
            const res = await getCourseVideos(courseId);
            setFolders(res.data || []);
        };
        loadFolders();
    }, [courseId]);

    // 2️⃣ Toggle folder independently
    const toggleFolder = async (folderId) => {
        setOpenFolders((prev) => ({
            ...prev,
            [folderId]: !prev[folderId],
        }));

        // Fetch only once
        if (!contentByFolder[folderId]) {
            setLoadingFolder(folderId);
            const res = await getCourseVideosByFolder(courseId, folderId);

            setContentByFolder((prev) => ({
                ...prev,
                [folderId]: res.data || [],
            }));

            setLoadingFolder(null);
        }
    };

    // 3️⃣ Recursive renderer
    const renderContent = (items = []) => {
        if (!items || items.length === 0) {
            return (
                <p className="text-sm text-slate-400 ml-6">
                    No content available
                </p>
            );
        }

        return items.map((item, j) => {
            // 📁 Folder
            if (item.type === "folder") {
                return (
                    <div key={item.folderId} className="ml-6">
                        <div
                            onClick={() => toggleFolder(item.folderId)}
                            className="flex items-center justify-between text-sm font-semibold cursor-pointer py-2"
                        >
                            <div className="flex items-center gap-3 text-slate-600">
                                <Play size={16} className="text-[#2D61A1]" />
                                {item.name}
                            </div>

                            {openFolders[item.folderId] ? (
                                <ChevronUp size={16} />
                            ) : (
                                <ChevronDown size={16} />
                            )}
                        </div>

                        {openFolders[item.folderId] && (
                            <div className="ml-4 space-y-2">
                                {loadingFolder === item.folderId && (
                                    <p className="text-sm text-slate-400">Loading...</p>
                                )}

                                {/* 👇 Nested empty check */}
                                {renderContent(contentByFolder[item.folderId])}
                            </div>
                        )}
                    </div>
                );
            }

            // 🎬 Video / 📄 File
            return (
                <div
                    onClick={() => {
                        console.log("Free");
                        if (item?.isFree) {
                            console.log("Free");
                            setVideoId(item.videoId);
                            setShowVideosModal(true)
                        }

                    }}
                    key={item.videoId || item.fileId}
                    className="flex items-center justify-between text-sm group cursor-pointer ml-6"
                >
                    <div className="flex items-center gap-3 text-slate-600 group-hover:text-[#2D61A1]">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2D61A1]">
                            {String(j + 1).padStart(2, "0")}
                        </div>
                        {item.title || item.name}
                    </div>

                    <div className="flex items-center gap-3 text-slate-400">
                        {!item?.isFree ? (
                            <Lock size={16} className="text-red-500" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <p className="text-red-500 text-lg font-semibold">
                                    Free
                                </p>
                                <Unlock size={16} className="text-gray-600" />
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };


    return (
        <>
            <div className="space-y-5">
                {folders.map((folder, i) => (
                    <div
                        key={folder.folderId}
                        className="border border-slate-200 rounded-xl overflow-hidden"
                    >
                        {/* -------- Folder Header -------- */}
                        <div
                            onClick={() => toggleFolder(folder.folderId)}
                            className="flex items-center justify-between p-4 bg-slate-50 font-bold text-slate-700 cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <Play size={18} className="text-[#2D61A1]" />
                                Module 0{i + 1}: {folder.name}
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-400">
                                    {folder.videoCount} Videos • {folder.fileCount} Files
                                </span>

                                {openFolders[folder.folderId] ? (
                                    <ChevronUp size={18} />
                                ) : (
                                    <ChevronDown size={18} />
                                )}
                            </div>
                        </div>

                        {/* -------- Drawer Content -------- */}
                        {openFolders[folder.folderId] && (
                            <div className="p-4 space-y-3 bg-white">
                                {loadingFolder === folder.folderId && (
                                    <p className="text-sm text-slate-400">Loading content...</p>
                                )}

                                {contentByFolder[folder.folderId]?.length === 0 && (
                                    <p className="text-sm text-slate-400">
                                        No content available
                                    </p>
                                )}

                                {renderContent(contentByFolder[folder.folderId])}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showVodeosModal && <VideoContentModal type='video' contentid={videoId} setShowVideoModal={setShowVideosModal} />}
        </>
    );
};

export default VideoContent;
