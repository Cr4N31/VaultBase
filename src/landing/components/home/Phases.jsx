import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  NIGERIA_PATH,
  NIGERIA_VIEWBOX,
  AFRICA_OUTLINE_PATH,
  AFRICA_VIEWBOX,
  WEST_AFRICA_COUNTRY_PATHS,
} from "./mapPaths";

/* ------------------------------------------------------------------ */
/* Constants + shared motion                                           */
/* ------------------------------------------------------------------ */

const INK = "#5b6c57";
const MAP_DRAW_DURATION = 1;
const MAP_START_DELAY = 0.3;

// Line only shows from the md breakpoint up (rows are stacked below it).
const LINE_MIN_WIDTH = 768;
// How far the line sits outside the text column, in px.
const LINE_GUTTER = 28;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

/** Fires once when the element enters the viewport, then stops observing. */
function useInViewOnce(threshold = 0.2) {
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

/** Position of an element inside a container, ignoring CSS transforms. */
function offsetWithin(el, container) {
  let x = 0;
  let y = 0;
  let node = el;
  while (node && node !== container) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return { x, y, width: el.offsetWidth, height: el.offsetHeight };
}

/* ------------------------------------------------------------------ */
/* Visuals (neutral line art)                                          */
/* ------------------------------------------------------------------ */

function NigeriaMap({ inView }) {
  return (
    <svg viewBox={NIGERIA_VIEWBOX} className="h-auto w-full">
      <motion.path
        d={NIGERIA_PATH}
        fill="none"
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
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
    <svg viewBox={AFRICA_VIEWBOX} className="h-auto w-full">
      <motion.path
        d={AFRICA_OUTLINE_PATH}
        fill="none"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
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
          fill={INK}
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{
            duration: 0.5,
            delay: MAP_START_DELAY + MAP_DRAW_DURATION * 0.6,
          }}
        />
      ))}
    </svg>
  );
}

