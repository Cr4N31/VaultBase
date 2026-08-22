import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

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

const capabilities = [
  {
    title: "Live schema visualisation",
    description:
      "See how your tables and records actually connect, in real time.",
  },
  {
    title: "Backup & monitoring",
    description:
      "Automated backups and uptime monitoring running by default, not as an add-on.",
  },
  {
    title: "One overview, always current",
    description:
      "A single dashboard view of your organization's data, no digging required.",
  },
];

// Schema data — same tables as before, just visualised differently.
// "organizations" is the trunk; "records" and "audit_log" branch off it.
const ROOT = { x: 60, y: 240, label: "organizations" };
const TRUNK_END_X = 960;

const BRANCHES = [
  {
    name: "records",
    direction: "up",
    offX: 320,
    landX: 420,
    landY: 100,
    endX: 780,
    fields: [
      { x: 500, label: "id", type: "uuid" },
      { x: 620, label: "org_id", type: "fk" },
      { x: 720, label: "data", type: "encrypted", locked: true },
    ],
  },
  {
    name: "audit_log",
    direction: "down",
    offX: 640,
    landX: 720,
    landY: 380,
    endX: 940,
    fields: [
      { x: 790, label: "id", type: "uuid" },
      { x: 860, label: "actor", type: "text" },
      { x: 920, label: "action", type: "text" },
    ],
  },
];

function branchPath(offX, landX, landY, trunkY) {
  const midX = (offX + landX) / 2;
  return `M${offX},${trunkY} C${midX},${trunkY} ${midX},${landY} ${landX},${landY}`;
}

// Timing for the draw-in reveal (unchanged from before)
const TRUNK_DRAW_DURATION = 0.8;
const branchCurveDelay = (bi) => 0.3 + bi * 0.2;
const branchLandingDelay = (bi) => 0.6 + bi * 0.2;
const fieldDelay = (bi, fi) => 0.9 + bi * 0.2 + fi * 0.1;

// Timing for the one-time glow pulse — starts once the lines have
// finished drawing, then travels trunk -> each branch in sequence.
const GLOW_START = 1.6;
const GLOW_TRUNK_DURATION = 0.9;
const GLOW_BRANCH_CURVE_DURATION = 0.5;
const GLOW_BRANCH_LANDING_DURATION = 0.35;

function trunkFraction(x) {
  return (x - ROOT.x) / (TRUNK_END_X - ROOT.x);
}

/** A short glowing segment that slides once along a straight line. */
function GlowPulseLine({ x1, y1, x2, y2, delay, duration }) {
  return (
    <>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#ffed00"
        strokeWidth="7"
        strokeLinecap="round"
        filter="url(#glow)"
        pathLength={0.14}
        initial={{ pathOffset: -0.14, opacity: 0.6 }}
        animate={{ pathOffset: 1 }}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={0.14}
        initial={{ pathOffset: -0.14 }}
        animate={{ pathOffset: 1 }}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
    </>
  );
}

/** A short glowing segment that slides once along a curved branch path. */
function GlowPulsePath({ d, delay, duration }) {
  return (
    <>
      <motion.path
        d={d}
        fill="none"
        stroke="#ffed00"
        strokeWidth="7"
        strokeLinecap="round"
        filter="url(#glow)"
        pathLength={0.16}
        initial={{ pathOffset: -0.16, opacity: 0.6 }}
        animate={{ pathOffset: 1 }}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={0.16}
        initial={{ pathOffset: -0.16 }}
        animate={{ pathOffset: 1 }}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
    </>
  );
}

