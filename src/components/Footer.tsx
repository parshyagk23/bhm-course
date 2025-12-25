
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0D2A4A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-[#0D2A4A] rounded flex items-center justify-center font-bold">B</div>
            Quick Links
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/blogs" className="hover:text-white">Civil Blogs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">Contact Us</h3>
          <div className="space-y-4 text-slate-300">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#F9A825]" />
              <span>+91 9110-363-544</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#F9A825]" />
              <span>info@bhavanamsc2c.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#F9A825] mt-1 shrink-0" />
              <span>123 Civil Engineering Street, Tech Hub, India</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">Location</h3>
          <div className="h-40 bg-slate-700 rounded-lg overflow-hidden grayscale contrast-125">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160407063!2d78.267957!3d17.412299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeea2bb%3A0x3251fd035a4476c2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-[#2D61A1] transition-all">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-[#2D61A1] transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-[#2D61A1] transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-[#2D61A1] transition-all">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Bhavanam C2C. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
