
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Play, FileText, CheckCircle, Clock, ShieldCheck,
  ChevronRight, Calendar, User, ShoppingCart, Tag, AlertCircle,
  Quote, DownloadCloud, Library, UserCheck, MessageSquare, Smartphone, Video, Bell, Medal,
  Phone, Mail, MapPin, Instagram, Youtube, Facebook, Linkedin
} from 'lucide-react';
import { getCourseByName } from '../services/course';
import InstructorCard from '../components/InstructorCard';
import Testimonials from '../components/Testimonials';
import CourseOverview from '../components/CourseOverview';
import CertificateSection from '../components/CertificateSection';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'content'>('overview');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isInstallmentMode, setIsInstallmentMode] = useState(false);
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true);

  const feedbacks = [
    { name: "Neeharika.Y", role: "Architecture Student", text: "I learnt full course of 3DSMax+V ray and I have done one project. It is very useful lecture. Thank you mam and sir for providing such a good knowledge." },
    { name: "Rahul Sharma", role: "Civil Engineer", text: "The AutoCAD Architectural course is exceptionally well-structured. The instructor's depth of knowledge is impressive. Highly recommended for beginners!" },
    { name: "Sneha Kapur", role: "Structural Designer", text: "Best platform for civil software learning. The Vasthu concepts explained are practical and industry-relevant." }
  ];

  const handleCopyLinkedIn = () => {
    const text = "I just earned my Professional Certification from Royal Civil! Proud to advance my skills in BIM and Structural Engineering. #CivilEngineering #BIM #RoyalCivil";
    navigator.clipboard.writeText(text);
    alert("LinkedIn post text copied to clipboard!");
  };

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await getCourseByName(id);
      setCourse(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const parseCourseDescription = (description = "") => {
    return description
      .split("\n")
      .map(item => item.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);
  };


  const descriptionList = parseCourseDescription(course?.courseDescription);
  const pricing = course?.pricing || {};

  const sellingPrice = pricing?.sellingPrice || 0;
  const mrp = pricing.mrp || sellingPrice;
  const discountPercentage =
    mrp > 0 ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

  const handlingCharges = pricing.internetHandlingCharges || 0;
  const gstAmount = Math.round((sellingPrice * (pricing.gstPercentage || 0)) / 100);
  const totalPayable = sellingPrice + handlingCharges + gstAmount;

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "content", label: "Content" },
    { key: "resources", label: "Resources" },
    { key: "quizzes", label: "Quizzes" },
  ];


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-48 bg-slate-200 rounded animate-pulse"></div>
          </div>

          <div className="h-96 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main Info */}
          <div className=" w-[70%] flex-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D61A1] tracking-widest uppercase">
                Course <ChevronRight size={14} /> {course?.category[0]}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D2A4A]">{course?.courseName}</h1>
              <p className="text-slate-600 text-lg leading-relaxed font-semibold">
                LEARN HOW TO PREPARE YOUR OWN ARCHITECTURAL PLANS
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 border-y border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-[#2D61A1] rounded-full flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold">Course Validity</div>
                    <div className="font-bold">{course?.courseDuration?.value + " " + course?.courseDuration?.unit}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-[#2D61A1] rounded-full flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold">Daily Updates</div>
                    <div className="font-bold">Job Notifications</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-[#2D61A1] rounded-full flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold">Certification</div>
                    <div className="font-bold">ISO Certified</div>
                  </div>
                </div>
              </div>

              <div className="sticky top-[80px] z-40 bg-white">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-3 border-b border-slate-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300
          ${activeTab === tab.key
                          ? "bg-[#2D61A1] text-white shadow-md shadow-blue-900/20"
                          : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === "overview" && (
                  <>
                    <CourseOverview descriptionList={descriptionList} />
                    <InstructorCard />
                    <CertificateSection />
                    <Testimonials />
                    {/* Request Callback & Get In Touch Section */}
                    <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm mt-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12"> {/* Request a Callback */}
                        <div className="space-y-8"> <h3 className="text-3xl font-extrabold text-[#0D2A4A]">Request a Callback</h3>
                          <div className="space-y-4"> {["Connect with our team", "Resolve issues quickly",
                            "Get answers to your queries",
                            "Discuss details about courses",
                            "Receive personalized guidance"].map((item, i) =>
                            (<div key={i} className="flex items-center gap-3">
                              <div className="text-green-500 shrink-0"> <CheckCircle size={24} /> </div>
                              <span className="text-lg font-medium text-slate-700">{item}</span> </div>))}
                          </div> <button className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-2 bg-[#D9534F] text-white rounded-xl font-bold hover:bg-[#c94b48] transition-all shadow-lg text-lg">
                            <Phone size={22} className="fill-white" /> Book Appointment Now </button>
                        </div> {/* Get In Touch */} <div className="space-y-4"> <div>
                          <h3 className="text-2xl font-extrabold text-[#0D2A4A] mb-2">Get In Touch</h3>
                          <p className="text-slate-500 font-medium text-lg">Feel free to reach out to us, we're here to help you.</p> </div>
                          <div className="space-y-2"> <div className="flex items-center gap-2">
                            <div className="w-12 h-12 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0"> <Phone size={24} /> </div>
                            <div> <div className="text-xs font-semibold text-left text-slate-400 uppercase tracking-widest mb-1">Call Us</div>
                              <div className="text-[16px] font-semibold text-left text-slate-900">+91 9110-363-544</div> </div>
                          </div> <div className="flex items-center gap-4"> <div className="w-12 h-12 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0"> <Mail size={24} /> </div>
                              <div> <div className="text-xs font-semibold text-left text-slate-400 uppercase tracking-widest mb-1">Email Us</div>
                                <div className="text-[16px] font-semibold text-left text-slate-900">info@bhavanamsc2c.com</div> </div> </div>
                            <div className="flex items-start gap-4"> <div className="w-12 h-12 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0"> <MapPin size={24} /> </div>
                              <div> <div className="text-xs font-semibold text-left text-slate-400 uppercase tracking-widest mb-1">Location</div>
                                <div className="text-[16px] font-semibold text-left text-slate-900 leading-tight"> 16-2-755/8/C, H.S.Meadows, Gaddlannaram, Dilshukhnagar, Hyderabad, Telangana - 500060 </div> </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "content" && (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="p-5 border border-slate-200 rounded-2xl bg-white hover:shadow-md transition"
                      >
                        <div className="font-bold text-slate-800">
                          Module {i}: Structural Design Basics
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          5 Videos • 2 PDFs • 1 Quiz
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="text-center py-16 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="font-semibold text-slate-600">
                      Resources will unlock after enrollment
                    </p>
                  </div>
                )}

                {activeTab === "quizzes" && (
                  <div className="text-center py-16 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="font-semibold text-slate-600">
                      Quizzes unlock once you start the course
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Pricing Sidebar */}
          <div className="w-[30%] lg:w-96 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
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

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      Pricing Details
                    </span>

                    {/* KEEP INSTALLMENT LOGIC AS IS */}
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

                  {/* PRICE HEADER */}
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

                  {/* BREAKDOWN */}
                  <div className="space-y-2 py-4 border-y border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Course Price</span>
                      <span className="font-medium text-slate-900">
                        ₹{sellingPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Handling Charges</span>
                      <span className="font-medium text-slate-900">
                        + ₹{handlingCharges}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        GST ({pricing.gstPercentage || 0}%)
                      </span>
                      <span className="font-medium text-slate-900">
                        + ₹{gstAmount}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-dashed border-slate-200">
                      <span>Total Payable</span>
                      <span className="text-[#2D61A1]">
                        ₹{totalPayable.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <button className="w-full py-4 bg-[#0D2A4A] text-white rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-[#2D61A1] transition-all shadow-lg">
                    <ShoppingCart size={20} /> Buy Now
                  </button>

                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="w-full py-3 bg-blue-50 text-[#2D61A1] rounded-xl font-bold flex items-center justify-center gap-2 border border-blue-100 hover:bg-blue-100 transition-all"
                  >
                    <Tag size={18} /> Have a coupon code?
                  </button>
                </div>

                {/* INSTALLMENT UI — LEFT AS IS */}
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

        </div>
      </div >

      {/* Coupon Modal */}
      {
        showCouponModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCouponModal(false)}></div>
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg">Apply Coupons</h3>
                <button onClick={() => setShowCouponModal(false)} className="text-slate-400 hover:text-slate-600">×</button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter coupon code" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2D61A1] outline-none font-bold uppercase" />
                  <button className="px-6 py-3 bg-[#0D2A4A] text-white rounded-xl font-bold hover:bg-[#2D61A1] transition-all">APPLY</button>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Available Coupons</div>
                  <div className="p-4 border border-dashed border-blue-200 bg-blue-50 rounded-xl flex items-center justify-between group cursor-pointer hover:border-blue-400 transition-all">
                    <div>
                      <div className="font-extrabold text-[#2D61A1]">TEST10</div>
                      <div className="text-xs text-slate-500">10% Off up to ₹500</div>
                    </div>
                    <button className="text-sm font-bold text-[#2D61A1] hover:underline">APPLY</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default CourseDetail;

