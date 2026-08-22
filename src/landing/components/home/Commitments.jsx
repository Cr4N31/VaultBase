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

/** Reveals `text` one character at a time once `start` is true. Runs once. */
function useTypewriter(text, start, speed = 20) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [start, text, speed]);

  return { output, done };
}

function CommitmentCard({ id, title, children }) {
  const [ref, inView] = useInViewOnce(0.2);
  const titleTyping = useTypewriter(title, inView, 32);
  const descTyping = useTypewriter(children, titleTyping.done, 9);

  return (
    <motion.div
      ref={ref}
      className="bg-[#0A0A0A] border border-white/10 rounded-lg p-6 flex flex-col min-h-[240px]"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <code className="text-[#ffed00]/60 text-xs font-mono mb-4 block">
        // {String(id).padStart(2, "0")}
      </code>

      <div className="font-mono flex-1">
        <h3 className="text-white text-base font-semibold mb-3 leading-snug min-h-[1.5em]">
          {titleTyping.output}
          {!titleTyping.done && (
            <span className="inline-block w-[2px] h-4 bg-[#ffed00] ml-0.5 align-middle animate-pulse" />
          )}
        </h3>
        <p className="text-white/55 text-xs leading-relaxed">
          {descTyping.output}
          {titleTyping.done && !descTyping.done && (
            <span className="inline-block w-[2px] h-3 bg-[#ffed00] ml-0.5 align-middle animate-pulse" />
          )}
        </p>
      </div>
    </motion.div>
  );
}

function Commitments() {
  const commitments = [
    {
      id: 1,
      header: "Zero Data Access",
      desc: "VaultBase staff will never view or edit client data. This is a technical guarantee, not a policy.",
    },
    {
      id: 2,
      header: "Mission Before Margin",
      desc: "No pricing, hiring, or expansion decision will compromise the accessibility of our service to small institutions.",
    },
    {
      id: 3,
      header: "Local Talent First",
      desc: "Every technical role at client sites will be filled by a trained participant from the VaultBase Youth Programme.",
    },
    {
      id: 4,
      header: "Compliance Always",
      desc: "Every client relationship will be covered by a formal data handling agreement before any data is stored.",
    },
    {
      id: 5,
      header: "Transparency",
      desc: "Clients will always know the status of their data, their uptime, and any incidents affecting their service.",
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
          Commitments We Will Not Break
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commitments.map((c) => (
            <CommitmentCard key={c.id} id={c.id} title={c.header}>
              {c.desc}
            </CommitmentCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Commitments;
