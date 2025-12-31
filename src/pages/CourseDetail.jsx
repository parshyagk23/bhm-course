import React, { use, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle, Clock, ShieldCheck,
  ChevronRight, Calendar, ShoppingCart,
  Phone, Mail, MapPin,
} from 'lucide-react';
import { getCourseByName } from '../services/course';
import InstructorCard from '../components/InstructorCard';
import Testimonials from '../components/Testimonials';
import CourseOverview from '../components/CourseOverview';
import CertificateSection from '../components/CertificateSection';
import VideoContent from '../components/VideoContent';
import ResourceContent from '../components/ResourceContent';
import { getCoupon, getCouponById } from '../services/coupon';
import PricingSidebar from '../components/PricingSidebar';
import { parseCourseDescription } from '../helper';
import SecurityProvider from '../Provider/SecureProvider';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isInstallmentMode, setIsInstallmentMode] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPricingDrawer, setShowPricingDrawer] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"))
  const { PhoneNo } = user || ""

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await getCourseByName(id, PhoneNo);
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



  const descriptionList = parseCourseDescription(course?.courseDescription);



  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "content", label: "Content" },
    { key: "resources", label: "Resources" },
    { key: "quizzes", label: "Quizzes" },
  ];

  // Inside CourseDetail component

  // 1. Basic Pricing Stats (Keep these)
  const pricing = course?.pricing || {};
  const sellingPrice = pricing?.sellingPrice || 0;
  const mrp = pricing.mrp || sellingPrice;
  const discountPercentage = mrp > 0 ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

  // 1. Calculate Coupon Discount
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === 'flat') {
      return appliedCoupon.flatDiscount.amount;
    }
    const percentageOff = (sellingPrice * appliedCoupon.percentageDiscount.percentage) / 100;
    return Math.min(percentageOff, appliedCoupon.percentageDiscount.maxDiscountAmount);
  };

  const discountAmount = calculateDiscount();

  // 1. Final Selling Price (Keep as Number)
  const finalSellingPrice = Math.max(0, sellingPrice - discountAmount);

  // 2. Handling Charges (2.5%) (Keep as Number)
  const handlingCharges = (finalSellingPrice * 2.5) / 100;

  // 3. GST Calculations (Keep as Numbers - remove .toFixed here)
  const courseGstAmount = (finalSellingPrice * (pricing?.gstPercentage || 0)) / 100;
  const handlingGstAmount = (handlingCharges * 18) / 100;

  // 4. Total GST (Keep as Number)
  const totalGst = courseGstAmount + handlingGstAmount;

  // 5. Final Sum
  const rawTotal = finalSellingPrice + handlingCharges + totalGst;

  // 6. Formatting for display (ONLY at the end)
  const totalPayable = rawTotal.toFixed(2);

  // console.log(totalPayable);
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
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
    // <SecurityProvider>
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main Info */}
          <div className="w-full lg:w-[70%] flex-1 space-y-8">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D61A1] tracking-widest uppercase">
                <Link to={-1} className='hover:underline' >Course</Link> <ChevronRight size={14} /> {course?.category[0]}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D2A4A] uppercase">{course?.courseName}</h1>
              <p className="text-slate-600 text-lg leading-relaxed font-semibold">
                LEARN HOW TO PREPARE YOUR OWN ARCHITECTURAL PLANS
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 border-y border-slate-100">
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
                    {course?.instructors?.length != 0 && <InstructorCard instructors={course?.instructors} />}
                    <CertificateSection />
                    <Testimonials testimonials={course?.testimonials?.data} />
                    {/* Request Callback & Get In Touch Section */}
                    <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm mt-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12"> {/* Request a Callback */}
                        <div className="space-y-8">
                          <h3 className="text-2xl font-extrabold text-[#0D2A4A]">Request a Callback</h3>
                          <div className="space-y-4"> {["Connect with our team", "Resolve issues quickly",
                            "Get answers to your queries",
                            "Discuss details about courses",
                            "Receive personalized guidance"].map((item, i) =>
                            (<div key={i} className="flex items-center gap-3">
                              <div className="text-green-500 shrink-0"> <CheckCircle size={24} />
                              </div>
                              <span className="text-lg font-medium text-slate-700">{item}</span>
                            </div>))}
                          </div>
                          <a href='https://calendly.com/bhavanamsc2cvenki/sotjk' target='_blank' className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-2 bg-[#D9534F] text-white rounded-xl font-bold hover:bg-[#c94b48] transition-all shadow-lg text-lg">
                            <Phone size={22} className="fill-white" /> Book Appointment Now </a>
                        </div> {/* Get In Touch */} <div className="space-y-4"> <div>
                          <h3 className="text-2xl font-extrabold text-[#0D2A4A] mb-2">Get In Touch</h3>
                          <p className="text-slate-500 font-medium text-lg">Feel free to reach out to us, we're here to help you.</p> </div>
                          <div className="space-y-2"> <
                            div className="flex items-center gap-2">
                            <div className="w-12 h-12 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0"> <Phone size={24} />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-left text-slate-400 uppercase tracking-widest mb-1">Call Us</div>
                              <div className="text-[16px] font-semibold text-left text-slate-900">+91 9110-363-544
                              </div>
                            </div>
                          </div>
                            <div className="flex items-center gap-4"> <div className="w-12 h-12 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0"> <Mail size={24} />
                            </div>
                              <div>
                                <div className="text-xs font-semibold text-left text-slate-400 uppercase tracking-widest mb-1">Email Us</div>
                                <div className="text-[16px] font-semibold text-left text-slate-900">info@bhavanamsc2c.com</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-4"> <div className="w-12 h-12 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0">
                              <MapPin size={24} />
                            </div>
                              <div>
                                <div className="text-xs font-semibold text-left text-slate-400 uppercase tracking-widest mb-1">Location</div>
                                <div className="text-[16px] font-semibold text-left text-slate-900 leading-tight"> 16-2-755/8/C, H.S.Meadows, Gaddlannaram, Dilshukhnagar, Hyderabad, Telangana - 500060 </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "content" && (
                  <div className="space-y-4">
                    <VideoContent courseId={course?.courseId} />
                  </div>
                )}

                {activeTab === "resources" && (
                  <ResourceContent courseId={course?.courseId} />
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

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-[30%] lg:w-96 space-y-6">
            <PricingSidebar
              course={course}
              sellingPrice={sellingPrice}
              mrp={mrp}
              discountPercentage={discountPercentage}
              handlingCharges={handlingCharges.toFixed(2)}
              gstAmount={totalGst.toFixed(2)}
              totalPayable={totalPayable}
              isInstallmentMode={isInstallmentMode}
              setIsInstallmentMode={setIsInstallmentMode}
              setShowCouponModal={setShowCouponModal}
              appliedCoupon={appliedCoupon}   // New
              setAppliedCoupon={setAppliedCoupon}
              discountAmount={discountAmount}
              currentuserEnrolledCourse={course?.currentuserEnrolledCourse}
            />
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                What's included:
              </h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D61A1] mt-1.5"></div>
                  Full lifetime access
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D61A1] mt-1.5"></div>
                  ISO Certified Certificate
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D61A1] mt-1.5"></div>
                  Downloadable resources
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D61A1] mt-1.5"></div>
                  Mobile and PC access
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D61A1] mt-1.5"></div>
                  Software Installation Support
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D61A1] mt-1.5"></div>
                  Live Doubts Clarification Sessions
                </li>
              </ul>
            </div>
          </div>





        </div>
      </div>

      {/* Mobile Pricing Drawer Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden w-[90%]">
        <button
          onClick={() => setShowPricingDrawer(true)}
          className="w-full py-4 bg-[#0D2A4A] text-white rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 shadow-lg"
        >
          <ShoppingCart size={20} /> View Pricing
        </button>
      </div>

      {/* Mobile Drawer */}
      {showPricingDrawer && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPricingDrawer(false)}
          />
          <div className="relative bg-white rounded-t-3xl shadow-xl max-h-[90vh] overflow-auto p-4 sm:p-3 animate-in slide-in-from-bottom-3 duration-300">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowPricingDrawer(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <PricingSidebar
              course={course}
              sellingPrice={sellingPrice}
              mrp={mrp}
              discountPercentage={discountPercentage}
              handlingCharges={handlingCharges}
              gstAmount={totalGst}
              totalPayable={totalPayable}
              isInstallmentMode={isInstallmentMode}
              setIsInstallmentMode={setIsInstallmentMode}
              setShowCouponModal={setShowCouponModal}
              appliedCoupon={appliedCoupon}   // New
              setAppliedCoupon={setAppliedCoupon}
              discountAmount={discountAmount}
              currentuserEnrolledCourse={course?.currentuserEnrolledCourse}
            />
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <CouponModal setShowCouponModal={setShowCouponModal} courseId={course?.courseId} setAppliedCoupon={setAppliedCoupon} />
      )}
    </div>
    // </SecurityProvider>
  );
};

