import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/home/Hero";
import HomeAbout from "../components/home/HomeAbout";
import Phases from "../components/home/Phases";
import Commitments from "../components/home/Commitments";

function Home() {
  // Tracks only the Hero+ImpactComparison block itself, not the whole page.
  const heroRef = useRef(null);

  // offset: ["end end", "end start"] scopes progress to just the tail end
  // of this block's scroll — 0 while it's still fully in view (so the
  // whole thing scrolls normally, nothing clipped or hidden), ramping to
  // 1 only as its bottom edge crosses from the bottom of the viewport to
  // the top — i.e. exactly the moment HomeAbout is rising to cover it.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <div className="bg-[#f5f2eb] relative flex flex-col md:mt-28 mt-8">
      {/* HERO + IMPACT COMPARISON — scrolls normally at full natural height,
          so every bit of content is reachable by scrolling. The shrink/
          blur/round-corner effect only kicks in during the final stretch,
          right as HomeAbout is about to cover it. */}
      <motion.div
        ref={heroRef}
        style={{ scale, opacity, borderRadius, filter }}
        className="relative min-h-[60vh] overflow-hidden origin-top z-0"
      >
        <Hero />
      </motion.div>

      {/* HOME ABOUT — overlaps the hero's space and rises to cover it */}
      <div className="relative z-10 mt-12 rounded-t-[40px] overflow-hidden">
        <HomeAbout />
        <Phases />
        <Commitments />
      </div>
    </div>
  );
}

export default Home;
