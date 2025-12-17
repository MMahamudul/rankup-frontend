// Footer.jsx
import { FaFacebookF, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import logo from '../../../assets/logo-l.png'

const Footer = () => {
  return (
    <footer className=" bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex items-center ">
           
            
              
          <Link className="text-lg font-bold text-gray-900 leading-none" to='/'>
            <img src={logo} alt='logo' width='75' height='75' />
          </Link>
             
              
            
          </div>
         

          {/* Social */}
          <div className="flex items-center gap-3">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full border bg-white flex items-center justify-center text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
              aria-label="Facebook"
              title="Facebook"
            >
              <FaFacebookF />
            </Link>

            <Link
              to="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full border bg-white flex items-center justify-center text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Copyright © 2025 <span className="font-semibold">RankUp</span>.
            All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built with <span className="text-red-500"><FaHeart /></span> for creators &
            participants
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
