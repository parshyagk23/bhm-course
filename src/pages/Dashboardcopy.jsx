import React, { useState, useEffect } from 'react';
import { Award, ChevronRight, AlertTriangle, CheckCircle, Play, MessageCircle, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getEnrolledCourse } from '../services/enrollment';
import { updateUserDetails } from '../services/auth';



const DashboardCopy = () => {
   const [activeTab, setActiveTab] = useState('ongoing');
   const [enrollments, setEnrollments] = useState([]);
   const [loading, setLoading] = useState(true);

   // Modal States
   const [showReviewModal, setShowReviewModal] = useState(false);
   const [showCertificateModal, setShowCertificateModal] = useState(false);
   const [rating, setRating] = useState(0);
   const [reviewText, setReviewText] = useState('');


   const user = JSON.parse(localStorage.getItem("user"))
   const { UID } = user
   const navigate = useNavigate()

   // 2. Fetch Data (Replace with your actual API call)
   const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
         const response = await getEnrolledCourse(UID);
         if (response.status) {
            setEnrollments(response.data);
         }
      } catch (error) {
         console.error("Fetch error:", error);
      } finally {
         setLoading(false);
      }
   }
   const filteredEnrollments = enrollments.filter(course => {
      const completedVideos = course?.completedcontent?.filter(item => item.type === 'video').length || 0;
      const totalVideos = course?.VideoCount || 1;
      const isFinished = completedVideos >= totalVideos;

      if (activeTab === 'completed') return isFinished;
      return !isFinished; // 'ongoing' tab
   });
   useEffect(() => {
      // Simulating the API response you provided
      fetchEnrolledCourses()


   }, []);
   if (loading) {
      return (
         <div className="max-w-7xl mx-auto px-4 py-10">
            <p className="text-center text-slate-500">Loading courses...</p>
         </div>
      );
   }

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
               <h1 className="text-3xl font-extrabold text-[#0D2A4A]">Welcome, {enrollments[0]?.username || 'Learner'}</h1>
               <p className="text-slate-500">Manage your enrollments and course access.</p>
            </div>

            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
               {['ongoing', 'completed'].map((tab) => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-6 py-2.5 rounded-lg font-bold capitalize transition-all ${activeTab === tab ? 'bg-[#0D2A4A] text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
         </div>

         {/* 3. Dynamic Course Grid */}
         <div className="flex flex-wrap gap-8">
            {filteredEnrollments.length === 0 ? (
               <div className='w-full flex justify-center'>
                  {/* Empty state markup */}
                  <h2 className="text-xl font-bold text-[#0D2A4A]">No {activeTab} courses</h2>
               </div>
            ) : (
               filteredEnrollments.map((course) => {
                  // 1. Basic Progress Calculations
                  const completedVideos = course?.completedcontent?.filter(item => item.type === 'video').length || 0;
                  const totalVideos = course?.VideoCount || 1;
                  const progressPercentage = Math.round((completedVideos / totalVideos) * 100);

                  // 2. Define the missing variable
                  const hasPendingInstallment = course.remainingBalance > 0;

                  // 3. Date Comparison Logic
                  const today = new Date();
                  const expiryDate = new Date(course.expiryDate);
                  const dueDate = course.nextDueDate ? new Date(course.nextDueDate) : null;

                  // 4. Status Flags
                  const isExpired = expiryDate < today;

                  // Only block access if the status is PARTIAL and the date has actually passed
                  const isInstallmentOverdue =
                     course.paymentStatus === "PARTIAL" &&
                     dueDate &&
                     today > dueDate;

                  // 5. Final Access Toggle
                  const isAccessDisabled = isExpired || isInstallmentOverdue;

                  return (
                     <div key={course.EnrolledId} className={`w-[350px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all ${isAccessDisabled ? 'opacity-75 grayscale-[0.5]' : 'hover:shadow-md'}`}>

                        <div className="aspect-video relative bg-slate-100">
                           <img
                              src={course?.courseImageUrl}
                              alt="course"
                              className='w-full h-full object-cover'
                           />
                           {/* Status Overlays */}
                           {isExpired && (
                              <div className="absolute inset-0 bg-red-600/20 backdrop-blur-[2px] flex items-center justify-center">
                                 <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Expired</span>
                              </div>
                           )}
                        </div>

                        <div className="p-6 space-y-4">
                           <div>
                              <h3 className="font-bold text-slate-900 text-lg">{course.courseName}</h3>
                              <p className={`text-xs font-medium ${isExpired ? 'text-red-500' : 'text-slate-400'}`}>
                                 {isExpired ? 'Expired on: ' : 'Expires on: '}
                                 {new Date(course.expiryDate).toLocaleDateString()}
                              </p>
                           </div>

                           {/* Progress Bar */}
                           <div className="space-y-2">
                              <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                                 <span className="text-slate-500">Progress</span>
                                 <span className="text-blue-600">{progressPercentage}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                 <div
                                    className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${progressPercentage}%` }}
                                 />
                              </div>
                           </div>

                           {/* Payment Status */}
                           {hasPendingInstallment ? (
                              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
                                 <AlertTriangle size={18} className="text-orange-600 mt-1 shrink-0" />
                                 <div className="flex-1">
                                    <p className="text-xs font-bold text-orange-800">Pending Installment</p>
                                    <p className="text-[10px] text-orange-700">Due: {course.nextDueDate || 'TBD'}</p>
                                 </div>
                                 <button className="text-[10px] bg-orange-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-orange-700">
                                    Pay ₹{course.remainingBalance}
                                 </button>
                              </div>
                           ) : (
                              <div className="flex items-center gap-2 text-green-600 text-[10px] font-bold bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100">
                                 <CheckCircle size={12} /> Access Active
                              </div>
                           )}

                           <div className="pt-2 flex flex-col gap-2">
                              {/* Continue Learning Button - Disabled if expired or pending installment */}
                              <button
                                 disabled={isAccessDisabled}
                                 onClick={() => navigate(`/learning-hub/${course.courseName?.replaceAll(" ", "-")}`)}
                                 className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all 
                                    ${isAccessDisabled
                                       ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                       : 'bg-[#0D2A4A] text-white hover:bg-blue-900 shadow-md'}`}
                              >
                                 {isExpired ? 'Access Expired' : hasPendingInstallment ? 'Pay to Unlock' : 'Continue Learning'}
                                 {!isAccessDisabled && <ChevronRight size={18} />}
                              </button>

                              {/* Certificate Button */}
                              {activeTab === 'completed' && (
                                 <button
                                    disabled={hasPendingInstallment}
                                    onClick={() => setShowCertificateModal(true)}
                                    className={`w-full py-3 border-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                                       ${hasPendingInstallment
                                          ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                                          : 'border-[#0D2A4A] text-[#0D2A4A] hover:bg-slate-50'}`}
                                 >
                                    <Award size={18} /> Get Certificate
                                 </button>
                              )}
                           </div>
                        </div>
                     </div>
                  );
               })
            )}
         </div>

         {/* Career Support & Guidance Hub remains same as per your design... */}
         <div className="mt-24 pt-10 pb-20 px-4 bg-[#F0F5F9]/50 -mx-4 sm:-mx-6 lg:-mx-8 rounded-t-[3rem]">
            <div className="max-w-7xl mx-auto">
               <h2 className="text-2xl font-extrabold text-[#0D2A4A] mb-20 text-center lg:text-left">
                  Career Support & Guidance Hub
               </h2>
               <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                  {/* Card 1: WhatsApp */}
                  <div className="bg-white rounded-3xl p-8 pt-16 relative shadow-sm border border-slate-100 flex flex-col items-center text-center">
                     <div className="absolute -top-12 w-24 h-24 bg-blue-100/60 rounded-full flex items-center justify-center p-2">
                        <div className="w-full h-full bg-[#0D2A4A] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
                           <MessageCircle size={40} />
                        </div>
                     </div>
                     <p className="text-slate-700 font-medium text-sm leading-relaxed mb-8">
                        Stay updated with the latest job openings, internship opportunities, and career tips by joining our official WhatsApp group.
                     </p>
                     <a href='https://chat.whatsapp.com/EsULRxllqsv0XfYD5oRB02' target='_blank' className="mt-auto px-6 py-2.5 bg-[#1E293B] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#2D61A1] transition-all shadow-md group">
                        Join Now <Play size={14} className="fill-white group-hover:translate-x-0.5 transition-transform" />
                     </a>
                  </div>
               </div>
            </div>
         </div>
         {/* Modals remain same but use dynamic data like {enrollments[0]?.username} */}
      </div>
   );
};

export default DashboardCopy;