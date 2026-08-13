import { motion } from "framer-motion";

// Node positions form a loose, asymmetric mesh — deliberately irregular
// rather than a grid, so it reads as organic data rather than a diagram.
const nodes = [
  { id: "n1", cx: 120, cy: 120, r: 4, filled: false, drift: [4, -6], dur: 7 },
  { id: "n2", cx: 260, cy: 80, r: 3, filled: true, drift: [-5, 5], dur: 8.5 },
  { id: "n3", cx: 380, cy: 140, r: 6, filled: false, drift: [6, 4], dur: 6.5 },
  { id: "n4", cx: 520, cy: 90, r: 3, filled: true, drift: [-4, -5], dur: 9 },
  { id: "n5", cx: 200, cy: 220, r: 4, filled: false, drift: [-5, 5], dur: 8.5 },
  { id: "n6", cx: 440, cy: 260, r: 5, filled: false, drift: [4, -6], dur: 7 },
  { id: "n7", cx: 340, cy: 280, r: 7, filled: false, drift: [6, 4], dur: 6.5 },
  { id: "n8", cx: 540, cy: 320, r: 3, filled: true, drift: [-4, -5], dur: 9 },
  { id: "n9", cx: 300, cy: 400, r: 5, filled: false, drift: [-5, 5], dur: 8.5 },
  { id: "n10", cx: 420, cy: 400, r: 4, filled: false, drift: [4, -6], dur: 7 },
  { id: "n11", cx: 130, cy: 330, r: 3, filled: true, drift: [6, 4], dur: 6.5 },
  { id: "n12", cx: 220, cy: 470, r: 4, filled: false, drift: [-4, -5], dur: 9 },
  { id: "n13", cx: 500, cy: 460, r: 3, filled: true, drift: [-5, 5], dur: 8.5 },
  { id: "n14", cx: 580, cy: 200, r: 3, filled: true, drift: [4, -6], dur: 7 },
];

const edges = [
  ["n1", "n2"],
  ["n1", "n5"],
  ["n2", "n3"],
  ["n3", "n4"],
  ["n3", "n6"],
  ["n5", "n7"],
  ["n7", "n6"],
  ["n7", "n9"],
  ["n6", "n8"],
  ["n6", "n10"],
  ["n9", "n10"],
  ["n9", "n12"],
  ["n10", "n13"],
  ["n5", "n11"],
  ["n11", "n12"],
  ["n4", "n14"],
  ["n14", "n8"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

export default function NetworkVisual({ className = "" }) {
  return (
    <svg
      viewBox="0 0 680 560"
      className={className}
      role="img"
      aria-label="Animated network of encrypted data nodes"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="680" height="560" fill="#000000" />

      <motion.g
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {edges.map(([a, b], i) => {
          const from = byId[a];
          const to = byId[b];
          return (
            <line
              key={i}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="#ffed00"
              strokeWidth="0.5"
            />
          );
        })}
      </motion.g>

      {nodes.map((n) => (
        <motion.circle
          key={n.id}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={n.filled ? "#ffed00" : "#0A0A0A"}
          stroke="#ffed00"
          strokeWidth={n.filled ? 0 : n.r > 5 ? 1.5 : 1}
          animate={{ x: [0, n.drift[0], 0], y: [0, n.drift[1], 0] }}
          transition={{ duration: n.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Encrypted record marker — sits at the densest point of the mesh */}
      <motion.g
        animate={{ x: [0, 6, 0], y: [0, 4, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect
          x="333"
          y="273"
          width="14"
          height="14"
          rx="2"
          fill="#0A0A0A"
          stroke="#ffed00"
          strokeWidth="1"
        />
        <rect
          x="295"
          y="273"
          width="14"
          height="14"
          rx="2"
          fill="none"
          stroke="#ffed00"
          strokeWidth="0.7"
          opacity="0.6"
        />
      </motion.g>
    </svg>
  );
}
