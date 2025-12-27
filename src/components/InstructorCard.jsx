import React, { useState, useEffect } from "react";

const InstructorCard = ({ instructors = [] }) => {
    // Array of instructors (mock data for Civil Engineers)


    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slide every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % instructors.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const instructor = instructors[currentIndex];

    return (
        <div className="bg-slate-50  rounded-2xl border border-slate-100  ">

            <div className="mb-6 sm:mb-8 text-left">
                <div className="text-[#2D61A1] text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                    LEARN FOR THE BEST
                </div>
                <h3 className="text-2xl sm:text-2xl font-black text-[#0D2A4A] tracking-tight">
                    Our World-Class Instructors
                </h3>
            </div>

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-3 bg-white p-4 sm:p-3 rounded-xl border border-slate-200 shadow-sm">

                {/* SOFTWARE LOGO (TOP RIGHT) */}
                {instructor?.softwareLogoUrl && (
                    <div className="absolute top-3 right-3 bg-white rounded-3xl p-1 shadow-md border border-slate-200">
                        <img
                            src={instructor.softwareLogoUrl}
                            alt="Software Logo"
                            className="w-30 h-5 object-cover"
                        />
                    </div>
                )}

                {/* LEFT: IMAGE */}
                <div className="shrink-0">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-slate-200 overflow-hidden shadow-md">
                        <img
                            src={instructor?.photoUrl}
                            alt={instructor?.name}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                </div>

                {/* RIGHT: CONTENT */}
                <div className="flex flex-col items-center sm:items-start space-y-2 text-center sm:text-left">
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase">
                        {instructor?.name}
                    </h4>

                    <div className="text-xs sm:text-sm font-bold text-[#2D61A1] uppercase tracking-wide">
                        {instructor?.designation}
                    </div>

                    {instructor?.education && (
                        <span className="inline-block bg-blue-50 text-[#2D61A1] text-xs font-bold rounded-full border border-blue-100 px-2 sm:px-3 py-1">
                            {instructor.education}
                        </span>
                    )}

                    {instructor?.description && (
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-2xl">
                            {instructor.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-4 gap-2">
                {instructors.map((_, idx) => (
                    <span
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? "bg-[#2D61A1]" : "bg-slate-300"}`}
                    />
                ))}
            </div>
        </div>

    );
};

export default InstructorCard;
