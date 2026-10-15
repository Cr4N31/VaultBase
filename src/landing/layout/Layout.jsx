import Navbar from "./Navbar";
import Home from "../pages/Home";
import Features from "../pages/Features";
import HowItWorks from "../pages/HowItWorks";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="bg-[#f5f2eb]">
      <Navbar />
      <main>
        <section id="home" className="scroll-mt-20">
          <Home />
        </section>
        <section id="features" className="scroll-mt-20">
          <Features />
        </section>
        <section id="how-it-works" className="scroll-mt-20">
          <HowItWorks />
        </section>
        <section id="pricing" className="scroll-mt-20">
          <Pricing />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
