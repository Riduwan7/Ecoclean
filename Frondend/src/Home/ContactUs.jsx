import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="bg-emerald-700 text-white py-16 sm:py-20 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Contact Us
        </h1>
        <p className="text-sm sm:text-lg opacity-90 max-w-2xl mx-auto">
          Have questions or feedback? We’re here to help 🌱
        </p>
      </section>

      <section className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Get in Touch
          </h2>

          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Reach out for queries, complaints, or partnerships.
          </p>

          <div className="space-y-6">
            <ContactItem icon={<Mail />} title="Email" value="riduwanc48@gmail.com" />
            <ContactItem icon={<Phone />} title="Phone" value="+91 73566 82515" />
            <ContactItem
              icon={<MapPin />}
              title="Office Address"
              value="EcoClean HQ, Manjeri, Kerala, India"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
            Send us a Message
          </h3>

          <form className="space-y-4 sm:space-y-5">
            <input className="input" placeholder="Your Name" required />
            <input className="input" type="email" placeholder="Your Email" required />
            <textarea className="input resize-none" rows="4" placeholder="Your Message" required />

            <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition">
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const ContactItem = ({ icon, title, value }) => (
  <div className="flex items-start gap-4">
    <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-gray-700 text-sm sm:text-base">{title}</p>
      <p className="text-gray-500 text-xs sm:text-sm">{value}</p>
    </div>
  </div>
);

export default Contact;
