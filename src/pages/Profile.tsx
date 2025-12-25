
import React, { useState } from 'react';
import { User, Shield, MapPin, GraduationCap, Users, Camera, Save } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'personal' | 'address' | 'education' | 'invite'>('general');
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  const tabs = [
    { id: 'general', label: 'General Details', icon: User },
    { id: 'personal', label: 'Personal Details', icon: Shield },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'education', label: 'Educational Details', icon: GraduationCap },
    { id: 'invite', label: 'Invite Friends', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Profile Sidebar */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-blue-50 overflow-hidden bg-slate-100">
                <img src="https://placehold.co/200x200/2D61A1/white?text=SR" alt="User" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-[#0D2A4A] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-[#2D61A1] transition-all">
                <Camera size={18} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Srinivasa Reddy</h3>
            <p className="text-sm font-bold text-[#2D61A1] mb-2 uppercase tracking-widest">BHV0012</p>
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100">
              <button className="text-xs font-bold text-[#2D61A1] hover:underline">Change Photo</button>
              <span className="text-slate-300">|</span>
              <button className="text-xs font-bold text-red-500 hover:underline">Remove Photo</button>
            </div>
          </div>

          <nav className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all border-l-4 ${activeTab === tab.id
                  ? 'bg-blue-50 text-[#2D61A1] border-[#2D61A1]'
                  : 'text-slate-500 hover:bg-slate-50 border-transparent'
                  }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Form Content */}
        <main className="flex-1">
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-10">
            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#0D2A4A]">General Details</h2>
                  <div className="w-12 h-1 bg-[#2D61A1] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mobile Number</label>
                    <div className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900">
                      {user?.countrycode + user?.PhoneNo}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Id</label>
                    <input type="email" defaultValue={user?.email} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#2D61A1] outline-none" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" defaultValue={user?.name} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#2D61A1] outline-none" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'personal' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-[#0D2A4A]">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gender</label>
                    <div className="flex gap-4">
                      <label className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-slate-100 rounded-xl cursor-pointer hover:border-[#2D61A1] transition-all has-[:checked]:border-[#2D61A1] has-[:checked]:bg-blue-50">
                        <input type="radio" name="gender" value="male" defaultChecked className="hidden" />
                        <span className="font-bold">Male</span>
                      </label>
                      <label className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-slate-100 rounded-xl cursor-pointer hover:border-[#2D61A1] transition-all has-[:checked]:border-[#2D61A1] has-[:checked]:bg-blue-50">
                        <input type="radio" name="gender" value="female" className="hidden" />
                        <span className="font-bold">Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nationality</label>
                    <input type="text" defaultValue="Indian" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date of Birth</label>
                    <div className="grid grid-cols-3 gap-4">
                      <input type="number" placeholder="Day" className="px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900" />
                      <input type="text" placeholder="Month" className="px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900" />
                      <input type="number" placeholder="Year" className="px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-[#0D2A4A]">Address Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">City / District</label>
                    <input type="text" className="w-full px-5 py-4 border border-slate-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">State</label>
                    <input type="text" className="w-full px-5 py-4 border border-slate-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">PIN Code</label>
                    <input type="number" className="w-full px-5 py-4 border border-slate-200 rounded-xl" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Permanent Address</label>
                    <textarea className="w-full px-5 py-4 border border-slate-200 rounded-xl min-h-[100px]"></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-[#0D2A4A]">Educational Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Year of Study / Experience</label>
                    <input type="text" className="w-full px-5 py-4 border border-slate-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">College / Company</label>
                    <input type="text" className="w-full px-5 py-4 border border-slate-200 rounded-xl" />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-slate-100 flex justify-end">
              <button className="px-10 py-4 bg-[#0D2A4A] text-white rounded-xl font-extrabold flex items-center gap-2 hover:bg-[#2D61A1] transition-all shadow-lg hover:shadow-blue-500/20">
                <Save size={20} /> Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
