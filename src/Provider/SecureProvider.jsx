import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

const SecurityProvider = ({ children }) => {
    const [isViolation, setIsViolation] = useState(false);

    useEffect(() => {
        // Only run in production to avoid blocking yourself while coding


        // 1. Block Context Menu & Shortcuts
        const handleEvents = (e) => {
            if (e.type === 'contextmenu') e.preventDefault();
            if (e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
                (e.ctrlKey && ['u', 's'].includes(e.key))) {
                e.preventDefault();
            }
        };

        // 2. Advanced Debugger Trap
        const trap = setInterval(() => {
            const startTime = performance.now();
            debugger;
            const endTime = performance.now();

            // If it took longer than 50ms, the debugger definitely paused the script
            if (endTime - startTime > 50) {
                setIsViolation(true);
            }
        }, 1000);

        // 3. Detect Console Opening via Resize
        const checkResize = () => {
            const threshold = 160;
            if (window.outerWidth - window.innerWidth > threshold ||
                window.outerHeight - window.innerHeight > threshold) {
                setIsViolation(true);
            }
        };

        window.addEventListener('contextmenu', handleEvents);
        window.addEventListener('keydown', handleEvents);
        window.addEventListener('resize', checkResize);

        return () => {
            window.removeEventListener('contextmenu', handleEvents);
            window.removeEventListener('keydown', handleEvents);
            window.removeEventListener('resize', checkResize);
            clearInterval(trap);
        };
    }, []);

    if (isViolation) {
        return (
            <div className="fixed inset-0 bg-slate-900 z-[9999] flex items-center justify-center p-6 text-center backdrop-blur-md">
                <div className="bg-white max-w-md w-full rounded-[32px] p-10 space-y-6 shadow-2xl">
                    <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto">
                        <ShieldAlert size={40} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900">Security Access Blocked</h2>
                        <p className="text-slate-500 text-sm">
                            Developer tools detected. Access to premium content is restricted while inspection tools are active.
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all"
                    >
                        Refresh & Resume
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default SecurityProvider;