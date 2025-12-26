import React from 'react';
import { LogIn, X, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
                <div className="p-6 text-center space-y-4">
                    {/* Icon Header */}
                    <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#2D61A1]">
                        <ShieldAlert size={32} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">Authentication Required</h3>
                        <p className="text-slate-500">
                            Please sign in to your account to purchase this course and track your progress.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 pt-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full py-3 bg-[#0D2A4A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#2D61A1] transition-all"
                        >
                            <LogIn size={20} /> Login to Continue
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all border border-slate-200"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default AuthModal;