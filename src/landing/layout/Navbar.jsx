import { useEffect, useState } from "react";
import CTA from "../shared/CTA";
import header_img from "/assets/header-logo.png";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll(); // set correct state on mount (e.g. if page loads already scrolled)
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  const desktopLink = ({ isActive }) =>
    `relative pb-1 font-medium transition-colors text-sm ${
      isActive ? "text-[#ffed00]" : "text-[#ffed00]/60 hover:text-[#ffed00]"
    } after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-[#ffed00] after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 flex py-8 items-center justify-between px-8 transition-colors duration-300 ${
          scrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div>
          <img src={header_img} alt="header_img" className="w-15" />
        </div>
        <div className="hidden md:flex items-center gap-20">
          <ul className="flex gap-10 text-[#ffed00]">
            {navLinks.map((n) => (
              <li key={n.name}>
                <NavLink className={desktopLink} to={n.href}>
                  {n.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <CTA />
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          className="md:hidden relative w-9 h-9 flex items-center justify-center"
        >
          <div className="w-6 flex flex-col gap-[5px]">
            <span
              className={`h-[1.5px] bg-[#ffed00] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
            />
            <span
              className={`h-[1.5px] bg-[#ffed00] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[1.5px] bg-[#ffed00] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`fixed inset-0 z-[60] bg-black transition-all duration-500 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="flex flex-col h-full">
          {/* Top */}
          <div className="flex items-center justify-between px-6 py-6">
            <h1 className="font-bold text-white text-3xl">
              Vault<span className="text-[#ffed00]">Base</span>
            </h1>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-[#ffed00] text-3xl tracking-widest uppercase hover:opacity-70 transition"
            >
              𐋄
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center px-8">
            <p className="uppercase tracking-[0.4em] text-xs text-[#ffed00] mb-12">
              Navigation
            </p>
            <nav>
              <ul className="space-y-8">
                {navLinks.map((n, index) => (
                  <li
                    key={n.name}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    className={`transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  >
                    <NavLink
                      to={n.href}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `group inline-flex items-center gap-4 text-4xl md:text-5xl font-serif tracking-wide transition-all duration-300 ${
                          isActive
                            ? "text-[#ffed00]"
                            : "text-white hover:text-[#ffed00]"
                        }`
                      }
                    >
                      <span className="text-base text-[#ffed00]/50">
                        0{index + 1}
                      </span>
                      {n.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer */}

          <div className="px-8 pb-10">
            <div className="border-t border-[#ffed00]/30 pt-8">
              <div className="flex justify-between uppercase tracking-[0.25em] text-[11px] text-[#ffed00]/80">
                <a href="#" className="hover:text-[#ffed00] transition">
                  Instagram
                </a>

                <a href="#" className="hover:text-[#ffed00] transition">
                  LinkedIn
                </a>

                <a href="#" className="hover:text-[#ffed00] transition">
                  Email
                </a>
              </div>

              <p className="mt-8 text-[10px] tracking-[0.35em] text-[#ffed00]/50 uppercase">
                © {new Date().getFullYear()} CRAN3
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
