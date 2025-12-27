

const Testimonials = ({ testimonials }) => {

    return (
        <div className="px-4 sm:px-2 rounded-2xl border border-slate-100 max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8 text-left">
                <div className="text-[#2D61A1] text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                    TESTIMONIALS
                </div>
                <h3 className="text-2xl sm:text-2xl font-black text-[#0D2A4A] tracking-tight">
                    See What Our Students Say
                </h3>
            </div>

            {/* Horizontal Scroll Container with snap */}
            <div className="w-full flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                {testimonials.map((f, i) => (
                    <div
                        key={i}
                        className="bg-slate-50 flex-shrink-0 w-[80%] sm:w-[300px] snap-center p-4 sm:p-6 rounded-2xl border border-slate-100 flex flex-col gap-4 transition-all hover:bg-slate-100/50"
                    >
                        {/* Header: Photo + Name */}
                        <div className="flex items-start gap-3">
                            <img
                                src={f.photoUrl}
                                alt={f.name}
                                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                            />
                            <div className="flex flex-col items-start">
                                <div className="font-bold text-slate-900">{f.name}</div>
                                <div className="text-xs text-[#2D61A1] font-medium">{f.company}</div>
                            </div>
                        </div>

                        {/* Feedback */}
                        <p className="text-slate-600 italic text-sm text-center sm:text-base leading-relaxed">
                            "{f.feedback}"
                        </p>

                        {/* Course Enrolled */}
                        <div className="text-center" >
                            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                {f.courseEnrolled}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials
