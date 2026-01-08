import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleStartClick = () => {
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white text-green-900 shadow-lg border-b border-gray-200 relative z-50">
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
            <Link to="/aboutus" className="hover:text-green-600 transition">
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

        <div className="hidden md:block">
          <button
            onClick={handleStartClick}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md shadow-green-200"
          >
            Start With Us
          </button>
        </div>

        <button
          className="md:hidden text-green-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col items-center py-6 space-y-6 animate-in slide-in-from-top-5 duration-200">
          <Link
            to="/"
            className="text-lg font-medium hover:text-green-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            className="text-lg font-medium hover:text-green-600 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/features"
            className="text-lg font-medium hover:text-green-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/contact"
            className="text-lg font-medium hover:text-green-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <button
            onClick={handleStartClick}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md w-3/4"
          >
            Start With Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
