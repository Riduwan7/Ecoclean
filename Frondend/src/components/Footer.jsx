import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h3 className="font-bold text-xl mb-3">ECOCLEAN</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Smart waste solutions for a cleaner and sustainable environment.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-lg">Links</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link to="/" className="hover:text-green-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-green-300 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-green-300 transition">
                Features
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-lg">Legal</h4>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li className="hover:text-green-300 transition cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-green-300 transition cursor-pointer">
              Terms of Service
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-lg">Follow Us</h4>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-sm sm:text-base">
            <a href="#" className="hover:text-green-300 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-green-300 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-green-300 transition">
              Instagram
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-green-800 text-center py-4 px-4 text-gray-400 text-xs sm:text-sm">
        © 2024 EcoClean. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
