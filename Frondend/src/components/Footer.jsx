import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">ECOCLEAN</h3>
          <p className="text-gray-300">
            Smart waste solutions for a cleaner environment.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Links</h4>
          <ul className="space-y-2">
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
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-300 transition">Facebook</a>
            <a href="#" className="hover:text-green-300 transition">Twitter</a>
            <a href="#" className="hover:text-green-300 transition">Instagram</a>
          </div>
        </div>
      </div>

      <div className="border-t border-green-800 text-center py-4 text-gray-400 text-sm">
        © 2024 EcoClean. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
