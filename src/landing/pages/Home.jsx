import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/home/Hero";
import HomeAbout from "../components/home/HomeAbout";
import Phases from "../components/home/Phases";
import Commitments from "../components/home/Commitments";
import ComingSoon from "../shared/ComingSoon";

function Home() {
    const containerRef = useRef(null);

    // Progress across the pinned scroll range: 0 = hero just starting to pin,
    // 1 = HomeAbout has fully risen and hero is about to unpin.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const blur = useTransform(scrollYProgress, [0, 1], [0, 6]);
    const filter = useTransform(blur, (b) => `blur(${b}px)`);

    return (
        <div ref={containerRef} className="relative">
            {/* HERO — pinned via sticky, shrinks/dims/blurs as you scroll past it */}
            <motion.div
                style={{ scale, opacity, borderRadius, filter }}
                className="sticky top-0 h-screen overflow-hidden origin-top z-0"
            >
                <Hero />
            </motion.div>

            {/* HOME ABOUT — overlaps the hero's space and rises to cover it */}
            <div className="relative z-10  rounded-t-[40px] overflow-hidden bg-black">
                <HomeAbout />
                <Phases/>
                <Commitments/>
                <ComingSoon/>
            </div>
        </div>
    );
}

export default Home;