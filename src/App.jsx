import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// layouts
import Layout from "./landing/layout/Layout";
import AuthLayout from "./auth/layout/AuthLayout";
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
          <Route path="/" element={<Layout />} />

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
