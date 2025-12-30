import React from "react";
// import { toast } from "react-toastify";
import { CheckCircle, Facebook, FacebookIcon, Instagram, InstagramIcon, Linkedin, LinkedinIcon, Smartphone, SmartphoneIcon, Youtube, YoutubeIcon } from "lucide-react";

const CertificateSection = () => {
    const shareText =
        "I just earned my Professional Certification from Bhavanamsc2c ! Proud to advance my skills in BIM and Structural Engineering. #CivilEngineering #BIM #Bhavanamsc2c";

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
        <section className="">

            <div className="mb-4 text-left">
                {/* <div className="text-[#2D61A1] text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                    LEARN FOR THE BEST
                </div> */}
                <h3 className="text-2xl sm:text-2xl font-black text-[#0D2A4A] tracking-tight">
                    Earn a Professional Certificate
                </h3>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* LEFT */}
                <div>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        {bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 sm:gap-3">
                                <CheckCircle
                                    size={16}
                                    className="text-green-500 shrink-0 mt-1 sm:mt-0.5"
                                />
                                <span className="font-semibold text-slate-700 text-sm sm:text-base">
                                    {bullet}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* LinkedIn Share */}
                    <div className="bg-slate-50 p-4 sm:p-3 rounded-xl border border-slate-200 text-center md:text-left">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3">
                            LinkedIn Ready
                        </h4>
                        <p className="text-sm text-slate-600 italic mb-3 sm:mb-4">"{shareText}"</p>
                        <a
                            onClick={copyToClipboard}
                            className="bg-blue-50 text-blue-700 text-sm font-bold px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                        >
                            Copy LinkedIn Text
                        </a>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative group flex flex-col items-center mt-6 md:mt-0">
                    <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden">
                        <img
                            src="https://i.postimg.cc/QMLfBkJk/certificate.png"
                            alt="Certificate Preview"
                            className="w-64 sm:w-72 md:w-full rounded-xl"
                        />
                    </div>

                    {/* Recognition Text */}
                    <p className="mt-3 text-center  text-sm text-slate-600 max-w-xs md:max-w-full">
                        Bhavanam&apos;s C2C certificates are recognized globally for technical excellence.
                    </p>

                    {/* Social Share as */}
                    <div className="mt-3  space-y-2 flex flex-col justify-center items-center">
                        <div className="text-slate-900 font-bold text-sm sm:text-lg text-center">
                            Follow to Share
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
                            <a
                                href="https://www.instagram.com/bhavanamsc2c_/"
                                target='_blank'
                                className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#405DE6] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <InstagramIcon size={16} />
                            </a>
                            <a className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <SmartphoneIcon size={16} />
                            </a>
                            <a href="https://x.com/bhavanamsc2c"
                                target="_blank"
                                className="bg-slate-800 cursor-pointer w-8 h-8 sm:w-9 sm:h-9  text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all " >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" fill="#FFFFFF" viewBox="0 0 50 50"><path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path></svg>
                            </a>
                            <a href="https://www.youtube.com/channel/UCzOGTExfo84ZCUXH1htqVtg"
                                target='_blank'
                                className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 bg-[#FF0000] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <YoutubeIcon size={16} />
                            </a>
                            <a
                                href="https://www.facebook.com/BhavanamsC2C/"
                                target='_blank'
                                className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 bg-[#1877F2] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <FacebookIcon size={16} fill="currentColor" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/bhavanamsc2c/"
                                target='_blank'
                                className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 bg-[#0077B5] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all">
                                <LinkedinIcon size={16} fill="currentColor" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default CertificateSection;