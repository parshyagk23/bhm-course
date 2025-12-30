
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, X } from 'lucide-react';
import bhavanamsSmallLogo from '/Images/logo/logoSmall.jpg'
const Footer = () => {
  return (
    <footer className="bg-[#0D2A4A] text-white pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Link to="/" className="flex items-center ">
              <img
                src={bhavanamsSmallLogo}
                alt="Bhavanam's C2C Logo"
                className="h-[50px] w-[50px] rounded-xl"
              />
            </Link>
            Quick Links
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li><Link to="/" className="hover:text-white">Store</Link></li>
            <li><Link to="/my-courses" className="hover:text-white">My Course</Link></li>
            <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
            {/* <li><Link to="/blogs" className="hover:text-white"></Link></li> */}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
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
              <span> 16-2-755/8/C, H.S.Meadows, Gaddlannaram, Dilshukhnagar, Hyderabad, Telangana - 500060</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Location</h3>
          <div className="h-40  rounded-lg overflow-hidden grayscale contrast-125">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d974589.0054744919!2d78.408046!3d17.412349!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb994f45e241c9%3A0xa1a0068c934c1cd4!2sBhavanam&#39;s%20C2C%20(Consultancy%20to%20Construction%20and%20Trainings)!5e0!3m2!1sen!2sin!4v1767067197732!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>

          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/BhavanamsC2C/"
              target='_blank'
              className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-[#1877F2] transition-all">
              <Facebook size={20} />
            </a>
            <a href="https://x.com/bhavanamsc2c"
              target='_blank'
              className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-slate-900 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" fill="#FFFFFF" viewBox="0 0 50 50"><path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path></svg>
            </a>
            <a href="https://www.linkedin.com/company/bhavanamsc2c/"
              target='_blank'
              className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-[#0077B5] transition-all">
              <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/bhavanamsc2c_/"
              target='_blank'
              className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] transition-all">
              <Instagram size={20} />
            </a>
            <a href="https://www.youtube.com/channel/UCzOGTExfo84ZCUXH1htqVtg"
              target='_blank'
              className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-[#FF0000] transition-all">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-4 border-t border-slate-700 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Bhavanam C2C. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
