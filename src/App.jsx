import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// layouts
import Layout from "./landing/layout/Layout";
import AuthLayout from "./auth/layout/AuthLayout";

// landing pages
import Home from "./landing/pages/Home";
import Features from "./landing/pages/Features";
import HowItWorks from "./landing/pages/HowItWorks";
import Pricing from "./landing/pages/Pricing";
import Contact from "./landing/pages/Contact";

// auth pages
import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  return (
    <main className="bg-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
