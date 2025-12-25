import React, { useState, useEffect } from "react";

const InstructorCard = () => {
    // Array of instructors (mock data for Civil Engineers)
    const instructors = [
        {
            name: "Mrs. Priya Sharma",
            designation: "Senior Civil Engineer",
            image: "https://i.postimg.cc/63ZjYNsF/legal2.jpg",
            experience: "15+ Years Experience",
            bio: "Dr. Priya Sharma is a renowned civil engineer with over 15 years of experience in infrastructure and structural design. She has led multiple urban development projects and is passionate about mentoring the next generation of engineers.",
            skills: ["Structural Design", "Project Management", "Urban Planning", "AutoCAD", "STAAD Pro"],
        },
        {
            name: "Mr. Rajesh Verma",
            designation: "Structural Engineer",
            image: "https://i.postimg.cc/gjqMbq2D/m1.jpg",
            experience: "12+ Years Experience",
            bio: "Mr. Rajesh Verma specializes in designing sustainable and earthquake-resistant structures. He has worked on multiple high-rise building projects and enjoys teaching structural analysis.",
            skills: ["Structural Analysis", "Reinforced Concrete", "AutoCAD", "ETABS"],
        },
        {
            name: "Ms. Ananya Gupta",
            designation: "Project Manager - Civil",
            image: "https://i.postimg.cc/7LGmZyLb/Pimage6.jpg",
            experience: "10+ Years Experience",
            bio: "Ms. Ananya Gupta manages large-scale civil projects and ensures timely execution. She has expertise in urban planning and construction management.",
            skills: ["Project Management", "Urban Planning", "Construction Management", "STAAD Pro"],
        },
    ];

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
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 max-w-4xl mx-auto">
            <div className="mb-8">
                <h3 className="text-2xl font-black text-[#0D2A4A] tracking-tight">
                    About Course Creator
                </h3>
            </div>

            <div className="flex items-center gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                {/* LEFT: IMAGE */}
                <div className="shrink-0">
                    <div className="w-36 h-36 rounded-full border-4 border-slate-200 overflow-hidden shadow-md">
                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT: CONTENT */}
                <div className="flex flex-col items-start space-y-2">
                    <h4 className="text-xl font-extrabold text-slate-900 uppercase">
                        {instructor.name}
                    </h4>

                    <div className="text-sm font-bold text-[#2D61A1] uppercase tracking-wide">
                        {instructor.designation}
                    </div>

                    {instructor.experience && (
                        <span className="inline-block bg-blue-50 text-[#2D61A1] text-xs font-bold rounded-full border border-blue-100 px-3 py-1">
                            {instructor.experience}
                        </span>
                    )}

                    {instructor.bio && (
                        <p className="text-slate-600 text-left text-sm leading-relaxed max-w-2xl">
                            {instructor.bio}
                        </p>
                    )}

                    {instructor.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {instructor.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-4 gap-2">
                {instructors.map((_, idx) => (
                    <span
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? "bg-[#2D61A1]" : "bg-slate-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default InstructorCard;
