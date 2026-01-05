import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, MessageCircle } from "lucide-react";
import { loginApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginApi({ email, password });
      const data = res.data;

      localStorage.setItem("token", data.token);
      setUser(data.user);

      if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "staff") navigate("/staff/dashboard");
      else navigate("/user/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      <div className="hidden lg:block relative">
        <img
          src="/public/EcoClean-Homepage.png"  
          alt="EcoClean"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-10">
          <h1 className="text-4xl font-bold tracking-wide">
            EcoClean Waste Management
          </h1>
          <p className="mt-4 text-lg text-gray-200 text-center">
            Smart. Sustainable. Efficient. Join us in building a greener tomorrow.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#f7faf9]">
        <div className="w-full max-w-md px-6">

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-emerald-800 text-3xl font-bold">
              ♻️ EcoClean
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              Optimizing waste, one collection at a time.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-5 border border-gray-100"
          >
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <label className="text-sm text-gray-700 font-medium">
                Email or Username
              </label>
              <div className="relative mt-2">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter your email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-right text-sm text-gray-500 hover:text-emerald-600 cursor-pointer">
              Forgot Password?
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-emerald-700 font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
