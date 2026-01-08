import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-emerald-700 text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          About EcoClean
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg opacity-90">
          Building smarter, cleaner cities through technology-driven waste
          management solutions.
        </p>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-emerald-700">
              Our Mission
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              EcoClean revolutionizes waste collection by combining real-time
              data, intelligent routing, and seamless coordination.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              We reduce fuel consumption, minimize unnecessary trips, and ensure
              timely pickups for a sustainable future.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <ul className="space-y-4 text-sm sm:text-base">
              {[
                "Smart pickup scheduling",
                "Real-time staff coordination",
                "Reduced operational cost",
                "Cleaner & greener cities",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-emerald-600 text-xl">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
          Our Vision
        </h2>
        <p className="text-gray-600 text-sm sm:text-lg max-w-3xl mx-auto">
          To become a smart-city standard by leveraging IoT, analytics, and
          automation for better quality of life.
        </p>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gray-50 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-emerald-700">
          Project Creator
        </h2>
        <p className="text-gray-700 text-sm sm:text-base max-w-xl mx-auto">
          EcoClean is designed and developed by <b>Riduwan</b> as a smart waste
          collection optimization system.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
