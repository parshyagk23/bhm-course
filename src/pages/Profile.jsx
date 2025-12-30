
import React, { useEffect, useState } from 'react';
import { User, Shield, MapPin, GraduationCap, Users, Camera, Save } from 'lucide-react';
import { updateUserDetails, currentUserDetails } from '../services/auth';
import toast from 'react-hot-toast';
const Profile = () => {
  const [activeTab, setActiveTab] = useState('general');
  const user = JSON.parse(localStorage.getItem("user"))

  const tabs = [
    { id: 'general', label: 'General Details', icon: User },
    { id: 'personal', label: 'Personal Details', icon: Shield },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'education', label: 'Educational Details', icon: GraduationCap },

  ];

  const [profileData, setProfileData] = useState({
    personal: {
      gender: "male",
      nationality: "Indian",
      dateofbirth: ""
    },
    address: {
      city: "",
      state: "",
      pincode: "",
      permantentAddress: ""
    },
    professional: {
      yearOfExperience: "",
      collegeorcompany: ""
    }
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Construct the payload to match your Python UpdateUserRequest
      const payload = {
        personal: {
          gender: profileData.personal.gender || "",
          nationality: profileData.personal.nationality || "",
          dateofbirth: profileData.personal.dateofbirth || ""
        },
        address: {
          city: profileData.address.city || "",
          state: profileData.address.state || "",
          pincode: profileData.address.pincode || "",
          permantentAddress: profileData.address.permantentAddress || ""
        },
        professional: {
          yearOfExperience: profileData.professional.yearOfExperience || "",
          collegeorcompany: profileData.professional.collegeorcompany || ""
        }
      };

      const response = await updateUserDetails(payload);

      if (response.status) {
        // 1. Update the user object in localStorage
        const updatedUser = { ...user, ...response.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // 2. Trigger a storage event so App.js knows to re-render (if needed)
        window.dispatchEvent(new Event("storage"));

        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.detail || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const fetchCurrentUser = async () => {
    const user = await currentUserDetails()

    if (user?.status) {
      const updatedUser = { ...user, ...user.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));

      toast.success("Profile updated successfully!");
      setProfileData({
        personal: {
          gender: updatedUser?.personal_details?.gender || "male",
          nationality: updatedUser?.personal_details?.nationality || "Indian",
          dateofbirth: updatedUser?.personal_details?.dateofbirth || ""
        },
        address: {
          city: updatedUser?.address_details?.city || "",
          state: updatedUser?.address_details?.state || "",
          pincode: updatedUser?.address_details?.pincode || "",
          permantentAddress: updatedUser?.address_details?.permantentAddress || ""
        },
        professional: {
          yearOfExperience: updatedUser?.professional_details?.yearOfExperience || "",
          collegeorcompany: updatedUser?.professional_details?.collegeorcompany || ""
        }
      });
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Profile Sidebar */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-blue-50 overflow-hidden bg-slate-100">
                <img src={`https://placehold.co/200x200/2D61A1/white?text=${user?.name.charAt(0)}`} alt="User" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-[#0D2A4A] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-[#2D61A1] transition-all">
                <Camera size={18} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
            {/* <p className="text-sm font-bold text-[#2D61A1] mb-2 uppercase tracking-widest">BHV0012</p> */}
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
                onClick={() => setActiveTab(tab.id)}
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
                    <div className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900">
                      {user?.email}
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <div className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900">
                      {user?.name}
                    </div>
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
                      <label className={`flex-1 flex items-center justify-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${profileData.personal.gender === 'male' ? 'border-[#2D61A1] bg-blue-50' : 'border-slate-100'}`}>
                        <input
                          onChange={() => handleChange("personal", "gender", "male")}
                          type="radio"
                          name="gender"
                          checked={profileData.personal.gender === "male"}
                          className="hidden"
                        />
                        <span className="font-bold">Male</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${profileData.personal.gender === 'female' ? 'border-[#2D61A1] bg-blue-50' : 'border-slate-100'}`}>
                        <input
                          onChange={() => handleChange("personal", "gender", "female")}
                          type="radio"
                          name="gender"
                          checked={profileData.personal.gender === "female"}
                          className="hidden"
                        />
                        <span className="font-bold">Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nationality</label>
                    <input
                      onChange={(e) => handleChange("personal", "nationality", e.target.value)}
                      type="text"
                      value={profileData.personal.nationality}
                      className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={profileData.personal.dateofbirth}
                        onChange={(e) => handleChange('personal', 'dateofbirth', e.target.value)}
                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#2D61A1] outline-none"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 italic mt-1">
                      Format: Day / Month / Year
                    </p>
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
                    <input
                      value={profileData.address.city}
                      onChange={(e) => handleChange("address", "city", e.target.value)}
                      type="text"
                      className="w-full px-5 py-4 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">State</label>
                    <input
                      value={profileData.address.state}
                      onChange={(e) => handleChange("address", "state", e.target.value)}
                      type="text"
                      className="w-full px-5 py-4 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">PIN Code</label>
                    <input
                      value={profileData.address.pincode}
                      onChange={(e) => handleChange("address", "pincode", e.target.value)}
                      type="number"
                      className="w-full px-5 py-4 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Permanent Address</label>
                    <textarea
                      value={profileData.address.permantentAddress}
                      onChange={(e) => handleChange("address", "permantentAddress", e.target.value)}
                      className="w-full px-5 py-4 border border-slate-200 rounded-xl min-h-[100px]"
                    />
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
                    <input value={profileData.professional.yearOfExperience} onChange={(e) => handleChange("professional", "yearOfExperience", e.target.value)} type="text" className="w-full px-5 py-4 border border-slate-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">College / Company</label>
                    <input value={profileData.professional.collegeorcompany} onChange={(e) => handleChange("professional", "collegeorcompany", e.target.value)} type="text" className="w-full px-5 py-4 border border-slate-200 rounded-xl" />
                  </div>
                </div>
              </div>
            )}

            {activeTab != 'general' &&
              <div className="pt-8 border-t border-slate-100 flex justify-end">
                <button onClick={handleSave} className="px-10 py-4 bg-[#0D2A4A] text-white rounded-xl font-extrabold flex items-center gap-2 hover:bg-[#2D61A1] transition-all shadow-lg hover:shadow-blue-500/20">
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={20} /> Save Changes
                    </>
                  )}
                </button>
              </div>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
