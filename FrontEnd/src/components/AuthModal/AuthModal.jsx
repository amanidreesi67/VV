import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signup } from "../../Redux/Auth/action";
import { IoClose } from "react-icons/io5";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email: formData.email, password: formData.password }))
        .then(() => onClose())
        .catch((err) => alert("Login Failed: " + err));
    } else {
      dispatch(signup(formData))
        .then(() => onClose())
        .catch((err) => alert("Signup Failed: " + err));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      {/* Main Container - Purple Gradient Background */}
      <div className="relative flex w-[900px] h-[450px] bg-linear-to-b from-[#8A2BE2] to-[#B026FF] rounded-2xl overflow-hidden shadow-2xl items-center">
        {/* Close Button - Top Right of the Main Container */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-black hover:bg-black hover:text-white z-20 transition-colors"
        >
          <IoClose size={28} />
        </button>

        {/* Left Side - Content Directly on Purple Background */}
        <div className="w-1/2 h-full p-4 text-white flex flex-col justify-between relative pl-12">
          <div className="flex gap-8 mt-8">
            <h2 className="text-4xl font-extrabold tracking-wider drop-shadow-md">
              UPTOWNIE
            </h2>
            <p className="text-sm mt-2 opacity-90 font-medium tracking-wide">
              Powered by KwikPass
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-3xl font-bold leading-tight drop-shadow-sm">
              {isLogin ? "Welcome Back!" : "Join the Community!"}
            </h3>
            <p className="mt-3 text-lg opacity-90 font-light">
              {isLogin
                ? "Login to access your exclusive deals."
                : "Register now to avail the best deals and offers."}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
            <div className="flex justify-between gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl filter drop-shadow-md">✨</span>
                <span className="text-sm font-semibold">Zero Fees</span>
                <span className="text-xs font-semibold">
                  Access KwikPass without any subscription charges
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl filter drop-shadow-md">🔥</span>
                <span className="text-sm font-semibold">Best Prices</span>
                <span className="text-xs font-semibold">
                  Explore unbeatable prices and unmatchable value
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl filter drop-shadow-md">🛡️</span>
                <span className="text-sm font-semibold">100% Secure</span>
                <span className="text-xs font-semibold">
                  Guaranteed data protection & spam-free inbox
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Floating White Card */}
        <div className="w-1/2 h-full flex items-center justify-center p-6 bg-transparent">
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-sm p-8 relative transform transition-all hover:scale-[1.01]">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <p className="text-gray-500 text-sm mb-8 text-center">
              {isLogin
                ? "Enter your details to continue"
                : "Create your account in seconds"}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {!isLogin && (
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium text-sm"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium text-sm"
                    required
                  />
                </div>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium text-sm"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium text-sm"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#8A2BE2] text-white py-3.5 rounded-lg font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-200 mt-2"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-500 font-medium hover:text-[#8A2BE2] transition-colors"
              >
                {isLogin ? "New here? " : "Already have an account? "}
                <span className="underline decoration-2 underline-offset-2 decoration-purple-200 hover:decoration-[#8A2BE2] font-bold text-gray-800">
                  {isLogin ? "Create an Account" : "Login"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
