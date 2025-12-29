import React, { useEffect, useState, useRef } from 'react'
import { getContentbyContentId } from '../services/contents'
import SecurityProvider from '../Provider/SecureProvider';

// 1. Create a cache object outside the component to persist data in memory
const videoCache = {};

const VideoContentModal = ({ type, contentid, setShowVideoModal, userName = "Student" }) => {
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);

    const fetchContent = async () => {
        if (videoCache[contentid]) {
            setVideoData(videoCache[contentid]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await getContentbyContentId(type, contentid);

            if (response && response.data) {
                const s3Url = response.data.videoUrl;

                // --- CONVERT TO BLOB ---
                // const videoResponse = await fetch(s3Url);
                // const blob = await videoResponse.blob();
                // const blobUrl = URL.createObjectURL(blob);

                // Replace the real URL with the Blob URL
                const secureData = {
                    ...response.data,
                    videoUrl: s3Url,
                };

                videoCache[contentid] = secureData;
                setVideoData(secureData);
            }
        } catch (error) {
            console.error("Error securing video:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [type, contentid]);

    const handleContextMenu = (e) => e.preventDefault();

    return (
        <SecurityProvider>
            <div className="fixed inset-0 z-[60] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                    onClick={() => setShowVideoModal(false)}
                ></div>

                <div className="relative bg-white w-full my-4 max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-800">
                            {loading ? "Preparing Video..." : videoData?.title}
                        </h3>
                        <button
                            onClick={() => setShowVideoModal(false)}
                            className="text-slate-400 hover:text-slate-600 text-3xl leading-none"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="relative bg-black aspect-video flex items-center justify-center group" onContextMenu={handleContextMenu}>
                        {loading ? (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                <p className="text-white/60 text-sm">Loading content...</p>
                            </div>
                        ) : videoData?.videoUrl ? (
                            <>


                                <video
                                    ref={videoRef}
                                    controls
                                    autoPlay
                                    className="w-full h-full z-0"
                                    controlsList="nodownload"
                                    disablePictureInPicture
                                >
                                    <source src={videoData.videoUrl} type="video/mp4" />
                                </video>
                            </>
                        ) : (
                            <div className="text-white">Video not found.</div>
                        )}
                    </div>

                    {/* Visual indicator that content is protected */}
                    <div className="p-2 bg-slate-50 text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest border-t border-slate-100">
                        Encrypted Session • ID: {contentid} • Licensed to {userName}
                    </div>
                </div>
            </div>
        </SecurityProvider>
    )
}

export default VideoContentModal;