
import React, { useState } from 'react'
import { savePurchase } from '../services/payment';
import { AlertCircle, Play, ShoppingCart, Tag } from 'lucide-react';
import AuthModal from './AuthModal';
import StatusModal from './StatusModal';
import LoadingOverlay from './LoadingOverlay';
import { getExpiryDateFromDuration, getNextDueDate } from '../helper';

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

    let { installment } = course;
    installment = installment?.[0] || null;
    // console.log("installment", installment)

    const totalInstallments = installment?.noOfInstallments || 1;

    const installmentAmount = Math.ceil(totalPayable / totalInstallments);

    const currentPayableAmount = isInstallmentMode
        ? installmentAmount
        : totalPayable;

    // console.log(user)
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
            expiryDate: course?.courseDuration?.unit !== "Lifetime" ? getExpiryDateFromDuration(course?.courseDuration) : null,
            isLifetime: course?.courseDuration?.unit === "Lifetime",
            paymentDetails: {
                sellingPrice: sellingPrice,
                mrp: mrp,
                discountAmount: discountAmount,
                amountPaid: currentPayableAmount,
                internetHandlingCharge: handlingCharges,
                gst: gstAmount,
                isCouponApplied: !!appliedCoupon,
                couponCode: appliedCoupon ? {
                    code: appliedCoupon.couponCode,
                    couponCodeAmount: discountAmount,
                    isPercentage: appliedCoupon.discountType === 'percentage',
                    percentage: appliedCoupon.percentageDiscount?.percentage || 0
                } : null,
                isInstallment: isInstallmentMode,
                installment: isInstallmentMode
                    ? {
                        isInstallment: true,
                        totalInstallments,
                        currentInstallmentNumber: 1,
                        amountPaid: installmentAmount,
                        remainingBalance:
                            totalPayable - installmentAmount,
                        duration: installment?.duration,
                        nextDueDate: getNextDueDate(
                            installment?.duration
                        )
                    }
                    : null
            }
        };

        // 2. Razorpay Options
        const options = {
            key: "rzp_test_RQDayzrkVov4Ix",
            amount: currentPayableAmount * 100, // Razorpay works in paise (multiply by 100)
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
                    setPaymentStatus(true)
                    const res = await savePurchase(finalPayload); // Your API call service
                    console.log(res)
                    if (res?.status == "success") {
                        setPaymentStatus(false)
                        setPaymentStatus('success'); // Trigger Success Modal
                    } else {
                        setPaymentStatus(false)
                        setPaymentStatus('fail');    // Trigger Failure Modal
                    }
                } catch (err) {
                    console.error("Error saving payment:", err);
                } finally {
                    setPaymentStatus(false)
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
                            {installment && <button
                                onClick={() => setIsInstallmentMode(!isInstallmentMode)}
                                className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${isInstallmentMode
                                    ? "bg-[#2D61A1] text-white border-[#2D61A1]"
                                    : "text-slate-400 border-slate-200"
                                    }`}
                            >
                                Installments Available
                            </button>}
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
                            <button onClick={handlePburchase} disabled={isInstallmentMode}
                                className={` ${isInstallmentMode && 'bg-[#0d2a4a3d]'} w-full py-4 bg-[#0D2A4A] text-white rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-[#2D61A1] transition-all shadow-lg`}>
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
                                    <AlertCircle size={16} /> Pay in {totalInstallments} Installments
                                </div>

                                <div className="space-y-1">
                                    {[...Array(totalInstallments)].map((_, index) => {
                                        const isFirst = index === 0;

                                        return (
                                            <div
                                                key={index}
                                                className={`flex justify-between text-xs font-semibold ${isFirst ? "text-slate-600" : "text-slate-400"
                                                    }`}
                                            >
                                                <span>
                                                    {index + 1}
                                                    {index === 0
                                                        ? "st Installment (Now)"
                                                        : index === 1
                                                            ? "nd Installment"
                                                            : index === 2
                                                                ? "rd Installment"
                                                                : "th Installment"}{" "}
                                                    {!isFirst && `(After ${installment?.duration})`}
                                                </span>

                                                <span>₹{installmentAmount}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => {
                                        if (!isInstallmentMode) {
                                            setIsInstallmentMode(true);
                                        }
                                        handlePburchase();
                                    }}
                                    className="w-full py-2 bg-yellow-500 text-white rounded-lg font-bold text-xs hover:bg-yellow-600 transition-all"
                                >
                                    Pay 1st Installment ₹{installmentAmount}
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
