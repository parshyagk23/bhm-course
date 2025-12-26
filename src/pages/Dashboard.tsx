
import React, { useState } from 'react';
import {
   PlayCircle, Clock, Award, ChevronRight, AlertTriangle, Lock,
   UserCircle, MessageCircle, Users, FileUser, Calendar, Upload,
   Play, ThumbsUp, Star, Globe, Phone, X, CheckCircle, Download, ExternalLink,
   ChevronRightSquare
} from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { Link } from 'react-router-dom';


const Dashboard = () => {
   const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');
   const [showReviewModal, setShowReviewModal] = useState(false);
   const [showCertificateModal, setShowCertificateModal] = useState(false);
   const [rating, setRating] = useState(0);
   const [reviewText, setReviewText] = useState('');
   const [reviewError, setReviewError] = useState('');

   const wordCount = reviewText.trim().split(/\s+/).filter(word => word.length > 0).length;

   const handleSubmitReview = () => {
      if (wordCount < 15) {
         setReviewError('Feedback is required (minimum 15 words)');
         return;
      }
      if (rating === 0) {
         setReviewError('Please provide a star rating');
         return;
      }
      // Handle submission logic here
      setShowReviewModal(false);
      setReviewError('');
      alert('Thank you for your feedback!');
   };

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
               <h1 className="text-3xl font-extrabold text-[#0D2A4A]">My Courses</h1>
               <p className="text-slate-500">Track your progress and continue learning where you left off.</p>
            </div>

            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
               <button
                  onClick={() => setActiveTab('ongoing')}
                  className={`px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'ongoing' ? 'bg-[#0D2A4A] text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  Ongoing
               </button>
               <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'completed' ? 'bg-[#0D2A4A] text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  Completed
               </button>
            </div>
         </div>

         {activeTab === 'ongoing' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Course 1: Regular progress */}
               <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video relative">
                     <img src={MOCK_COURSES[1].image} className="w-full h-full object-cover" alt="course" />
                     <div className="absolute inset-0 bg-black/20"></div>
                     <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-center text-white mb-2">
                           <span className="text-xs font-bold uppercase tracking-widest">Progress</span>
                           <span className="text-xs font-bold">50%</span>
                        </div>
                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                           <div className="w-1/2 h-full bg-[#F9A825]"></div>
                        </div>
                     </div>
                  </div>
                  <div className="p-6 space-y-4">
                     <h3 className="font-bold text-slate-900">{MOCK_COURSES[1].title}</h3>
                     <button className="w-full py-3 bg-[#0D2A4A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#2D61A1] transition-all">
                        Continue Learning <ChevronRight size={18} />
                     </button>
                  </div>
               </div>

               {/* Course 2: Warning state */}
               <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
                  <div className="p-6 pb-0 space-y-4">
                     <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center relative overflow-hidden">
                        <img src={MOCK_COURSES[0].image} className="w-full h-full object-cover opacity-50 grayscale" alt="course" />
                        <AlertTriangle size={48} className="text-orange-500 absolute" />
                     </div>
                     <h3 className="font-bold text-slate-900">{MOCK_COURSES[0].title}</h3>

                     <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
                        <AlertTriangle size={18} className="text-orange-600 mt-1 shrink-0" />
                        <p className="text-xs font-semibold text-orange-800 leading-relaxed">
                           Warning: 5 days left to pay your second installment and maintain course access.
                        </p>
                     </div>
                  </div>
                  <div className="p-6 pt-0">
                     <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all">
                        Pay 2nd Instalment ₹769.19
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <div className="space-y-12">
               {/* Completed Course Detailed Layout */}
               <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                     {/* Left: Thumbnail and Instructor */}
                     <div className="w-full lg:w-1/2 space-y-6">
                        <div className="rounded-2xl border-4 border-[#0D2A4A] overflow-hidden bg-slate-100 aspect-[16/10]">
                           <img src="https://placehold.co/800x500/0D2A4A/white?text=REVIT+PROJECT" className="w-full h-full object-cover" alt="Revit Workshop" />
                        </div>

                        <div className="flex items-center gap-2 text-[#2D61A1] font-bold text-sm">
                           <PlayCircle size={20} /> Recorded Videos Available
                        </div>

                        <div className="flex items-center gap-4">
                           <div className="bg-[#4156A1] text-white px-6 py-4 rounded-xl flex items-center gap-3">
                              <div className="text-left">
                                 <div className="text-[10px] uppercase font-bold opacity-80">Course Duration:</div>
                                 <div className="text-2xl font-black">5+ Hours</div>
                              </div>
                           </div>

                           <div className="flex flex-col gap-1 text-[11px] font-bold text-[#4156A1]">
                              <div className="flex items-center gap-2">
                                 <Globe size={14} /> www.bhavanamsc2c.com
                              </div>
                              <div className="flex items-center gap-2">
                                 <Phone size={14} /> +91 911-036-3544
                                 <span className="text-[8px] opacity-60">Call us For More Information</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Right: Info and Progress */}
                     <div className="w-full lg:w-1/2 space-y-8">
                        <div className="flex items-center gap-4">
                           <div className="w-20 h-20 rounded-full border-4 border-dashed border-[#2D61A1] p-1">
                              <img src="https://placehold.co/100x100/2D61A1/white?text=S" className="w-full h-full rounded-full object-cover" alt="Instructor" />
                           </div>
                           <div>
                              <div className="font-black text-slate-900">Mr. SREEYESH</div>
                              <div className="text-[10px] font-bold text-slate-500 uppercase leading-tight">
                                 REVIT DESIGNER<br />
                                 B.TECH IN CIVIL ENGINEERING<br />
                                 GATE 2022 QUALIFIED
                              </div>
                           </div>
                        </div>

                        <h2 className="text-4xl font-black text-[#0D2A4A] tracking-tight leading-none uppercase">
                           REVIT 5 DAYS WORKSHOP
                        </h2>

                        <div className="space-y-4">
                           <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                              <div className="w-full h-full bg-[#0D2A4A]"></div>
                           </div>
                           <div className="flex items-center justify-between">
                              <div className="text-3xl font-black text-[#0D2A4A]">
                                 100 % Completed
                              </div>
                              <div className="text-right">
                                 <div className="flex gap-0.5 mb-1">
                                    {[1, 2, 3, 4].map(i => <Star key={i} size={18} className="fill-[#F9A825] text-[#F9A825]" />)}
                                    <Star size={18} className="text-slate-300" />
                                 </div>
                                 <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="text-[10px] font-bold text-[#4156A1] uppercase tracking-wider hover:underline"
                                 >
                                    leave your rating
                                 </button>
                              </div>
                           </div>
                           <div className="flex items-center gap-2 font-black text-slate-800 text-2xl">
                              <ThumbsUp size={28} className="fill-[#0D2A4A] text-[#0D2A4A]" /> 110
                           </div>
                        </div>

                        <div className="space-y-4 pt-4">
                           <button
                              onClick={() => setShowCertificateModal(true)}
                              className="w-full py-5 bg-[#0D2A4A] text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#1a3a5a] transition-all group"
                           >
                              View Certificate <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                           </button>
                           <button
                              className="w-full py-5 bg-[#0D2A4A] text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#1a3a5a] transition-all group"
                           >
                              Upskill <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Career Support & Guidance Hub */}
         <div className="mt-24 pt-10 pb-20 px-4 bg-[#F0F5F9]/50 -mx-4 sm:-mx-6 lg:-mx-8 rounded-t-[3rem]">
            <div className="max-w-7xl mx-auto">
               <h2 className="text-2xl font-extrabold text-[#0D2A4A] mb-20 text-center lg:text-left">
                  Career Support & Guidance Hub
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
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

                  {/* Card 2: Schedule Meeting */}
                  {/* <div className="bg-white rounded-3xl p-8 pt-16 relative shadow-sm border border-slate-100 flex flex-col items-center text-center">
                     <div className="absolute -top-12 w-24 h-24 bg-blue-100/60 rounded-full flex items-center justify-center p-2">
                        <div className="w-full h-full bg-[#0D2A4A] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
                           <Users size={40} />
                        </div>
                     </div>
                     <p className="text-slate-700 font-medium text-sm leading-relaxed mb-8">
                        Book a one-to-one session to review your progress and clear doubts. Choose a time, and our coordinator will be there to support you.
                     </p>
                     <button className="mt-auto px-6 py-2.5 bg-[#1E293B] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#2D61A1] transition-all shadow-md">
                        Schedule Meeting <Calendar size={18} />
                     </button>
                  </div> */}

                  {/* Card 3: Upload Resume */}
                  {/* <div className="bg-white rounded-3xl p-8 pt-16 relative shadow-sm border border-slate-100 flex flex-col items-center text-center">
                     <div className="absolute -top-12 w-24 h-24 bg-blue-100/60 rounded-full flex items-center justify-center p-2">
                        <div className="w-full h-full bg-[#0D2A4A] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
                           <FileUser size={40} />
                        </div>
                     </div>
                     <p className="text-slate-700 font-medium text-sm leading-relaxed mb-8">
                        Upload your resume to get personalized guidance to improve it. Our experts will help you make it stand out for better job opportunities.
                     </p>
                     <button className="mt-auto px-6 py-2.5 bg-[#1E293B] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#2D61A1] transition-all shadow-md">
                        Upload Resume <Upload size={18} />
                     </button>
                  </div> */}
               </div>
            </div>
         </div>

         {/* Course Review Modal */}
         {showReviewModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
               <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowReviewModal(false)}></div>
               <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="p-10 pb-6 flex items-center justify-between">
                     <h3 className="font-black text-3xl text-[#0D2A4A]">Course Review</h3>
                     <button onClick={() => setShowReviewModal(false)} className="bg-[#0D2A4A] text-white p-2.5 rounded-2xl hover:bg-slate-800 transition-colors">
                        <X size={24} />
                     </button>
                  </div>

                  <div className="px-10 pb-10 space-y-8">
                     {/* Name Section */}
                     <div className="bg-[#F0F5F9] p-6 rounded-3xl space-y-2">
                        <div className="flex items-center gap-4">
                           <UserCircle size={28} className="text-[#0D2A4A]" />
                           <div className="flex-1">
                              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Name</div>
                              <input type="text" defaultValue="CNU" className="w-full bg-transparent font-bold text-slate-900 text-lg border-b-2 border-slate-400 focus:border-[#0D2A4A] outline-none" />
                           </div>
                        </div>
                     </div>

                     {/* Review Section */}
                     <div className="bg-[#F0F5F9] p-6 rounded-3xl space-y-2">
                        <div className="flex items-start gap-4">
                           <MessageCircle size={28} className="text-[#0D2A4A] mt-1" />
                           <div className="flex-1">
                              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Review</div>
                              <textarea
                                 placeholder="Enter your review here"
                                 value={reviewText}
                                 onChange={(e) => setReviewText(e.target.value)}
                                 className="w-full bg-transparent font-medium text-slate-800 text-base min-h-[100px] border-b-2 border-slate-400 focus:border-[#0D2A4A] outline-none resize-none placeholder:text-slate-400"
                              ></textarea>
                              <div className="flex justify-between items-center mt-2">
                                 <div className={`text-[10px] font-bold ${wordCount < 15 ? 'text-red-500' : 'text-green-500'}`}>
                                    {wordCount} / 15 words
                                 </div>
                                 {reviewError && wordCount < 15 && (
                                    <div className="text-[10px] font-bold text-red-500 italic">feedback is required</div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Rating Section */}
                     <div className="bg-[#F0F5F9] p-6 rounded-3xl space-y-3">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Rating</div>
                        <div className="flex gap-4 items-center">
                           {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                 key={star}
                                 onClick={() => setRating(star)}
                                 className="transition-transform active:scale-90"
                              >
                                 <Star
                                    size={44}
                                    className={`${rating >= star ? 'fill-[#F9A825] text-[#F9A825]' : 'text-slate-400'} transition-colors`}
                                 />
                              </button>
                           ))}
                        </div>
                     </div>

                     <button
                        onClick={handleSubmitReview}
                        className="w-full py-5 bg-[#0D2A4A] text-white rounded-3xl font-black text-xl hover:bg-slate-800 transition-all shadow-xl shadow-blue-900/10"
                     >
                        Submit review
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* Certificate Modal */}
         {showCertificateModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setShowCertificateModal(false)}></div>
               <div className="relative bg-white w-full max-w-5xl aspect-[1.4/1] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                  {/* Simple visual representation of the certificate based on the image */}
                  <div className="h-full w-full bg-white p-16 flex flex-col relative">
                     {/* Gold Seal Area */}
                     <div className="absolute top-12 left-12">
                        <div className="w-40 h-40 bg-[#D4AF37] rounded-full flex flex-col items-center justify-center text-white border-[10px] border-[#B8860B] shadow-2xl relative">
                           <div className="font-serif text-[10px] tracking-widest text-center">BHAVANAM'S C2C</div>
                           <div className="font-black text-2xl">ISO</div>
                           <div className="font-serif text-sm">CERTIFIED</div>
                           {/* Ribbon bits */}
                           <div className="absolute -bottom-16 left-1/4 w-8 h-24 bg-[#B8860B] -z-10 transform rotate-12"></div>
                           <div className="absolute -bottom-16 right-1/4 w-8 h-24 bg-[#B8860B] -z-10 transform -rotate-12"></div>
                        </div>
                        <div className="mt-20 text-[10px] font-bold text-slate-400">Recognized By</div>
                        <div className="flex gap-4 mt-2">
                           <div className="w-8 h-8 bg-slate-100 rounded"></div>
                           <div className="w-8 h-8 bg-slate-100 rounded"></div>
                           <div className="w-8 h-8 bg-slate-100 rounded"></div>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                        <h1 className="text-7xl font-serif tracking-widest text-slate-900">CERTIFICATE</h1>
                        <div className="text-xl font-bold tracking-[0.3em] text-slate-500 uppercase">of Workshop Participation</div>

                        <div className="pt-8 space-y-2">
                           <div className="text-lg text-slate-400 font-medium">Presented to,</div>
                           <div className="text-6xl font-serif italic text-slate-900 border-b-2 border-slate-200 inline-block px-12">CNU</div>
                        </div>

                        <p className="max-w-2xl text-slate-500 text-sm leading-relaxed pt-4">
                           This certificate is awarded in recognition of your active participation in the<br />
                           <span className="font-black text-[#B8860B] text-xl">REVIT 5 DAYS WORKSHOP</span><br />
                           Organized by Bhavanam's C2C on 24/12/2025. This workshop aimed to enhance problem-solving & analytical skills and to apply concepts to practical applications in real-world engineering scenarios.
                        </p>
                     </div>

                     {/* Footer of certificate */}
                     <div className="flex justify-between items-end px-12 pb-8">
                        <div className="text-center">
                           <img src="https://placehold.co/100x40/white/0D2A4A?text=BHAVANAM" className="mb-2" alt="logo" />
                           <div className="text-[8px] font-bold uppercase tracking-widest">Bhavanam's C2C Pvt.Ltd</div>
                        </div>
                        <div className="text-center">
                           <div className="font-serif italic text-xl mb-1">Alla Venkireddy</div>
                           <div className="w-32 h-px bg-slate-900 mx-auto mb-1"></div>
                           <div className="text-[8px] font-bold uppercase tracking-widest">Managing Director</div>
                        </div>
                        <div className="text-center">
                           <div className="w-16 h-16 border-2 border-slate-200 rounded-full mx-auto mb-1 flex items-center justify-center">
                              <CheckCircle className="text-slate-200" size={32} />
                           </div>
                           <div className="text-[8px] font-bold uppercase tracking-widest">TSNUK99454</div>
                        </div>
                     </div>

                     {/* Close/Action buttons over the preview */}
                     <div className="absolute top-6 right-6 flex gap-3">
                        <button className="bg-slate-900 text-white p-3 rounded-full hover:bg-black transition-colors shadow-xl">
                           <Download size={24} />
                        </button>
                        <button onClick={() => setShowCertificateModal(false)} className="bg-slate-900 text-white p-3 rounded-full hover:bg-black transition-colors shadow-xl">
                           <X size={24} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Dashboard;