function BranchDiagram() {
  const [ref, inView] = useInViewOnce(0.2);

  return (
    <div ref={ref} className="relative w-full aspect-[1000/440]">
      <svg viewBox="0 0 1000 440" className="w-full h-full">
        <defs>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* faint tick marks along the trunk, purely textural */}
        {Array.from({ length: 22 }).map((_, i) => (
          <line
            key={i}
            x1={60 + i * 40}
            y1={ROOT.y - 6}
            x2={60 + i * 40}
            y2={ROOT.y + 6}
            stroke="#ffffff"
            strokeOpacity="0.08"
          />
        ))}

        {/* trunk */}
        <motion.line
          x1={ROOT.x}
          y1={ROOT.y}
          x2={TRUNK_END_X}
          y2={ROOT.y}
          stroke="#ffffff"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: TRUNK_DRAW_DURATION, ease: "easeInOut" }}
        />

        {/* branches */}
        {BRANCHES.map((branch, bi) => (
          <g key={branch.name}>
            <motion.path
              d={branchPath(branch.offX, branch.landX, branch.landY, ROOT.y)}
              fill="none"
              stroke="#030303"
              strokeOpacity="0.3"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
                delay: branchCurveDelay(bi),
              }}
            />
            <motion.line
              x1={branch.landX}
              y1={branch.landY}
              x2={branch.endX}
              y2={branch.landY}
              stroke="#0f0f0f"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: branchLandingDelay(bi),
              }}
            />

            {/* branch-off point on the trunk */}
            <motion.circle
              cx={branch.offX}
              cy={ROOT.y}
              r="3.5"
              fill="#0A0A0A"
              stroke="#0c0c0c"
              strokeOpacity="0.5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: branchCurveDelay(bi) }}
            />

            {/* field dots along the branch */}
            {branch.fields.map((field, fi) => (
              <motion.g
                key={field.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: fieldDelay(bi, fi) }}
              >
                <circle
                  cx={field.x}
                  cy={branch.landY}
                  r="4"
                  fill={field.locked ? "#ffed00" : "#0A0A0A"}
                  stroke={field.locked ? "#ffed00" : "#ffffff"}
                  strokeOpacity={field.locked ? "1" : "0.4"}
                  strokeWidth="1.5"
                />
                <text
                  x={field.x}
                  y={
                    branch.direction === "up"
                      ? branch.landY - 14
                      : branch.landY + 24
                  }
                  textAnchor="middle"
                  fill={field.locked ? "#ffed00" : "#ffffff"}
                  fillOpacity={field.locked ? "0.9" : "0.4"}
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {field.label}
                </text>
                <text
                  x={field.x}
                  y={
                    branch.direction === "up"
                      ? branch.landY + 20
                      : branch.landY - 10
                  }
                  textAnchor="middle"
                  fill="#ffffff"
                  fillOpacity="0.25"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {field.type}
                </text>
              </motion.g>
            ))}
          </g>
        ))}

        {/* One-time glow pulse: trunk, then splits into each branch */}
        {inView && (
          <>
            <GlowPulseLine
              x1={ROOT.x}
              y1={ROOT.y}
              x2={TRUNK_END_X}
              y2={ROOT.y}
              delay={GLOW_START}
              duration={GLOW_TRUNK_DURATION}
            />
            {BRANCHES.map((branch, bi) => {
              const curveStart =
                GLOW_START + GLOW_TRUNK_DURATION * trunkFraction(branch.offX);
              const landingStart = curveStart + GLOW_BRANCH_CURVE_DURATION;
              return (
                <g key={`glow-${branch.name}`}>
                  <GlowPulsePath
                    d={branchPath(
                      branch.offX,
                      branch.landX,
                      branch.landY,
                      ROOT.y,
                    )}
                    delay={curveStart}
                    duration={GLOW_BRANCH_CURVE_DURATION}
                  />
                  <GlowPulseLine
                    x1={branch.landX}
                    y1={branch.landY}
                    x2={branch.endX}
                    y2={branch.landY}
                    delay={landingStart}
                    duration={GLOW_BRANCH_LANDING_DURATION}
                  />
                </g>
              );
            })}
          </>
        )}
      </svg>

      {/* HTML pill labels, positioned over the SVG by percentage */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 bg-black text-white/80 border border-white/20 text-[11px] font-mono font-medium px-3 py-1 rounded-full whitespace-nowrap"
        style={{
          left: `${(ROOT.x / 1000) * 100}%`,
          top: `${(ROOT.y / 440) * 100}%`,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        organizations
      </motion.div>

      {BRANCHES.map((branch, bi) => (
        <motion.div
          key={branch.name}
          className="absolute -translate-x-1/2 -translate-y-1/2  bg-black text-white/80 border border-white/20  text-[11px] font-mono font-medium px-3 py-1 rounded-full whitespace-nowrap"
          style={{
            left: `${(branch.landX / 1000) * 100}%`,
            top: `${(branch.landY / 440) * 100}%`,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 + bi * 0.2 }}
        >
          {branch.name}
        </motion.div>
      ))}
    </div>
  );
}

function ErdVisualizer() {
  return (
    <div className="relative bg-black py-24 px-8 overflow-hidden">
      {/* Subtle dark layer for depth over the section background */}
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16" data-aos="fade-in">
          <p className="uppercase tracking-[0.3em] text-xs text-[#ffed00] mb-4">
            See it, don't guess it
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Visualise your database, not just your data.
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Every organization gets a live view of how their tables relate,
            what's encrypted, and what's running behind the scenes.
          </p>
        </div>

        {/* Branch-timeline schema diagram */}
        <div className="mb-20" data-aos="fade-in">
          <BranchDiagram />
        </div>

        {/* Capability highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={capability.title}
              className="border-t border-white/10 pt-5"
            >
              <h3 className="text-[#ffed00] text-base font-semibold mb-2">
                {capability.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ErdVisualizer;
