import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { registerApi } from "../../api/authApi.js";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerApi(formData);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      <div className="hidden lg:block relative">
        <img
          src="/EcoClean-Homepage.png"
          alt="EcoClean"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-10">
          <h1 className="text-4xl font-bold tracking-wide">
            Join EcoClean Today
          </h1>
          <p className="mt-4 text-lg text-gray-200 text-center max-w-lg">
            Be part of a community dedicated to clean, sustainable waste management.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#f7faf9] px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100">

          <div className="h-28 bg-emerald-600 flex items-center justify-center relative rounded-t-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [bg-size:16px_16px]" />
            </div>
            <h1 className="text-white text-3xl font-bold z-10">ECOCLEAN</h1>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Create Account
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              Join our community for a cleaner planet
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4 border border-green-100 text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase">
                    I am a...
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="user">Resident (User)</option>
                    <option value="staff">Collector (Staff)</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-gray-600 uppercase">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 pr-10 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-400 hover:text-emerald-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Street name, Building, Area..."
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-emerald-100 disabled:bg-emerald-300 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Creating Account..." : "Register Now"}
              </button>
            </form>

            <p className="text-sm text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
