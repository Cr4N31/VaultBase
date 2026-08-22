import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

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

const modes = {
  incidents: {
    tabLabel: "Avoid data loss",
    statLine: "Records protected from loss, every day",
    statValue: "1,204",
    left: {
      label: "Without VaultBase",
      title: "Data at risk",
      rows: [
        ["Unprotected records", "100%"],
        ["Audit trail", "None"],
      ],
    },
    right: {
      label: "With VaultBase",
      title: "VaultBase active",
      rows: [
        ["Encryption", "AES-256"],
        ["Audit trail", "Full"],
      ],
    },
  },
  productivity: {
    tabLabel: "Save staff time",
    statLine: "Staff hours recovered, every month",
    statValue: "42",
    left: {
      label: "Without VaultBase",
      title: "Manual search",
      rows: [
        ["Avg. time to find a record", "~14 min"],
        ["Duplicate entries", "Common"],
      ],
    },
    right: {
      label: "With VaultBase",
      title: "Instant search",
      rows: [
        ["Avg. time to find a record", "<2 sec"],
        ["Duplicate entries", "Prevented"],
      ],
    },
  },
};

const WITHOUT_LINE =
  "M20,255 L50,235 L80,250 L110,210 L140,245 L170,225 L195,70 L220,235 L250,190 L280,245 L310,205 L340,250 L365,225 L385,255";
const WITHOUT_FILL = `${WITHOUT_LINE} L385,280 L20,280 Z`;

const WITH_LINE =
  "M415,175 L440,165 L465,170 L490,95 L515,150 L545,140 L570,145 L595,105 L620,130 L650,120 L675,110 L705,125 L730,115 L760,120 L780,115";
const WITH_FILL = `${WITH_LINE} L780,280 L415,280 Z`;

function ImpactComparison() {
  const [mode, setMode] = useState("incidents");
  const [ref, inView] = useInViewOnce(0.2);
  const active = modes[mode];

  return (
    <div className="bg-black py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-[#ffed00] mb-4">
            Why it matters
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            <span className="text-white">Perfectly stored data. </span>
            <span className="text-white/50">
              Never lose a record. Never waste an hour looking for one.
            </span>
          </h2>
        </div>

        <div className="inline-flex border border-white/10 rounded-lg overflow-hidden mb-10">
          {Object.entries(modes).map(([key, m]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`px-5 py-2.5 text-sm font-medium transition ${
                mode === key
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {m.tabLabel}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          className="relative border border-white/10 rounded-lg bg-[#0A0A0A] overflow-hidden"
        >
          <svg viewBox="0 0 800 300" className="w-full h-auto block">
            <defs>
              <pattern
                id="dotsRed"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.8" fill="#ff6b5b" opacity="0.35" />
              </pattern>
              <pattern
                id="dotsGold"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.8" fill="#ffed00" opacity="0.35" />
              </pattern>
            </defs>

            <line
              x1="20"
              y1="280"
              x2="780"
              y2="280"
              stroke="#ffffff"
              strokeOpacity="0.1"
            />

            <line
              x1="400"
              y1="40"
              x2="400"
              y2="280"
              stroke="#ffffff"
              strokeOpacity="0.15"
            />

            <text
              x="20"
              y="28"
              fill="#ffffff"
              fillOpacity="0.4"
              fontSize="11"
              letterSpacing="0.15em"
              className="uppercase"
            >
              Without VaultBase
            </text>
            <text
              x="415"
              y="28"
              fill="#ffed00"
              fillOpacity="0.9"
              fontSize="11"
              letterSpacing="0.15em"
              className="uppercase"
            >
              With VaultBase
            </text>

            <motion.path
              d={WITHOUT_FILL}
              fill="url(#dotsRed)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.path
              d={WITHOUT_LINE}
              fill="none"
              stroke="#ff6b5b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
            />

            <motion.path
              d={WITH_FILL}
              fill="url(#dotsGold)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
            <motion.path
              d={WITH_LINE}
              fill="none"
              stroke="#ffed00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 1 }}
            />
          </svg>

          <motion.div
            className="absolute bg-black/90 border border-white/10 rounded-md px-3 py-2.5 w-44 font-mono"
            style={{ left: "20%", top: "10%" }}
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 1.5 }}
          >
            <p className="text-[#ff6b5b] text-[10px] font-semibold mb-1.5">
              ⚠ {active.left.title}
            </p>
            {active.left.rows.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between text-[10px] text-white/50"
              >
                <span>{label}</span>
                <span className="text-white/70">{value}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="absolute bg-black/90 border border-white/10 rounded-md px-3 py-2.5 w-44 font-mono"
            style={{ left: "68%", top: "22%" }}
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 2.1 }}
          >
            <p className="text-[#ffed00] text-[10px] font-semibold mb-1.5">
              ✓ {active.right.title}
            </p>
            {active.right.rows.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between text-[10px] text-white/50"
              >
                <span>{label}</span>
                <span className="text-white/70">{value}</span>
              </div>
            ))}
          </motion.div>

          <div className="border-t border-white/10 px-6 py-4">
            <p className="font-mono text-xs md:text-sm text-white/60 uppercase tracking-wide">
              <span className="text-[#ffed00] font-semibold">
                {active.statValue}
              </span>{" "}
              {active.statLine}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mt-6">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#ffed00]" />
              <span className="text-white/50 text-xs">VaultBase encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#ff6b5b]" />
              <span className="text-white/50 text-xs">
                Manual record-keeping
              </span>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-md">
            By encrypting and indexing every record automatically, VaultBase
            removes the manual busywork that leads to lost files, duplicate
            entries, and hours spent searching for something that should take
            seconds.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImpactComparison;