export default CourseDetail;



// --- CouponModal Component ---

const CouponModal = ({ setShowCouponModal, courseId, setAppliedCoupon }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadCouponCode, setLoadCouponCode] = useState(false)
  const [CouponCode, setCouponCode] = useState('')

  const fetchCoupons = async () => {
    try {
      // Logic to fetch based on your API
      const response = await getCoupon(courseId);
      setCoupons(response);
    } catch (error) {
      console.error("Failed to fetch coupons", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [courseId]);

  const handleGetOtpByCode = async () => {
    try {
      setLoadCouponCode(true)
      if (CouponCode == "") {
        toast.error("Please Enter Coupon code first")
        return
      }
      const response = await getCouponById(CouponCode, courseId)
      console.log(response)
      if (response) {
        setAppliedCoupon(response);
        setShowCouponModal(false)
        toast.success("Coupon Code Applied Successfully")
      }
    } catch (error) {
      // console.log(error)
      toast.error("Invalid coupon Code")
    } finally {
      setLoadCouponCode(false)

    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setShowCouponModal(false)}
      ></div>

      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-800">Apply Coupons</h3>
          <button
            onClick={() => setShowCouponModal(false)}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Manual Input */}
          <div className="flex gap-2">
            <input
              type="text"
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2D61A1] outline-none font-bold uppercase placeholder:normal-case"
            />
            <button
              onClick={handleGetOtpByCode}
              className="px-6 py-3 bg-[#0D2A4A] text-white rounded-xl font-bold hover:bg-[#2D61A1] transition-all">
              {loadCouponCode ? "Searching...." : "APPLY"}
            </button>
          </div>

          {/* List of Public Coupons */}
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Available Coupons
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-center text-slate-400">Loading offers...</p>
              ) : (
                coupons
                  .filter(coupon => coupon.couponType === "public") // Only show public coupons
                  .map((coupon) => (
                    <div
                      key={coupon.couponCode}
                      className="p-4 border border-dashed border-blue-200 bg-blue-50/50 rounded-xl flex items-center justify-between group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="font-extrabold text-[#2D61A1] tracking-tight">
                          {coupon.couponCode}
                        </div>
                        <div className="text-xs font-medium text-slate-600">
                          {coupon.discountType === 'flat'
                            ? `Save ₹${coupon.flatDiscount.amount} flat off`
                            : `${coupon.percentageDiscount.percentage}% Off up to ₹${coupon.percentageDiscount.maxDiscountAmount}`
                          }
                        </div>
                        {coupon.minimumOrderValue > 1 && (
                          <div className="text-[10px] text-slate-400">
                            Min. order: ₹{coupon.minimumOrderValue}
                          </div>
                        )}
                      </div>
                      <button onClick={() => {
                        setAppliedCoupon(coupon); // This updates the price in the sidebar
                        setShowCouponModal(false); // This closes the modal
                      }} className="text-sm font-bold text-[#2D61A1] hover:text-[#0D2A4A]">
                        APPLY
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


