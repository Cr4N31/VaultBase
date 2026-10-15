import { motion } from "framer-motion";

function ComingSoon() {
  return (
    <section className="bg-[#f5f2eb] text-black py-32 px-8 text-center overflow-hidden">
      <motion.p
        className="text-[#5b6c57] text-xs uppercase tracking-[0.35em] mb-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        What's Next
      </motion.p>

      <motion.p
        className="text-black/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-20"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        We at VaultBase are embarking on a journey — a journey to not only
        secure the privacy of Nigerian citizens and Africa as a whole, but to
        build something we can be proud of, something to put us on the
        international technological map. Stay tuned for more.
      </motion.p>

      <motion.h2
        className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        Coming <span className="text-[#5b6c57]">Soon</span>
      </motion.h2>

      <motion.div
        className="mt-16 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        {/* Swap src for the actual CRAN3 mark once you have the asset path */}
        <img
          src="/assets/header-logo.png"
          alt="CRAN3"
          className="h-12 w-auto opacity-70"
        />
        <p className="text-black/40 text-xs uppercase tracking-[0.3em]">
          A CRAN3 Company
        </p>
      </motion.div>
    </section>
  );
}

export default ComingSoon;
