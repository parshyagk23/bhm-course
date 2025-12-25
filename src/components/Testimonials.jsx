import { Quote } from "lucide-react";

const feedbacks = [
    {
        name: "Neeharika Y",
        photo: "https://i.postimg.cc/02PWd3VH/Mentor3.jpg",
        role: "Architecture Student",
        company: "ABC College",
        text: "I learnt full course of 3DSMax+V ray and I have done one project. It is very useful lecture. Thank you mam and sir for providing such a good knowledge.",
        course: "3DSMax + V Ray",
    },
    {
        name: "Rahul Verma",
        photo: "https://i.postimg.cc/CKz6nqch/ind2.jpg",
        role: "Civil Engineering Student",
        company: "XYZ University",
        text: "The course helped me understand structural design deeply. Highly recommended for students!",
        course: "Structural Design Fundamentals",
    },
    {
        name: "Ananya Gupta",
        photo: "https://i.postimg.cc/63ZjYNsF/legal2.jpg",
        role: "Urban Planning Student",
        company: "PQR Institute",
        text: "Very practical and well explained course. I applied concepts in my project successfully.",
        course: "Urban Planning Basics",
    },
    {
        name: "Rajesh Kumar",
        photo: "https://i.postimg.cc/dV05gCP2/Pimage5.jpg",
        role: "Civil Engineering Student",
        company: "LMN University",
        text: "Excellent course with practical examples. Helped me a lot in my projects.",
        course: "Advanced Structural Design",
    },

];

const Testimonials = () => {
    return (
        <div className=" px-2 rounded-2xl border border-slate-100 max-w-4xl mx-auto" >
            <div className="mb-8">
                <div className="text-[#2D61A1] text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                    TESTIMONIALS
                </div>
                <h3 className="text-3xl font-black text-[#0D2A4A] tracking-tight">
                    See What Our Students Say
                </h3>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="w-[100%] flex flex-nowrap gap-6 overflow-x-auto py-4
                scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                {feedbacks.map((f, i) => (
                    <div
                        key={i}
                        className="bg-slate-50 w-[300px] shrink-0 p-6 rounded-2xl 
             border border-slate-100 flex flex-col gap-4 
             transition-all hover:bg-slate-100/50"
                    >
                        {/* Header: Photo + Name */}
                        <div className="flex items-start gap-3">
                            <img
                                src={f.photo}
                                alt={f.name}
                                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                            />

                            <div className="flex flex-col items-start" >
                                <div className="font-bold text-slate-900">{f.name}</div>
                                <div className="text-xs text-[#2D61A1] font-medium">
                                    {f.company}
                                </div>
                            </div>
                        </div>

                        {/* Quote Icon */}
                        {/* <div className="w-10 h-10 bg-[#2D61A1] rounded-full flex items-center justify-center text-white">
                            <Quote size={18} fill="currentColor" />
                        </div> */}

                        {/* Feedback */}
                        <p className="text-slate-600 italic text-sm leading-relaxed">
                            "{f.text}"
                        </p>

                        {/* Course Enrolled */}
                        <div className="mt-0 ">
                            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                {f.course}
                            </span>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
}

export default Testimonials
