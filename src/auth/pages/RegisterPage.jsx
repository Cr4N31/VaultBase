import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeftIcon } from "lucide-react";
import { FaFacebookF, FaGoogle, FaMicrosoft } from "react-icons/fa";
import NetworkVisual from "../components/NetworkVisual";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire up to auth service — Individual vs Enterprise branching
    // happens post-auth, so this form stays deliberately neutral.
  };

  return (
    <div className="min-h-screen w-full flex bg-black overflow-x-hidden">
      {/* Form panel */}
      <div className="w-full lg:w-[45%] flex flex-col justify-start px-8 sm:px-16 py-12 min-w-0 max-h-screen overflow-y-auto register-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-sm w-full mx-auto min-w-0"
        >
          <div className="flex absolute top-5 left-5 items-center gap-2 mb-6">
            <Link to="/">
              <ArrowLeftIcon className="text-white/40 hover:text-white/70 transition-colors cursor-pointer" />
            </Link>
          </div>

          <h1 className="font-['Space_Grotesk'] text-2xl font-medium text-white mb-2">
            Create your account
          </h1>
          <p className="font-['Sora'] text-sm text-white/50 mb-8">
            Secure, encrypted data infrastructure for your institution
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <button className="bg-white/10 font-['Space_Grotesk'] hover:bg-white/20 transition-colors duration-250 w-full flex gap-3 items-center justify-center py-4 px-8 border border-white/10 rounded-xl text-white">
                <FaGoogle className="inline-block" />
                <p className="text-sm">Continue with Google</p>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="bg-white/10 font-['Space_Grotesk'] hover:bg-white/20 transition-colors duration-250 w-full flex gap-3 items-center justify-center py-3 px-8 border border-white/10 rounded-xl text-white whitespace-nowrap">
                <FaFacebookF className="inline-block" />
                <p className="text-sm">Facebook</p>
              </button>
              <button className="w-full bg-white/10 font-['Space_Grotesk'] hover:bg-white/20 transition-colors duration-250 flex gap-3 items-center justify-center py-3 px-8 border border-white/10 rounded-xl text-white whitespace-nowrap">
                <FaMicrosoft className="inline-block" />
                <p className="text-sm">Microsoft</p>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center ">
            <div className="border-t w-50 border-white/20 my-6"></div>
            <span className="block text-center text-white/40 text-base my-6">
              Or
            </span>
            <div className="border-t w-50 border-white/20 my-6"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 min-w-0">
            <div>
              <label
                htmlFor="fullName"
                className="block font-['Sora'] text-sm text-white/80 mb-2"
              >
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full bg-transparent border-b border-white/20 pb-2 font-['Sora'] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffed00] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-['Sora'] text-sm text-white/80 mb-2"
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
                className="w-full bg-transparent border-b border-white/20 pb-2 font-['Sora'] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffed00] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-['Sora'] text-sm text-white/80 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full bg-transparent border-b border-white/20 pb-2 pr-8 font-['Sora'] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffed00] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 bottom-2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <p className="font-['Sora'] text-xs text-white/40 leading-relaxed">
              By creating an account, you agree to VaultBase's{" "}
              <Link
                to="/terms"
                className="text-white/60 hover:text-[#ffed00] transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-white/60 hover:text-[#ffed00] transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              className="w-full bg-[#ffed00] text-black font-['Sora'] text-sm font-medium py-3 rounded-md hover:bg-[#ffed00]/90 transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="font-['Sora'] text-sm text-white/40 mt-8 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:text-[#ffed00] transition-colors"
            >
              Sign in
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
