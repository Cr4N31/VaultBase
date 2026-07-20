import { motion } from "framer-motion";
import { LOGO_LETTERS, LOGO_VIEWBOX_WIDTH, LOGO_ASCENT, LOGO_DESCENT } from "../home/logoLetters";

/**
 * Animated "VaultBase" wordmark — draws in stroke-by-stroke using the real
 * Space Grotesk Bold letterforms (extracted glyph outlines, not a font
 * rendered as text), then fills solid gold once each letter's stroke
 * completes. Autoplays once on mount.
 *
 * Swap in a different brand font by re-running the glyph extraction script
 * against a new .ttf and regenerating logoLetters.js — this component
 * doesn't care which font the path data came from.
 */
function LogoAnimated({ className = "w-full max-w-md" }) {
    const height = LOGO_ASCENT - LOGO_DESCENT;

    return (
        <svg
            viewBox={`0 -${LOGO_ASCENT} ${LOGO_VIEWBOX_WIDTH} ${height}`}
            className={className}
        >
            <g transform="scale(1,-1)">
                {LOGO_LETTERS.map((L, i) => (
                    <motion.path
                        key={i}
                        d={L.d}
                        transform={`translate(${L.x},0)`}
                        fill="#ffed00"
                        stroke="#ffed00"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, fillOpacity: 0 }}
                        animate={{ pathLength: 1, fillOpacity: 1 }}
                        transition={{
                            pathLength: { duration: L.duration, delay: L.delay, ease: "easeInOut" },
                            fillOpacity: { duration: 0.3, delay: L.delay + L.duration },
                        }}
                    />
                ))}
            </g>
        </svg>
    );
}

export default LogoAnimated;