
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

import CourseCard from '../components/CourseCard';
import { MOCK_COURSES, PROFESSIONALS } from '../constants';
const Landing = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-[#0D2A4A] text-white overflow-hidden relative min-h-[600px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-400/30 text-blue-200 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Learn with India's best instructors
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Let's Learn With Our <span className="text-[#F9A825]">Exciting Courses!</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl">
                Explore hundreds of courses and reach new milestones every day.
                Upskill yourself with industry-ready content and get ISO certified.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/store" className="px-8 py-4 bg-[#2D61A1] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#3d7cc9] transition-all transform hover:-translate-y-1">
                  Explore Courses <ArrowRight size={20} />
                </Link>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all">
                  Join for Free
                </button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-[#0D2A4A]" alt="user" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold">10k+ Students</div>
                  <div className="text-slate-400">Trust us with their career</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <img src="https://placehold.co/800x600/0D2A4A/white?text=Professional+Learning" alt="Education" className="rounded-2xl shadow-2xl border-4 border-white/10" />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl text-slate-900 flex items-center gap-4 max-w-xs animate-bounce-slow">
                <div className="w-12 h-12 bg-[#F9A825] rounded-full flex items-center justify-center text-white">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <div className="font-bold text-lg">ISO Certified</div>
                  <div className="text-sm text-slate-500">Premium quality education standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2D61A1]/20 to-transparent pointer-events-none"></div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Top Selling Courses</h2>
            <div className="w-20 h-1.5 bg-[#2D61A1] rounded-full"></div>
          </div>
          <Link to="/store" className="text-[#2D61A1] font-semibold flex items-center gap-1 hover:underline">
            View All Courses <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
          {/* Repeat for visual fill */}
          {MOCK_COURSES.map(course => (
            <CourseCard key={`dup-${course.id}`} course={{ ...course, id: `dup-${course.id}` }} />
          ))}
        </div>
      </section>

      {/* Professionals Section */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect with Global Working Professionals</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Learn from those who are already leading the industry across the globe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROFESSIONALS.map(prof => (
              <div key={prof.id} className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl flex flex-col md:flex-row gap-6">
                <img src={prof.image} className="w-24 h-24 rounded-xl object-cover" alt={prof.name} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{prof.name}</h3>
                      <p className="text-slate-400 text-sm">{prof.location} | <span className="text-[#F9A825] font-medium">{prof.rating} ★</span></p>
                    </div>
                    <button className="px-4 py-2 bg-[#2D61A1] text-white rounded-lg text-sm font-bold hover:bg-[#3d7cc9] transition-all">
                      Let's Connect
                    </button>
                  </div>
                  <div className="space-y-1 mb-4">
                    <p className="text-[#2D61A1] font-semibold">{prof.designation} | {prof.experience}</p>
                    <p className="text-sm text-slate-300 italic">{prof.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prof.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Student Feedbacks</h2>
          <div className="w-20 h-1.5 bg-[#2D61A1] rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative pt-12">
              <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-[#2D61A1] rounded-full flex items-center justify-center text-white shadow-lg">
                <Quote size={24} fill="currentColor" />
              </div>
              <p className="text-slate-600 italic mb-6">
                "I learnt full course of 3DSMax+V ray and I have done one project. It is very useful lecture. Thank you mam and sir for providing such a good knowledge."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                <div>
                  <div className="font-bold text-slate-900">Neeharika.Y</div>
                  <div className="text-xs text-slate-500">Architecture Student</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Request Callback & Get In Touch Section (Replaces Old Contact Form) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-16 border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Request a Callback */}
            <div className="space-y-10">
              <h2 className="text-4xl font-extrabold text-[#0D2A4A] tracking-tight">Request a Callback</h2>
              <div className="space-y-5">
                {[
                  "Connect with our team",
                  "Resolve issues quickly",
                  "Get answers to your queries",
                  "Discuss details about courses",
                  "Receive personalized guidance"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="text-green-500 shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle size={28} />
                    </div>
                    <span className="text-xl font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <button className="flex items-center justify-center gap-4 w-full sm:w-auto px-10 py-5 bg-[#D9534F] text-white rounded-2xl font-black hover:bg-[#c94b48] transition-all shadow-xl shadow-red-900/10 text-xl transform hover:-translate-y-1 active:scale-95">
                  <Phone size={24} className="fill-white" />
                  Book Appointment Now
                </button>
              </div>
            </div>

            {/* Right: Get In Touch */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-extrabold text-[#0D2A4A] mb-6 tracking-tight">Get In Touch</h2>
                <p className="text-slate-500 font-medium text-xl leading-relaxed">Feel free to reach out to us, we're here to help you.</p>
              </div>

              <div className="space-y-8">
                {/* Call Us */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <Phone size={32} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us</div>
                    <div className="text-2xl font-black text-[#0D2A4A]">+91 9110-363-544</div>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <Mail size={32} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</div>
                    <div className="text-2xl font-black text-[#0D2A4A]">info@bhavanamsc2c.com</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-50 text-[#2D61A1] rounded-2xl flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <MapPin size={32} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Location</div>
                    <div className="text-xl font-bold text-[#0D2A4A] leading-tight">
                      Hyderabad, Telangana, <span className="text-red-600">India</span>
                    </div>
                    <div className="text-xl font-bold text-red-600 leading-tight">
                      Houston, Texas, United States of America
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D2A4A] rounded-3xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 space-y-8 z-10">
              <h2 className="text-4xl font-bold text-white leading-tight">Join as an Instructor</h2>
              <p className="text-slate-300 text-lg">Teach, inspire, and earn - start your journey as an instructor with us today and share your industry expertise with thousands of eager students.</p>
              <button className="px-10 py-4 bg-[#F9A825] text-[#0D2A4A] rounded-xl font-bold hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-lg">
                Join Now
              </button>
            </div>
            <div className="hidden lg:block relative">
              <img src="https://placehold.co/800x600/2D61A1/white?text=Teach+Industry+Skills" alt="Instructor" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D2A4A] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
