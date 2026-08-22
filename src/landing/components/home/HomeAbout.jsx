import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="max-w-4xl mx-auto">
      {eyebrow && (
        <motion.p className="text-[#ffed00] text-xs uppercase tracking-[0.35em] mb-4">
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
        {title}
      </motion.h2>

      <motion.p className="mt-6 text-white/60 text-sm md:text-base leading-relaxed max-w-2xl">
        {children}
      </motion.p>
    </div>
  );
}

function RevealCard({ eyebrow, title, children }) {
  return (
    <motion.div className="relative pl-16">
      {/* dot marker on the line, lights up gold once in view */}
      <motion.span
        className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full -translate-x-1/2 bg-white/15"
        initial={{
          backgroundColor: "rgba(255,255,255,0.15)",
          boxShadow: "0 0 0px #ffed00",
        }}
        whileInView={{
          backgroundColor: "#ffed00",
          boxShadow: "0 0 8px #ffed00",
        }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.5 }}
      />

      {eyebrow && (
        <p className="text-[#ffed00]/70 text-xs uppercase tracking-[0.3em] mb-3">
          {eyebrow}
        </p>
      )}
      {title && (
        <h3 className="text-white text-2xl md:text-3xl font-semibold mb-4 leading-snug">
          {title}
        </h3>
      )}
      <div className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Wraps a group of RevealCards with its own scroll-linked glow line.
 * Each group tracks its own scroll progress independently, so the line
 * draws fresh as the user reaches that specific group — instead of every
 * group sharing one progress value tied to the whole page section.
 */
function Timeline({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto mt-24">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10">
        <motion.div
          className="w-full bg-[#ffed00] shadow-[0_0_8px_#ffed00]"
          style={{ height: lineHeight }}
        />
      </div>
      <div className="space-y-24">{children}</div>
    </div>
  );
}

function HomeAbout() {
  return (
    <section className="bg-black text-white py-32 px-8">
      <div>
        <SectionHeading title="Who We Are">
          VaultBase is a venture of CRAN3, a West African
          Infrastructure-as-a-Service (IaaS) company built on a single founding
          belief: that reliable, secure digital infrastructure should not be a
          privilege reserved for large corporations. We exist to bring that
          infrastructure to the institutions that need it most i.e schools,
          clinics, and small-to-medium enterprises across Nigeria and the
          broader West African region.
        </SectionHeading>

        <Timeline>
          <RevealCard eyebrow="Our Mission" title="Closing the gap">
            The mission is simple: we aim to close the digital infrastructure
            gap in West Africa by providing secure, affordable cloud database
            services to underserved institutions — while simultaneously creating
            employment and career pathways for young African tech talent.
          </RevealCard>

          <RevealCard
            eyebrow="Core Principles"
            title="Help first. Profit follows."
          >
            This is not a tagline — it's a structural commitment. Pricing,
            hiring, expansion decisions, and partnership terms are all evaluated
            against this principle first. Profit is necessary for
            sustainability, but it is never the north star.
          </RevealCard>
        </Timeline>
      </div>
      <div className="mt-48">
        {/* The problem we are solving */}
        <SectionHeading title="The Problem We Are Solving">
          Across Nigeria and West Africa, the majority of institutions that
          serve everyday people operate on analog or severely outdated systems.
          This is not a minor inconvenience, it is a structural failure with
          real human consequences.
        </SectionHeading>

        <Timeline>
          <RevealCard eyebrow="In Schools">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Student results go
                missing, leaving students unable to prove their academic records
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Grades are mismatched
                between students due to manual data entry errors
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Enrollment records are
                incomplete, making administrative decisions unreliable
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> There is no
                searchable, centralized student database, each term starts from
                scratch
              </li>
            </ul>
          </RevealCard>

          <RevealCard eyebrow="In Healthcare">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Patient records are
                paper-based and frequently lost or damaged
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Mismatched records
                lead to diagnostic and treatment errors
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Hospitals have no
                reliable audit trail for patient history
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Data sharing between
                departments is slow, manual, and error-prone
              </li>
            </ul>
          </RevealCard>

          <RevealCard eyebrow="In SMEs">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Business records,
                invoices, and client data exist only in spreadsheets or physical
                files
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> There is no backup or
                recovery system when data is lost
              </li>
              <li className="flex gap-3">
                <span className="text-[#ffed00]">—</span> Scaling is impossible
                without a reliable data foundation
              </li>
            </ul>
          </RevealCard>
        </Timeline>

        <motion.p
          className="text-white/50 text-2xl md:text-4xl  max-w-2xl mx-auto mt-20 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-white">These problems are ignored</span> not
          because they are unknown, but because the organizations experiencing
          them lack the technical capacity and capital to solve them
          independently. VaultBase exists to change that.
        </motion.p>
      </div>
    </section>
  );
}

export default HomeAbout;
