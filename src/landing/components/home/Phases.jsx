import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    NIGERIA_PATH,
    NIGERIA_VIEWBOX,
    AFRICA_OUTLINE_PATH,
    AFRICA_VIEWBOX,
    WEST_AFRICA_COUNTRY_PATHS,
} from "./mapPaths";

const MAP_DRAW_DURATION = 1.4; // seconds, how long the map/tree draws itself in
const MAP_START_DELAY = 0.35;  // seconds after phase enters view before drawing starts
const PARAGRAPH_DELAY = MAP_START_DELAY + MAP_DRAW_DURATION + 0.25;

/** Fires once when the element enters the viewport, then stops observing. */
function useInViewOnce(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView];
}


/* Map / diagram components — each takes `inView` and draws itself */

function NigeriaMap({ inView }) {
    return (
        <svg viewBox={NIGERIA_VIEWBOX} className="w-full h-auto">
            <motion.path
                d={NIGERIA_PATH}
                fill="none"
                stroke="#ffed00"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0}}
                transition={{ duration: MAP_DRAW_DURATION, ease: "easeInOut", delay: MAP_START_DELAY }}
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
                stroke="#ffed00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0}}
                transition={{ duration: MAP_DRAW_DURATION, ease: "easeInOut", delay: MAP_START_DELAY }}
            />
            {WEST_AFRICA_COUNTRY_PATHS.map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    fill="#ffed00"
                    stroke="#ffed00"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 0.85 } : {}}
                    transition={{
                        duration: 0.5,
                        delay: MAP_START_DELAY + MAP_DRAW_DURATION * 0.6,
                    }}
                />
            ))}
        </svg>
    );
}

/* Simple gold line-icons, matching the map stroke aesthetic */
function HealthcareIcon({ x, y }) {
    return (
        <g transform={`translate(${x},${y})`}>
            <circle cx="0" cy="0" r="26" fill="none" stroke="#ffed00" strokeWidth="1.5" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffed00" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffed00" strokeWidth="2.5" strokeLinecap="round" />
        </g>
    );
}

