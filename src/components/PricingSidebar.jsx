
import React, { useState } from 'react'
import { savePurchase } from '../services/payment';
import { AlertCircle, Play, ShoppingCart, Tag } from 'lucide-react';
import AuthModal from './AuthModal';
import StatusModal from './StatusModal';
import LoadingOverlay from './LoadingOverlay';

const PricingSidebar = (
    { course,
        sellingPrice,
        mrp,
        discountPercentage,
        handlingCharges,
        gstAmount,
        totalPayable,
        isInstallmentMode,
        setIsInstallmentMode,
        setShowCouponModal,
        discountAmount,
        appliedCoupon,
        setAppliedCoupon
    }
) => {

    const user = JSON.parse(localStorage.getItem("user"))
    const { email, name, PhoneNo, countrycode, UID } = user || {}
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    console.log(user)
    const handlePburchase = async () => {
        if (!user) {
            setShowAuthModal(true); // Open custom modal instead of alert
            return;
        }
        // 1. Prepare the payload based on your API schema
        const payload = {
            razorpayId: "", // Will be filled after Razorpay success
            courseId: course?.courseId,
            courseName: course?.courseName,
            uid: UID, // Get this from your Auth context/state
            phoneNo: PhoneNo,
            username: name,
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Example: 1 year
            isLifetime: course?.courseDuration?.unit === "Lifetime",
            paymentDetails: {
                sellingPrice: sellingPrice,
                mrp: mrp,
                discountAmount: discountAmount,
                amountPaid: totalPayable,
                internetHandlingCharge: handlingCharges,
                gst: gstAmount,
                isCouponApplied: !!appliedCoupon,
                couponCode: appliedCoupon ? {
                    code: appliedCoupon.couponCode,
                    couponCodeAmount: discountAmount,
                    isPercentage: appliedCoupon.discountType === 'percentage',
                    percentage: appliedCoupon.percentageDiscount?.percentage || 0
                } : null,
                isInstallment: false,
                installment: false ? {
                    isInstallment: isInstallmentMode,
                    totalInstallments: isInstallmentMode ? 2 : 1,
                    currentInstallmentNumber: 1,
                    amountPaid: isInstallmentMode ? totalPayable / 2 : totalPayable,
                    remainingBalance: isInstallmentMode ? totalPayable / 2 : 0,
                    nextDueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                } : null
            }
        };

        // 2. Razorpay Options
        const options = {
            key: "rzp_test_RQDayzrkVov4Ix",
            amount: totalPayable * 100, // Razorpay works in paise (multiply by 100)
            currency: countrycode == "+91" ? "INR" : "USD",
            name: "Bhavanam SC2C",
            description: `Purchase ${course?.courseName}`,
            handler: async function (response) {
                // 3. Add the payment ID to payload and save to backend
                const finalPayload = {
                    ...payload,
                    razorpayId: response.razorpay_payment_id
                };

                try {
                    const res = await savePurchase(finalPayload); // Your API call service
                    console.log(res)
                    if (res?.status == "success") {
                        setPaymentStatus('success'); // Trigger Success Modal
                    } else {
                        setPaymentStatus('fail');    // Trigger Failure Modal
                    }
                } catch (err) {
                    console.error("Error saving payment:", err);
                }
            },
            modal: {
                ondismiss: () => setIsProcessing(false)
            },
            prefill: {
                name,
                email,
                contact: PhoneNo
            },
            theme: { color: "#0D2A4A" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    return (
        <>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden space-y-6">
                <div className="aspect-video relative">
                    <img
                        src={course?.thumbnailUrl}
                        className="w-full h-full object-cover"
                        alt="Preview"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#2D61A1] shadow-2xl group-hover:scale-110 transition-transform">
                            <Play size={24} fill="currentColor" />
                        </div>
                        <span className="absolute bottom-4 text-white font-bold text-sm tracking-widest uppercase">
                            Preview This Course
                        </span>
                    </div>
                </div>

                <div className="p-3 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                Pricing Details
                            </span>
                            <button
                                onClick={() => setIsInstallmentMode(!isInstallmentMode)}
                                className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${isInstallmentMode
                                    ? "bg-[#2D61A1] text-white border-[#2D61A1]"
                                    : "text-slate-400 border-slate-200"
                                    }`}
                            >
                                Installments Available
                            </button>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-extrabold text-slate-900">
                                ₹{sellingPrice?.toLocaleString()}
                            </span>
                            {mrp > sellingPrice && (
                                <span className="text-lg text-slate-400 line-through">
                                    ₹{mrp?.toLocaleString()}
                                </span>
                            )}
                            {discountPercentage > 0 && (
                                <span className="text-sm font-bold text-green-600 ml-auto">
                                    Save {discountPercentage}%
                                </span>
                            )}
                        </div>

                        <div className="space-y-2 py-4 border-y border-slate-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Course Price</span>
                                <span className="font-medium text-slate-900">₹{sellingPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Handling Charges</span>
                                <span className="font-medium text-slate-900">+ ₹{handlingCharges}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">GST ({course?.pricing?.gstPercentage || 0}%)</span>
                                <span className="font-medium text-slate-900">+ ₹{gstAmount}</span>
                            </div>
                            {/* NEW: Coupon Applied Row */}
                            {appliedCoupon && (
                                <div className="flex justify-between text-sm text-green-600 font-bold bg-green-50 p-2 rounded-lg border border-dashed border-green-200">
                                    <span className="flex items-center gap-1">
                                        <Tag size={14} /> {appliedCoupon?.couponCode}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span>- ₹{discountAmount?.toLocaleString()}</span>
                                        <button
                                            onClick={() => setAppliedCoupon(null)}
                                            className="text-red-500 hover:text-red-700 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-dashed border-slate-200">
                                <span>Total Payable</span>
                                <span className="text-[#2D61A1]">₹{totalPayable.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button onClick={handlePburchase} className="w-full py-4 bg-[#0D2A4A] text-white rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-[#2D61A1] transition-all shadow-lg">
                                <ShoppingCart size={20} /> Buy Now
                            </button>
                            <button
                                onClick={() => setShowCouponModal(true)}
                                className="w-full py-3 bg-blue-50 text-[#2D61A1] rounded-xl font-bold flex items-center justify-center gap-2 border border-blue-100 hover:bg-blue-100 transition-all"
                            >
                                <Tag size={18} /> Have a coupon code?
                            </button>
                        </div>

                        {isInstallmentMode && (
                            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 space-y-3">
                                <div className="flex items-center gap-2 text-yellow-800 font-bold text-sm">
                                    <AlertCircle size={16} /> Pay in 2 Installments
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                                        <span>1st Installment (Now)</span>
                                        <span>₹779.19</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                                        <span>2nd Installment (After 2 wks)</span>
                                        <span>₹779.19</span>
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-yellow-500 text-white rounded-lg font-bold text-xs hover:bg-yellow-600 transition-all">
                                    Pay 1st Installment ₹779
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
            <StatusModal
                status={paymentStatus}
                onClose={() => {
                    setPaymentStatus(null);
                    if (paymentStatus === 'success') {
                        window.location.href = "/my-courses"; // Or use navigate() from react-router
                    }
                }}
            />
            <LoadingOverlay isProcessing={isProcessing} />
        </>
    );

}

export default PricingSidebar
