import { AlertCircle } from 'lucide-react';
import react from 'react'

const StatusModal = ({ status, onClose }) => {
    if (!status) return null;

    const isSuccess = status === 'success';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isSuccess ? (
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                        <AlertCircle size={40} />
                    )}
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {isSuccess ? "Payment Successful!" : "Payment Failed"}
                </h3>

                <p className="text-slate-500 mb-8 leading-relaxed">
                    {isSuccess
                        ? "Congratulations! Your course access has been activated. You can start learning now."
                        : "Something went wrong with the transaction. Please check your bank details or try again."}
                </p>

                <button
                    onClick={onClose}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-transform active:scale-95 shadow-lg ${isSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                    {isSuccess ? "Go to My Dashboard" : "Try Again"}
                </button>
            </div>
        </div>
    );
};


export default StatusModal