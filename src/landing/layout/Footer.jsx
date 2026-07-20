import { NavLink } from "react-router-dom";

function Footer() {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <footer className="bg-black text-white border-t border-white/10 px-8 pt-16 pb-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-12 md:gap-6">

                {/* Brand */}
                <div className="max-w-sm">
                    <h2 className="font-bold text-3xl mb-4">
                        Vault<span className="text-[#ffed00]">Base</span>
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed">
                        Secure, encrypted, NDPA-aligned cloud database
                        infrastructure for schools, clinics, and SMEs across
                        Nigeria and West Africa.
                    </p>
                </div>

                {/* Nav */}
                <div className="flex flex-col gap-3">
                    <p className="text-[#ffed00] text-xs uppercase tracking-[0.3em] mb-2">
                        Navigate
                    </p>
                    {navLinks.map((n) => (
                        <NavLink
                            key={n.name}
                            to={n.href}
                            className="text-white/60 hover:text-[#ffed00] text-sm transition-colors w-fit"
                        >
                            {n.name}
                        </NavLink>
                    ))}
                </div>

                {/* Social / contact */}
                <div className="flex flex-col gap-3">
                    <p className="text-[#ffed00] text-xs uppercase tracking-[0.3em] mb-2">
                        Connect
                    </p>
                    <a href="#" className="text-white/60 hover:text-[#ffed00] text-sm transition-colors w-fit">
                        Instagram
                    </a>
                    <a href="#" className="text-white/60 hover:text-[#ffed00] text-sm transition-colors w-fit">
                        LinkedIn
                    </a>
                    <a href="#" className="text-white/60 hover:text-[#ffed00] text-sm transition-colors w-fit">
                        Email
                    </a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
                    © {new Date().getFullYear()} CRAN3. All rights reserved.
                </p>
                <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
                    Help first. Profit follows.
                </p>
            </div>
        </footer>
    );
}

export default Footer;