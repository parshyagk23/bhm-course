
import React, { useEffect, useState } from 'react';
import { Mail, Lock, Phone, User, Eye, EyeOff, AlertCircle, ArrowRight, ChevronDown, ArrowRightCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/auth';
import toast from 'react-hot-toast';
const COUNTRY_CODES = [
    { code: '+91', label: 'IN', name: 'India' },
    { code: '+1', label: 'US', name: 'USA' },
    { code: '+44', label: 'UK', name: 'UK' },
    { code: '+971', label: 'AE', name: 'UAE' },
    { code: '+61', label: 'AU', name: 'Australia' },
    { code: '+1', label: 'CA', name: 'Canada' },
    { code: '+65', label: 'SG', name: 'Singapore' },
];
const Auth = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [signupCountryCode, setSignupCountryCode] = useState("+91");
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

        if (activeTab === 'signup' && !formData.name) newErrors.name = 'Full name is required';

        if (activeTab === 'signup' && !formData.email) {
            newErrors.email = 'Email/Phone is required';
        } else if (activeTab === 'signup' && !emailRegex.test(formData.email) && !phoneRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email or 10-digit phone number';
        }
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit number';


        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (activeTab === 'signup' && !passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be 8+ chars with 1 Uppercase & 1 Special char';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            if (activeTab === "login") {
                const payload = {
                    phone: formData.phone,
                    password: formData.password
                };

                const res = await loginUser(payload);

                toast.success(res.message || "Login successful");

                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("uid", res?.uid);
                localStorage.setItem("user", JSON.stringify(res.user));

                onLogin?.(res.user);
                navigate("/my-courses");
            } else {
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    countrycode: signupCountryCode,
                    password: formData.password,
                };

                const res = await registerUser(payload);

                toast.success(res.message || "Signup successful");
                setActiveTab("login")
            }
        } catch (err) {
            console.log(err);
            const errorMsg =
                err?.detail.split(':')[1].trim();
            "Something went wrong";

            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };



    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };
    useEffect(() => {
        setFormData({ name: "", email: "", phone: "", password: "" });
        setErrors({});
    }, [activeTab]);

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Brand Logo for Mobile */}
                <div className="flex justify-center mb-8 md:hidden">
                    <div className="w-12 h-12 bg-[#0D2A4A] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">B</div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
                    {/* Tab Switcher */}
                    <div className="flex p-2 bg-slate-50 border-b border-slate-100">
                        <button
                            onClick={() => { setActiveTab('login'); setErrors({}); }}
                            className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'login' ? 'bg-white text-[#0D2A4A] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            LOGIN
                        </button>
                        <button
                            onClick={() => { setActiveTab('signup'); setErrors({}); }}
                            className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'signup' ? 'bg-white text-[#0D2A4A] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            SIGN UP
                        </button>
                    </div>

                    <div className="p-8 md:p-10">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-[#0D2A4A] mb-2">
                                {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
                            </h1>
                            <p className="text-slate-500 font-medium">
                                {activeTab === 'login'
                                    ? 'Sign in to access your dashboard and continue learning.'
                                    : 'Join 10k+ students and start your professional journey.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {activeTab === 'signup' && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="e.g. Srinivasa Reddy"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-[#2D61A1] outline-none transition-all font-bold text-slate-900 ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-100'
                                                }`}
                                        />
                                    </div>
                                    {errors.name && <p className="text-[10px] font-bold text-red-500 flex items-center gap-1 ml-1"><AlertCircle size={12} /> {errors.name}</p>}
                                </div>
                            )}
                            {activeTab === 'signup' && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                    <div className="flex bg-slate-50 border border-slate-100 rounded-2xl focus-within:ring-2 focus-within:ring-[#2D61A1] transition-all overflow-hidden group">

                                        <div className="relative flex-1">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                name="email"
                                                type="text"
                                                placeholder="Email or Mobile"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full pl-12 pr-4 py-4 bg-transparent outline-none font-bold text-slate-900 ${errors.email ? 'text-red-500' : ''
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    {errors.email && <p className="text-[10px] font-bold text-red-500 flex items-center gap-1 ml-1"><AlertCircle size={12} /> {errors.email}</p>}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                <div className="flex bg-slate-50 border border-slate-100 rounded-2xl focus-within:ring-2 focus-within:ring-[#2D61A1] transition-all overflow-hidden">
                                    <div className="relative flex items-center border-r border-slate-200 bg-slate-100/50 px-3">
                                        <select
                                            value={signupCountryCode}
                                            onChange={(e) => setSignupCountryCode(e.target.value)}
                                            className="appearance-none bg-transparent pr-6 pl-2 py-4 font-bold text-slate-700 outline-none cursor-pointer z-10"
                                        >
                                            {COUNTRY_CODES.map((c, i) => (
                                                <option key={i} value={c.code}>{c.label} {c.code}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <div className="relative flex-1">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            name="phone"
                                            type="tel"
                                            placeholder="10-digit number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full pl-12 pr-4 py-4 bg-transparent outline-none font-bold text-slate-900 ${errors.phone ? 'text-red-500' : ''
                                                }`}
                                        />
                                    </div>
                                </div>
                                {errors.phone && <p className="text-[10px] font-bold text-red-500 flex items-center gap-1 ml-1"><AlertCircle size={12} /> {errors.phone}</p>}
                            </div>


                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                                    {activeTab === 'login' && (
                                        <button type="button" className="text-[10px] font-bold text-[#2D61A1] hover:underline uppercase tracking-wider">Forgot?</button>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-12 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-[#2D61A1] outline-none transition-all font-bold text-slate-900 ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-100'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-[10px] font-bold text-red-500 flex items-center gap-1 ml-1 leading-tight"><AlertCircle size={12} className="shrink-0" /> {errors.password}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 
    transition-all shadow-xl shadow-blue-900/10 mt-4 group
    ${loading
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "bg-[#0D2A4A] hover:bg-[#1a3a5a] text-white"
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {activeTab === "login" ? "Login Now" : "Create Account"}
                                        <ArrowRightCircle size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                            <p className="text-sm font-bold text-slate-400">
                                {activeTab === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                <button
                                    onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                                    className="ml-2 text-[#2D61A1] hover:underline uppercase tracking-wider text-xs font-black"
                                >
                                    {activeTab === 'login' ? 'Sign Up' : 'Login'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    ISO 9001:2015 CERTIFIED PLATFORM
                </p>
            </div>
        </div>
    );
};


export default Auth;
