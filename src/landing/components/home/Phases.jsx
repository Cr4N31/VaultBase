import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  NIGERIA_PATH,
  NIGERIA_VIEWBOX,
  AFRICA_OUTLINE_PATH,
  AFRICA_VIEWBOX,
  WEST_AFRICA_COUNTRY_PATHS,
} from "./mapPaths";

const MAP_DRAW_DURATION = 1;
const MAP_START_DELAY = 0.3;
const PARAGRAPH_DELAY = MAP_START_DELAY + MAP_DRAW_DURATION * 0.6;

/** Fires once when the element enters the viewport, then stops observing for good. */
function useInViewOnce(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}

/* Map / diagram components — neutral line art. Gold is reserved for
   small accent points only, not the map itself. */

function NigeriaMap({ inView }) {
  return (
    <svg viewBox={NIGERIA_VIEWBOX} className="w-full h-auto">
      <motion.path
        d={NIGERIA_PATH}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{
          duration: MAP_DRAW_DURATION,
          ease: "easeInOut",
          delay: MAP_START_DELAY,
        }}
      />
    </svg>
  );
}

function WestAfricaMap({ inView }) {
  return (
    <svg viewBox={AFRICA_VIEWBOX} className="w-full h-auto">
      <motion.path
        d={AFRICA_OUTLINE_PATH}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{
          duration: MAP_DRAW_DURATION,
          ease: "easeInOut",
          delay: MAP_START_DELAY,
        }}
      />
      {WEST_AFRICA_COUNTRY_PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="#ffffff"
          fillOpacity="0.4"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: MAP_START_DELAY + MAP_DRAW_DURATION * 0.6,
          }}
        />
      ))}
    </svg>
  );
}

/*
 * VaultTree — hub diagram. Lines and node outlines are neutral;
 * gold is only the small center dot on each node, as an accent.
 */
function VaultTree({ inView }) {
  const hub = { x: 200, y: 230 };
  const hubRadius = 22;
  const nodeRadius = 8;

  const nodes = [
    { x: 70, y: 100, label: "Education" },
    { x: 200, y: 65, label: "Healthcare" },
    { x: 330, y: 100, label: "Government" },
  ];

  const lineEndpoint = (node) => {
    const dx = node.x - hub.x;
    const dy = node.y - hub.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ratio = (dist - nodeRadius - 4) / dist;
    return { x: hub.x + dx * ratio, y: hub.y + dy * ratio };
  };

  const lineStart = (node) => {
    const dx = node.x - hub.x;
    const dy = node.y - hub.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ratio = (hubRadius + 4) / dist;
    return { x: hub.x + dx * ratio, y: hub.y + dy * ratio };
  };

  return (
    <svg viewBox="0 0 400 280" className="w-full h-auto">
      {/* connecting lines — neutral, not gold */}
      {nodes.map((n, i) => {
        const start = lineStart(n);
        const end = lineEndpoint(n);
        return (
          <motion.line
            key={i}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.25"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: MAP_START_DELAY + i * 0.12,
            }}
          />
        );
      })}

      {/* leaf nodes — neutral ring, single gold center dot as the accent */}
      {nodes.map((n, i) => (
        <motion.g
          key={`node-${i}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.3,
            delay: MAP_START_DELAY + i * 0.12 + 0.4,
          }}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r={nodeRadius}
            fill="#0A0A0A"
            stroke="#ffffff"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          <circle cx={n.x} cy={n.y} r={2.5} fill="#ffed00" />
          <text
            x={n.x}
            y={n.y + nodeRadius + 18}
            textAnchor="middle"
            fill="#ffffff"
            fillOpacity="0.6"
            fontSize="10"
            letterSpacing="0.1em"
            className="uppercase"
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* hub — the one place a gold outline is warranted, since it's the
          single "active" element the other nodes branch from */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: MAP_START_DELAY }}
      >
        <text
          x={hub.x}
          y={hub.y + 4}
          textAnchor="middle"
          fill="#ffffff7a"
          fontSize="20"
          fontWeight="600"
        >
          VaultBase
        </text>
      </motion.g>
    </svg>
  );
}

/* Phase card */

function PhaseCard({ label, title, MapComponent, children }) {
  const [ref, inView] = useInViewOnce(0.2);

  return (
    <div
      ref={ref}
      className="bg-[#0A0A0A] border border-white/10 rounded-lg p-8 flex flex-col"
    >
      <motion.p
        className="text-[#ffed00] text-xs uppercase tracking-[0.25em] mb-2"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {label}
      </motion.p>

      <motion.h3
        className="text-white text-xl font-bold mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
      >
        {title}
      </motion.h3>

      <div className="max-w-[220px] mx-auto mb-8">
        <MapComponent inView={inView} />
      </div>

      <motion.p
        className="text-white/55 text-sm leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut", delay: PARAGRAPH_DELAY }}
      >
        {children}
      </motion.p>
    </div>
  );
}

/* Main section */

function Phases() {
  return (
    <section className="relative bg-black py-24 px-8">
      <motion.h1 className="text-white text-4xl md:text-6xl font-bold text-center max-w-3xl mx-auto mb-16">
        Our Vision? Where This Goes
      </motion.h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <PhaseCard
          label="Phase 1 — Years 1-2"
          title="Nigeria"
          MapComponent={NigeriaMap}
        >
          Establish <span className="text-white font-medium">VaultBase</span> as
          a trusted infrastructure provider for schools and SMEs in Nigeria.
          Build the core platform, onboard the first cohort of youth programme
          participants, and prove the concept with a minimum of 20 client
          organizations.
        </PhaseCard>

        <PhaseCard
          label="Phase 2 — Years 3-5"
          title="West Africa"
          MapComponent={WestAfricaMap}
        >
          Expand into{" "}
          <span className="text-white font-medium">
            Ghana, Togo, Senegal, and other West African
          </span>{" "}
          markets. Adapt the platform for multilingual environments and
          region-specific compliance requirements, and scale the talent pipeline
          to produce hundreds of employed junior developers across the region.
        </PhaseCard>

        <PhaseCard
          label="Phase 3 — Years 5+"
          title="Sector Specialization"
          MapComponent={VaultTree}
        >
          Develop sector-specific database templates for{" "}
          <span className="text-white font-medium">
            healthcare, education, and government
          </span>
          . Position VaultBase as the default infrastructure layer for
          public-sector digitization across West Africa — not as a government
          contractor, but as a trusted private partner with a proven track
          record.
        </PhaseCard>
      </div>

      <motion.div className="max-w-2xl mx-auto text-center py-20 px-5 text-white">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
          The Metric That Matters Most
        </h2>

        <div className="flex flex-col gap-3 max-w-xl mx-auto text-left">
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            We measure success not primarily in revenue, but in two numbers:
          </p>

          <div className="flex gap-2">
            <span className="text-white/30">—</span>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              <span className="text-[#ffed00] font-medium">
                How many organizations have stopped losing data
              </span>
              , and
            </p>
          </div>

          <div className="flex gap-2">
            <span className="text-white/30">—</span>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              <span className="text-[#ffed00] font-medium">
                How many young people have found meaningful technical employment
              </span>
            </p>
          </div>

          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            because of what we built.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Phases;
