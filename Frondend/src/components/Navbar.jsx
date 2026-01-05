import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white text-green-900 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-3 group transition">
          <img 
            src={"/EcoCleanLogo.png"} 
            alt="EcoClean Logo" 
            className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300" 
          />
          <span className="text-2xl font-bold group-hover:text-green-600 transition-colors">
            ECOCLEAN
          </span>
        </Link>

        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/" className="hover:text-green-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-600 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/features" className="hover:text-green-600 transition">
              Features
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-600 transition">
              Contact
            </Link>
          </li>
        </ul>

        <div>
          <button
            onClick={handleStartClick}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md shadow-green-200"
          >
            Start With Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
