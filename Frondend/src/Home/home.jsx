import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import {
  FaCalendarCheck,
  FaCreditCard,
  FaClipboardList,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <section className="relative py-32 md:py-48 px-6 sm:px-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/EcoClean-Homepage.png')`,
            backgroundPosition: "bottom center"
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.1) 90%)"
            }}
          ></div>
        </div>

        <div className="relative z-10 text-white max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            ECOCLEAN – Smart Waste Collection Optimization System
          </h1>

          <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 leading-tight">
            created by Riduwan
          </h3>

          <p className="text-lg sm:text-xl mb-10 opacity-90 font-bold">
            Revolutionizing waste management for a cleaner, greener city with our smart optimization system. **We use cutting-edge 
            IoT sensors and AI-driven routing to achieve up to 30% savings in collection costs, drastically reducing fuel consumption 
            and minimizing carbon emissions. Leverage real-time data to ensure timely, demand-driven waste collection.**
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      <section className="py-20 px-16 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Our mission is to enhance urban living by providing an efficient,
          sustainable, and community-focused waste management solution.Revolutionizing waste management for a cleaner, greener city 
          with our smart optimization system. **We use cutting-edge IoT sensors and AI-driven routing to achieve up to 30% savings 
          in collection costs, drastically reducing fuel consumption and minimizing carbon emissions. Leverage real-time data to 
          ensure timely, demand-driven waste collection.**
        </p>
      </section>

      <section className="py-20 px-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
            <FaCalendarCheck size={40} className="text-green-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Event Available</h3>
            <p>Easily schedule and manage your waste collection times.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
            <FaCreditCard size={40} className="text-green-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Credit Card</h3>
            <p>Securely pay your bills online with just a few taps.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
            <FaClipboardList size={40} className="text-green-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Subscriptions</h3>
            <p>Pick the subscription plan that suits your needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
            <FaUsers size={40} className="text-green-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p>Admin Dashboard: Monitor and manage operations efficiently.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-16 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
            <FaCheckCircle size={40} className="text-green-700 mb-4" />
            <h3 className="text-2xl font-bold mb-2">1</h3>
            <p>Register online – Create an account in minutes.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
            <FaCheckCircle size={40} className="text-green-700 mb-4" />
            <h3 className="text-2xl font-bold mb-2">2</h3>
            <p>Choose your plan & schedule your pickup.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
            <FaCheckCircle size={40} className="text-green-700 mb-4" />
            <h3 className="text-2xl font-bold mb-2">3</h3>
            <p>Track your pickup in real-time.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="italic text-gray-700">
              "എടാ മോനേ, Ecoclean അടിപൊളിയാണ്. ഞാനും അൻബാനും എന്റെ പിള്ളേരും ഇതാണ് ഉപയോഗിക്കുന്നത്."
            </p>
            <h4 className="font-bold mt-4 text-lg text-green-700">Ranga</h4>
            <span className="text-sm text-gray-500">Residential User</span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="italic text-gray-700">
              "ഈക്കോക്ലീൻ ഉപയോഗിച്ച് ഞങ്ങളുടെ മാലിന്യം ശേഖരണ ചിലവ് ഗണ്യമായി കുറയ്ക്കാൻ സാധിച്ചു. 
              സാങ്കേതികവിദ്യയുടെ സഹായത്താൽ കാര്യക്ഷമത വർധിക്കുകയും നഗരം കൂടുതൽ വൃത്തിയായി സൂക്ഷിക്കാൻ 
              കഴിയുകയും ചെയ്യുന്നു."
            </p>
            <h4 className="font-bold mt-4 text-lg text-green-700">
              ശ്രീ. രമേശൻ പി.
            </h4>
            <span className="text-sm text-gray-500">
              നഗരസഭാ ഉദ്യോഗസ്ഥൻ
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 px-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="mb-6">
          Join us in creating cleaner, smarter cities.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Register for Free
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