function EducationIcon({ x, y }) {
    return (
        <g transform={`translate(${x},${y})`}>
            <circle cx="0" cy="0" r="26" fill="none" stroke="#ffed00" strokeWidth="1.5" />
            <polygon points="-14,-4 0,-11 14,-4 0,3 -14,-4" fill="none" stroke="#ffed00" strokeWidth="1.8" strokeLinejoin="round" />
            <line x1="12" y1="-2" x2="12" y2="8" stroke="#ffed00" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M-7,0 L-7,7 Q0,12 7,7 L7,0" fill="none" stroke="#ffed00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    );
}

function GovernmentIcon({ x, y }) {
    return (
        <g transform={`translate(${x},${y})`}>
            <circle cx="0" cy="0" r="26" fill="none" stroke="#ffed00" strokeWidth="1.5" />
            <polygon points="0,-13 13,-4 -13,-4" fill="none" stroke="#ffed00" strokeWidth="1.6" strokeLinejoin="round" />
            <line x1="-10" y1="-3" x2="-10" y2="10" stroke="#ffed00" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="-3" y1="-3" x2="-3" y2="10" stroke="#ffed00" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="3" y1="-3" x2="3" y2="10" stroke="#ffed00" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="10" y1="-3" x2="10" y2="10" stroke="#ffed00" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="-14" y1="11" x2="14" y2="11" stroke="#ffed00" strokeWidth="1.8" strokeLinecap="round" />
        </g>
    );
}

function VaultTree({ inView }) {
    // hub in the lower-center, three branches fan upward to sector icons
    const hub = { x: 200, y: 230 };
    const nodes = [
        { x: 60, y: 70, Icon: EducationIcon, label: "Education" },
        { x: 200, y: 40, Icon: HealthcareIcon, label: "Healthcare" },
        { x: 340, y: 70, Icon: GovernmentIcon, label: "Government" },
    ];

    return (
        <svg viewBox="0 0 400 300" className="w-full h-auto">
            {nodes.map((n, i) => (
                <motion.line
                    key={i}
                    x1={hub.x}
                    y1={hub.y}
                    x2={n.x}
                    y2={n.y}
                    stroke="#ffed00"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {pathlength: 0, opacity: 0}}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        delay: MAP_START_DELAY + i * 0.2,
                    }}
                />
            ))}

            {/* arrowheads */}
            {nodes.map((n, i) => {
                const angle = Math.atan2(n.y - hub.y, n.x - hub.x);
                const ax = n.x - Math.cos(angle) * 30;
                const ay = n.y - Math.sin(angle) * 30;
                return (
                    <motion.polygon
                        key={`arrow-${i}`}
                        points="-5,-4 5,0 -5,4"
                        transform={`translate(${ax},${ay}) rotate(${(angle * 180) / Math.PI})`}
                        fill="#ffed00"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.3, delay: MAP_START_DELAY + i * 0.2 + 0.7 }}
                    />
                );
            })}

            {nodes.map((n, i) => (
                <motion.g
                    key={`node-${i}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: MAP_START_DELAY + i * 0.2 + 0.85 }}
                >
                    <n.Icon x={n.x} y={n.y} />
                    <text
                        x={n.x}
                        y={n.y + 44}
                        textAnchor="middle"
                        fill="#ffed00"
                        fontSize="11"
                        letterSpacing="0.05em"
                        className="uppercase"
                    >
                        {n.label}
                    </text>
                </motion.g>
            ))}

            <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: MAP_START_DELAY }}
            >
                <circle cx={hub.x} cy={hub.y} r="34" fill="black" stroke="#ffed00" strokeWidth="2" />
                <text x={hub.x} y={hub.y + 4} textAnchor="middle" fill="#ffed00" fontSize="12" fontWeight="bold">
                    Vault
                </text>
                <text x={hub.x} y={hub.y + 17} textAnchor="middle" fill="#ffed00" fontSize="12" fontWeight="bold">
                    Base
                </text>
            </motion.g>
        </svg>
    );
}


/* Phase block: heading -> map draws -> paragraph*/


function PhaseBlock({ label, title, MapComponent, children }) {
    const [ref, inView] = useInViewOnce(0.15);

    return (
        <div ref={ref} className="max-w-2xl mx-auto text-center py-20">
            <motion.p
                className="text-[#ffed00] text-xs uppercase tracking-[0.35em] mb-3"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {label}
            </motion.p>

            <motion.h2
                className="text-white text-3xl md:text-4xl font-bold mb-12"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
                {title}
            </motion.h2>

            <div className="max-w-sm mx-auto mb-12">
                <MapComponent inView={inView} />
            </div>

            <motion.p
                className="text-white/60 text-sm md:text-base leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: PARAGRAPH_DELAY }}
            >
                {children}
            </motion.p>
        </div>
    );
}

/* Main section*/

function Phases() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });
    const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={sectionRef} className="relative bg-black py-24 px-8">
            <motion.h1
                className="text-white text-4xl md:text-6xl font-bold text-center max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                Our Vision? Where This Goes <span className="text-[#ffed00]">&rarr;</span>
            </motion.h1>

            {/* scroll-linked spine connecting all three phases */}
            <div className="absolute left-1/2 top-48 bottom-24 w-px -translate-x-1/2">
                <motion.div
                    className="w-full bg-[#ffed00] shadow-[0_0_10px_#ffed00]"
                    style={{ height: spineHeight }}
                />
            </div>

            <div className="relative mt-[600px]">
                <div className="bg-black">
                    <PhaseBlock
                        label="Phase 1 — Years 1–2"
                        title="Nigeria"
                        MapComponent={NigeriaMap}
                    >
                        Establish <span className="text-[#ffed00]">VaultBase </span>as a trusted infrastructure provider for
                        schools and SMEs in Nigeria. Build the core platform, onboard
                        the first cohort of youth programme participants, and
                        demonstrate proof of concept with a minimum of 20 client
                        organizations.
                    </PhaseBlock>
                </div>

            <div className="bg-black mt-[500px]">
                <PhaseBlock
                    label="Phase 2 — Years 3–5"
                    title="West Africa"
                    MapComponent={WestAfricaMap}
                >
                    Expand operations to <span className="text-[#ffed00]">Ghana, Togo, Senegal, and other West
                    African</span> markets. Adapt the platform for multilingual
                    environments and region-specific compliance requirements.
                    Scale the <span className="text-[#ffed00]">talent pipeline to produce hundreds of employed
                    junior developers across the region</span>.
                </PhaseBlock>
            </div>
                
            <div className="bg-black mt-[500px]">
                <PhaseBlock
                    label="Phase 3 — Years 5+"
                    title="Sector Specialization"
                    MapComponent={VaultTree}
                >
                    Develop sector-specific database templates and tooling for
                    <span className="text-[#ffed00]"> healthcare, education, and government</span>. Position <span className="text-[#ffed00]">VaultBase</span>  as
                    the default infrastructure layer for public-sector
                    digitization efforts across West Africa — not as a
                    government contractor, but as a trusted private partner with
                    a proven track record.
                </PhaseBlock>
            </div>
                
            </div>
            <div className="bg-black z-[100] relative">
                <motion.div 
                    className="max-w-2xl bg-black mx-auto text-center py-20 px-5 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
                        The Metric That Matters Most
                    </h2>
        
                    <div className="flex flex-col gap-3 max-w-xl mx-auto text-left">
                        <p className="text-white/60 text-sm md:text-base leading-relaxed">
                            We measure success not primarily in revenue, but in two numbers:
                        </p>
        
                        <div className="flex gap-2">
                            <span className="text-[#ffed00]">—</span>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                <span className="text-[#ffed00]">How many organizations have stopped losing data</span>, and
                            </p>
                        </div>
        
                        <div className="flex gap-2">
                            <span className="text-[#ffed00]">—</span>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                <span className="text-[#ffed00]">How many young people have found meaningful technical employment</span>
                            </p>
                        </div>
        
                        <p className="text-white/60 text-sm md:text-base leading-relaxed">
                            because of what we built.
                        </p>
                    </div>
                </motion.div>
            </div>
            
        </section>
    );
}

export default Phases;