/** Hub diagram: VaultBase in the center, three sectors branching out. */
function VaultTree({ inView }) {
  const hub = { x: 200, y: 230 };
  const hubRadius = 22;
  const nodeRadius = 8;

  const nodes = [
    { x: 70, y: 100, label: "Education" },
    { x: 200, y: 65, label: "Healthcare" },
    { x: 330, y: 100, label: "Government" },
  ];

  // Point along the hub to node line, offset from either end.
  const pointOnLine = (node, fromHub) => {
    const dx = node.x - hub.x;
    const dy = node.y - hub.y;
    const dist = Math.hypot(dx, dy);
    const ratio = fromHub
      ? (hubRadius + 4) / dist
      : (dist - nodeRadius - 4) / dist;
    return { x: hub.x + dx * ratio, y: hub.y + dy * ratio };
  };

  return (
    <svg viewBox="0 0 400 280" className="h-auto w-full">
      {nodes.map((n, i) => {
        const start = pointOnLine(n, true);
        const end = pointOnLine(n, false);
        return (
          <motion.line
            key={`line-${n.label}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={INK}
            strokeWidth="1"
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

      {nodes.map((n, i) => (
        <motion.g
          key={`node-${n.label}`}
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
            fill={INK}
            stroke={INK}
            strokeWidth="1.5"
          />
          <text
            x={n.x}
            y={n.y + nodeRadius + 18}
            textAnchor="middle"
            fill={INK}
            fontSize="10"
            letterSpacing="0.1em"
            className="uppercase"
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: MAP_START_DELAY }}
      >
        <text
          x={hub.x}
          y={hub.y + 4}
          textAnchor="middle"
          fill={INK}
          fontSize="20"
          fontWeight="600"
        >
          VaultBase
        </text>
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll line                                                         */
/* ------------------------------------------------------------------ */

/** Builds a smooth S-curve through every point, top to bottom. */
function buildPath(points) {
  return points.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const mid = (p.y - prev.y) / 2;
    return `${d} C ${prev.x} ${prev.y + mid}, ${p.x} ${p.y - mid}, ${p.x} ${p.y}`;
  }, "");
}

function Waypoint({ point, threshold, progress, reduceMotion }) {
  const fill = useTransform(
    progress,
    [Math.max(0, threshold - 0.04), threshold],
    [0, 1],
  );

  return (
    <g>
      <circle
        cx={point.x}
        cy={point.y}
        r="7"
        fill="#f5f2eb"
        stroke={INK}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <motion.circle
        cx={point.x}
        cy={point.y}
        r="4"
        fill={INK}
        style={{ opacity: reduceMotion ? 1 : fill }}
      />
    </g>
  );
}

function ScrollLineDrawing({ layout, progress }) {
  const reduceMotion = useReducedMotion();
  const { width, height, points } = layout;

  const first = points[0].y;
  const last = points[points.length - 1].y;
  const span = Math.max(last - first, 1);

  // Container scroll progress -> 0..1 along the line, so the line finishes
  // drawing exactly when the scroll marker reaches the last phase.
  const drawn = useTransform(progress, [first / height, last / height], [0, 1]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute left-0 top-0 z-0 hidden overflow-visible md:block"
      aria-hidden="true"
    >
      {/* faint track so the route is readable before it is drawn */}
      <path
        d={buildPath(points)}
        fill="none"
        stroke="#000"
        strokeOpacity="0.08"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <motion.path
        d={buildPath(points)}
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: reduceMotion ? 1 : drawn }}
      />
      {points.map((p, i) => (
        <Waypoint
          key={i}
          point={p}
          threshold={(p.y - first) / span}
          progress={drawn}
          reduceMotion={reduceMotion}
        />
      ))}
    </svg>
  );
}

function ScrollLine({ containerRef, nodeRefs, progress }) {
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      if (container.offsetWidth < LINE_MIN_WIDTH) {
        setLayout(null);
        return;
      }

      const points = nodeRefs.current.filter(Boolean).map((el) => {
        const box = offsetWithin(el, container);
        const isRight = el.dataset.anchor === "right";
        return {
          // Inner edge of the column, pushed out into the gutter.
          x: isRight ? box.x - LINE_GUTTER : box.x + box.width + LINE_GUTTER,
          y: box.y + box.height / 2,
        };
      });

      if (points.length < 2) {
        setLayout(null);
        return;
      }

      setLayout({
        width: container.offsetWidth,
        height: container.offsetHeight,
        points,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, nodeRefs]);

  if (!layout) return null;

  // Remount on any size change so the scroll ranges are rebuilt cleanly.
  return (
    <ScrollLineDrawing
      key={`${layout.width}-${layout.height}`}
      layout={layout}
      progress={progress}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const phases = [
  {
    label: "Phase 1, Years 1-2",
    title: "Nigeria",
    Visual: NigeriaMap,
    description: (
      <>
        Establish <span className="font-medium text-black">VaultBase</span> as a
        trusted infrastructure provider for schools and SMEs in Nigeria. Build
        the core platform, onboard the first cohort of youth programme
        participants, and prove the concept with a minimum of 20 client
        organizations.
      </>
    ),
  },
  {
    label: "Phase 2, Years 3-5",
    title: "West Africa",
    Visual: WestAfricaMap,
    description: (
      <>
        Expand into{" "}
        <span className="font-medium text-black">
          Ghana, Togo, Senegal, and other West African
        </span>{" "}
        markets. Adapt the platform for multilingual environments and
        region-specific compliance requirements, and scale the talent pipeline
        to produce hundreds of employed junior developers across the region.
      </>
    ),
  },
  {
    label: "Phase 3, Years 5+",
    title: "Sector Specialization",
    Visual: VaultTree,
    description: (
      <>
        Develop sector-specific database templates for{" "}
        <span className="font-medium text-black">
          healthcare, education, and government
        </span>
        . Position VaultBase as the default infrastructure layer for
        public-sector digitization across West Africa. Not as a government
        contractor, but as a trusted private partner with a proven track record.
      </>
    ),
  },
];

const metrics = [
  "How many organizations have stopped losing data",
  "How many young people have found meaningful technical employment",
];

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */

function PhaseRow({ phase, index, titleRef }) {
  const reduceMotion = useReducedMotion();
  const [visualRef, visualInView] = useInViewOnce(0.2);

  const isRight = index % 2 === 1;
  const anchor = isRight ? "right" : "left";
  const number = String(index + 1).padStart(2, "0");
  const { Visual } = phase;

  return (
    <div className="relative z-10 flex min-w-0 py-16 md:py-24">
      <div
        className={`w-full min-w-0 md:w-[48%] ${isRight ? "md:ml-auto" : ""}`}
      >
        {/* Text sits above the visual */}
        <motion.div
          className="mb-8 md:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0}
        >
          <p className="mb-3 text-xs tracking-[0.3em] text-black/40">
            {number}
          </p>

          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#5b6c57]">
            {phase.label}
          </p>

          <h3 ref={titleRef} data-anchor={anchor} className="mb-4">
            <span className="text-[clamp(2rem,9vw,2.5rem)] font-[700] leading-[0.95] tracking-tight text-black md:text-[clamp(2.4rem,4vw,3rem)]">
              {phase.title}
            </span>
          </h3>

          <p className="max-w-md text-base leading-relaxed text-black/55 md:text-lg">
            {phase.description}
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div
          ref={visualRef}
          className="min-w-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.15}
        >
          <motion.div
            className="mx-auto w-full max-w-[420px] md:mx-0 md:max-w-[500px]"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            transition={{
              type: "tween",
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Visual inView={visualInView} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

function Phases() {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);

  // 0 when the top of the rows hits 60% of the viewport, 1 when the bottom
  // does. The drawn end of the line follows that 60% mark as you scroll.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"],
  });

  return (
    <section className="overflow-x-hidden bg-[#f5f2eb] px-8 py-6 text-black md:py-12">
      <motion.div
        className="mb-4 flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
      >
        <p>
          <span className="text-xl">Our Vision</span>
        </p>

        <h2>
          <span className="text-[clamp(2.9rem,9vw,5rem)] font-[400] leading-[0.95] tracking-[-0.05em] md:text-[clamp(3rem,5vw,5rem)]">
            Where this goes.
          </span>
        </h2>
      </motion.div>

      <div ref={containerRef} className="relative min-w-0">
        <ScrollLine
          containerRef={containerRef}
          nodeRefs={nodeRefs}
          progress={scrollYProgress}
        />

        <div className="divide-y divide-black/10">
          {phases.map((phase, index) => (
            <PhaseRow
              key={phase.title}
              phase={phase}
              index={index}
              titleRef={(el) => {
                nodeRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* Closing metric */}
      <motion.div
        className="mx-auto max-w-2xl px-5 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <h2 className="mb-8 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          The Metric That Matters Most
        </h2>

        <div className="mx-auto flex max-w-xl flex-col gap-3 text-left">
          <p className="text-sm leading-relaxed text-black/60 md:text-base">
            We measure success not primarily in revenue, but in two numbers:
          </p>

          {metrics.map((metric, i) => (
            <div key={metric} className="flex gap-2">
              <span className="text-black/30">-</span>
              <p className="text-sm leading-relaxed text-black/60 md:text-base">
                <span className="font-medium text-[#5b6c57]">{metric}</span>
                {i < metrics.length - 1 ? ", and" : ""}
              </p>
            </div>
          ))}

          <p className="text-sm leading-relaxed text-black/60 md:text-base">
            because of what we built.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Phases;
