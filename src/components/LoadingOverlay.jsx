import { ShoppingCart } from "lucide-react";

const LoadingOverlay = ({ isProcessing }) => {
    if (!isProcessing) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] transition-all m-0">
            <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-4 max-w-xs w-full animate-in zoom-in duration-200">
                {/* Modern Spinner */}
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-[#2D61A1] rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingCart size={20} className="text-[#2D61A1] animate-pulse" />
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-900">Processing Payment</h3>
                    <p className="text-sm text-slate-500">Please do not refresh or close this window.</p>
                </div>
            </div>
        </div>
    );
};


export default LoadingOverlay