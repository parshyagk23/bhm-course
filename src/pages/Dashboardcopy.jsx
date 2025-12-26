import React, { useState, useEffect } from 'react';
import { Award, ChevronRight, AlertTriangle, CheckCircle, Play, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEnrolledCourse } from '../services/enrollment';



const DashboardCopy = () => {
   const [activeTab, setActiveTab] = useState('ongoing');
   const [enrollments, setEnrollments] = useState([]);
   const [loading, setLoading] = useState(true);

   const user = JSON.parse(localStorage.getItem("user"))
   const { UID } = user
   // Modal States
   const [showReviewModal, setShowReviewModal] = useState(false);
   const [showCertificateModal, setShowCertificateModal] = useState(false);
   const [rating, setRating] = useState(0);
   const [reviewText, setReviewText] = useState('');

   // 2. Fetch Data (Replace with your actual API call)
   const fetchEnrolledCourses = async () => {
      const responce = await getEnrolledCourse(UID)
      console.log(responce)
      if (responce.status) {
         setEnrollments(responce.data);
      }

      setLoading(false);
   }
   useEffect(() => {
      // Simulating the API response you provided
      fetchEnrolledCourses()


   }, []);

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
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map((course) => (
               <div key={course.EnrolledId} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video relative bg-slate-100 flex items-center justify-center">
                     {/* Placeholder for actual course image if not in backend */}
                     <div className="text-[#0D2A4A] font-black text-2xl uppercase opacity-20">{course.courseName}</div>
                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#0D2A4A] shadow-sm">
                        ID: {course.courseID}
                     </div>
                  </div>

                  <div className="p-6 space-y-4">
                     <div>
                        <h3 className="font-bold text-slate-900 text-lg">{course.courseName}</h3>
                        <p className="text-xs text-slate-400 font-medium">Expires on: {new Date(course.expiryDate).toLocaleDateString()}</p>
                     </div>

                     {/* 4. Installment / Payment Status Logic */}
                     {course.remainingBalance > 0 ? (
                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
                           <AlertTriangle size={18} className="text-orange-600 mt-1 shrink-0" />
                           <div>
                              <p className="text-xs font-bold text-orange-800">Pending Installment</p>
                              <p className="text-[10px] text-orange-700">Due: {course.nextDueDate || 'TBD'}</p>
                           </div>
                           <button className="ml-auto text-[10px] bg-orange-600 text-white px-3 py-1.5 rounded-lg font-bold">
                              Pay ₹{course.remainingBalance}
                           </button>
                        </div>
                     ) : (
                        <div className="flex items-center gap-2 text-green-600 text-[10px] font-bold bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100">
                           <CheckCircle size={12} /> Full Access Granted
                        </div>
                     )}

                     <div className="pt-2 flex flex-col gap-2">
                        <button className="w-full py-3 bg-[#0D2A4A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#2D61A1] transition-all">
                           Continue Learning <ChevronRight size={18} />
                        </button>

                        {/* 5. Conditional Certificate Button */}
                        {activeTab === 'completed' && (
                           <button
                              onClick={() => setShowCertificateModal(true)}
                              className="w-full py-3 border-2 border-[#0D2A4A] text-[#0D2A4A] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                           >
                              <Award size={18} /> Get Certificate
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            ))}
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
                     <button className="mt-auto px-6 py-2.5 bg-[#1E293B] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#2D61A1] transition-all shadow-md group">
                        Join Now <Play size={14} className="fill-white group-hover:translate-x-0.5 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
         {/* Modals remain same but use dynamic data like {enrollments[0]?.username} */}
      </div>
   );
};

export default DashboardCopy;