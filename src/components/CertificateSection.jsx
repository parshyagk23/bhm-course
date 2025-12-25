import React from "react";
// import { toast } from "react-toastify";
import { CheckCircle, Facebook, FacebookIcon, Instagram, InstagramIcon, Linkedin, LinkedinIcon, Smartphone, SmartphoneIcon, Youtube, YoutubeIcon } from "lucide-react";

const CertificateSection = () => {
    const shareText =
        "I just earned my Professional Certification from Royal Civil! Proud to advance my skills in BIM and Structural Engineering. #CivilEngineering #BIM #RoyalCivil";

    const bullets = [
        "Industry-recognized certification",
        "Shareable on LinkedIn",
        "Lifetime verification access",
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareText);
        toast.success("LinkedIn text copied to clipboard!");
    };

    return (
        <section className=" bg-white rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="mt-4 text-2xl font-bold text-slate-900 mb-6 uppercase tracking-tight">
                Earn a Professional Certificate
            </h2>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-2 px-6">
                {/* LEFT */}
                <div>

                    <p className=" text-slate-600 mb-8 leading-relaxed">
                        Validate your skills and expertise with our industry-recognized
                        certification. Perfect for adding to your resume and LinkedIn
                        profile.
                    </p>

                    <ul className="space-y-4 mb-8">
                        {bullets.map((bullet, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <CheckCircle
                                    size={18}
                                    className="text-green-500 shrink-0 mt-0.5"
                                />
                                <span className="font-semibold text-slate-700">
                                    {bullet}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* LinkedIn Share */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                            LinkedIn Ready
                        </h4>

                        <p className="text-sm text-slate-600 italic mb-4">
                            "{shareText}"
                        </p>

                        <button
                            onClick={copyToClipboard}
                            className="bg-blue-50 text-(--color-primary) text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-100 transition hover:cursor-pointer"
                        >
                            Copy LinkedIn Text
                        </button>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative group flex flex-col items-center">
                    <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden">
                        <img
                            src="https://i.postimg.cc/QMLfBkJk/certificate.png"
                            alt="Certificate Preview"
                            className="w-100 md:w-160 rounded-xl"
                        />
                    </div>

                    {/* ✅ NEW RECOGNITION TEXT */}
                    <p className="mt-2 text-center text-sm text-slate-600 max-w-xs">
                        Bhavanam&apos;s C2C certificates are recognized globally for technical
                        excellence.
                    </p>
                    <div className="mt-2 space-y-2">
                        <div className="text-slate-900 font-bold text-lg">Follow to Share</div>
                        <div className="flex items-center justify-center gap-4">
                            {/* Instagram */}
                            <button className="cursor-pointer w-8 h-8 bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#405DE6] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <InstagramIcon size={18} />
                            </button>
                            {/* WhatsApp */}
                            <button className="cursor-pointer w-8 h-8 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <SmartphoneIcon size={18} />
                            </button>
                            {/* YouTube */}
                            <button className="cursor-pointer w-8 h-8 bg-[#FF0000] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <YoutubeIcon size={18} />
                            </button>
                            {/* Facebook */}
                            <button className="cursor-pointer w-8 h-8 bg-[#1877F2] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <FacebookIcon size={18} fill="currentColor" />
                            </button>
                            {/* LinkedIn */}
                            <button className="cursor-pointer w-8 h-8 bg-[#0077B5] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <LinkedinIcon size={18} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificateSection;