import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeftIcon } from "lucide-react";
import { FaFacebookF, FaGoogle, FaMicrosoft } from "react-icons/fa";
import NetworkVisual from "../components/NetworkVisual";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire up to auth service
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f5f2eb]">
      {/* Form panel */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-sm w-full mx-auto"
        >
          <div className="flex absolute top-5 left-5 items-center gap-2 mb-6">
            <Link to="/">
              <ArrowLeftIcon className="text-black/40 hover:text-black/70 transition-colors cursor-pointer" />
            </Link>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl font-medium text-black mb-2">
            Welcome back
          </h1>
          <p className="font-['Sora'] text-sm text-black/50 mb-8">
            Sign in to your VaultBase account
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <button className="bg-white/40 hover:bg-[#5b6c57] font-['Space_Grotesk'] transition-colors duration-250 w-full flex gap-3 items-center justify-center py-4 px-8 border border-white/10 rounded-xl text-black">
                <FaGoogle className="inline-block" />
                <p className="text-sm">Continue with Google</p>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="bg-white/40 hover:bg-[#5b6c57] font-['Space_Grotesk'] transition-colors duration-250 w-full flex gap-3 items-center justify-center py-3 px-8 border border-white/10 rounded-xl text-black whitespace-nowrap">
                <FaFacebookF className="inline-block" />
                <p className="text-sm">Facebook</p>
              </button>
              <button className="w-full bg-white/40 hover:bg-[#5b6c57] font-['Space_Grotesk'] transition-colors duration-250 flex gap-3 items-center justify-center py-3 px-8 border border-white/10 rounded-xl text-black whitespace-nowrap">
                <FaMicrosoft className="inline-block" />
                <p className="text-sm">Microsoft</p>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center ">
            <div className="border-t w-50 border-white/20 my-6"></div>
            <span className="block text-center text-black/40 text-base my-6">
              Or
            </span>
            <div className="border-t w-50 border-white/20 my-6"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-['Sora'] text-sm text-black/80 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@school.edu.ng"
                className="w-full bg-transparent border-b border-white/20 pb-2 font-['Sora'] text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#5b6c57] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block font-['Sora'] text-sm text-black/80"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="font-['Sora'] text-xs text-black/40 hover:text-[#5b6c57] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border-b border-white/20 pb-2 pr-8 font-['Sora'] text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#5b6c57] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 bottom-2 text-black/40 hover:text-black/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5b6c57] text-[#f5f2eb] font-['Sora'] text-sm font-medium py-3 rounded-md hover:bg-[#5b6c57]/90 transition-colors mt-2"
            >
              Sign in
            </button>
          </form>

          <p className="font-['Sora'] text-sm text-black/40 mt-8 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-black hover:text-[#5b6c57] transition-colors"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Visual panel */}
      <div className="hidden lg:flex lg:w-[55%] border-l border-white/10 items-center justify-center relative overflow-hidden">
        <NetworkVisual className="w-full h-full max-w-2xl" />
      </div>
    </div>
  );
}
