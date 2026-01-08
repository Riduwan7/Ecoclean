import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaClipboardCheck,
  FaCalendarAlt,
  FaBell,
  FaMapMarkedAlt,
  FaStar,
  FaUserShield,
} from "react-icons/fa";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-emerald-600 text-white py-16 sm:py-20 md:py-24 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          User Features
        </h1>
        <p className="max-w-3xl mx-auto text-sm sm:text-lg opacity-90">
          Everything you need to manage waste pickups easily.
        </p>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          <FeatureCard
            icon={<FaClipboardCheck />}
            title="Easy Pickup Requests"
            desc="Request waste pickup quickly by selecting waste type, address, and preferred date."
          />

          <FeatureCard
            icon={<FaCalendarAlt />}
            title="Scheduled Pickups"
            desc="Choose a pickup date that fits your schedule and avoid missed collections."
          />

          <FeatureCard
            icon={<FaBell />}
            title="Live Status Updates"
            desc="Get real-time updates as your pickup progresses from assigned to completed."
          />

          <FeatureCard
            icon={<FaMapMarkedAlt />}
            title="Pickup Tracking"
            desc="Track your pickup progress and know when the collector is on the way."
          />

          <FeatureCard
            icon={<FaStar />}
            title="Ratings & Reviews"
            desc="Rate the service and share feedback to help improve waste collection quality."
          />

          <FeatureCard
            icon={<FaUserShield />}
            title="Secure Account"
            desc="Your personal data and pickup history are protected with secure authentication."
          />

        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition text-center">
    <div className="text-emerald-600 text-3xl mb-4">{icon}</div>
    <h3 className="text-base sm:text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default Features;
