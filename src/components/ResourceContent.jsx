import { useEffect, useState } from "react";
import {
    FileText,
    ChevronDown,
    ChevronUp,
    Lock,
    Unlock,
} from "lucide-react";

import {
    getCourseFiles,
    getCourseFilesByFolder,
} from "../services/contents";

const ResourceContent = ({ courseId }) => {
    const [folders, setFolders] = useState([]);
    const [rootFiles, setRootFiles] = useState([]);
    const [openFolders, setOpenFolders] = useState({});
    const [contentByFolder, setContentByFolder] = useState({});
    const [loadingFolder, setLoadingFolder] = useState(null);
    const [loading, setLoading] = useState(false)
    // 1️⃣ Load root data
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const res = await getCourseFiles(courseId);
                const data = res.data || [];
                setFolders(data.filter((i) => i.type === "folder"));
                setRootFiles(data.filter((i) => i.type === "file" && i.folderId === ""));

            } catch (error) {
                setLoading(false)
            } finally {
                setLoading(false)
            }
        };
        loadData();
    }, [courseId]);

    // 2️⃣ Toggle folder + fetch content
    const toggleFolder = async (folderId) => {
        setOpenFolders((prev) => ({
            ...prev,
            [folderId]: !prev[folderId],
        }));

        if (!contentByFolder[folderId]) {
            setLoadingFolder(folderId);
            const res = await getCourseFilesByFolder(courseId, folderId);

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
                    No files available
                </p>
            );
        }

        return items.map((item, i) => {
            // 📁 SUB FOLDER
            if (item.type === "folder") {
                return (
                    <div key={item.folderId} className="ml-6">
                        <div
                            onClick={() => toggleFolder(item.folderId)}
                            className="flex items-center justify-between py-2 cursor-pointer text-sm font-semibold"
                        >
                            <div className="flex items-center gap-3 text-slate-600">
                                <FileText size={14} className="text-[#2D61A1]" />
                                {"Lession " + i + 1 + ": " + item.name}
                            </div>

                            {openFolders[item.folderId] ? (
                                <ChevronUp size={16} />
                            ) : (
                                <ChevronDown size={16} />
                            )}
                        </div>

                        {openFolders[item.folderId] && (
                            <div className="ml-4">
                                {loadingFolder === item.folderId && (
                                    <p className="text-sm text-slate-400">
                                        Loading...
                                    </p>
                                )}

                                {renderContent(contentByFolder[item.folderId])}
                            </div>
                        )}
                    </div>
                );
            }

            // 📄 FILE
            return (
                <div
                    key={item.fileId}
                    className="flex items-center justify-between text-sm group cursor-pointer ml-6"
                >
                    <div className="flex items-center gap-3 text-slate-600 group-hover:text-[#2D61A1]">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <FileText size={14} />
                        {item.title}
                    </div>

                    {!item.isFree ? (
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
            );
        });
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <p className="text-center text-slate-500">Loading content...</p>
            </div>
        );
    }
    return (
        <div className="space-y-6">

            {/* ROOT FILES */}
            {rootFiles.length > 0 && (
                <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold text-slate-700">
                        Files
                    </h4>

                    {rootFiles.map((file, i) => (
                        <div
                            key={file.fileId}
                            className="flex items-center justify-between text-sm"
                        >
                            <div className="flex items-center gap-3 text-slate-600">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <FileText size={14} />
                                {file.title}
                            </div>

                            {!file.isFree ? (
                                <Lock size={16} className="text-red-500" />
                            ) : (
                                <Unlock size={16} className="text-gray-600" />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ROOT FOLDERS */}
            {folders.map((folder, i) => (
                <div
                    key={folder.folderId}
                    className="border border-slate-200 rounded-xl overflow-hidden"
                >
                    <div
                        onClick={() => toggleFolder(folder.folderId)}
                        className="flex items-center justify-between p-4 bg-slate-50 font-bold cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <FileText size={18} className="text-[#2D61A1]" />
                            Module {String(i + 1).padStart(2, "0")}: {folder.name}
                        </div>

                        {openFolders[folder.folderId] ? (
                            <ChevronUp size={18} />
                        ) : (
                            <ChevronDown size={18} />
                        )}
                    </div>

                    {openFolders[folder.folderId] && (
                        <div className="p-4 bg-white">
                            {renderContent(contentByFolder[folder.folderId])}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ResourceContent;
