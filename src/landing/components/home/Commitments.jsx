import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

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

function CommitmentBlock({ id, title, children }) {
    const [ref, inView] = useInViewOnce(0.15);

    return (
        <motion.div
            ref={ref}
            className="flex gap-6 md:gap-10 py-8 border-t border-white/10"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <span className="text-[#ffed00] text-sm font-mono pt-1 shrink-0">
                {String(id).padStart(2, "0")}
            </span>

            <div>
                <h3 className="text-[#ffed00] text-xl md:text-2xl font-bold mb-2">
                    {title}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
                    {children}
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
            desc: `Vaultbase staff will never view or edit client data. 
                This is a technical guarantee, not a policy.`,
        },
        {
            id: 2,
            header: "Mission Before Margin",
            desc: `No pricing, hiring or expansion decision will compromise the accesibility of our service to small institutions.`,
        },
        {
            id: 3,
            header: "Local Talent First",
            desc: `Every technical role at client sites will be filled by a trained particpant from Vaultbase Youth Programme.`,
        },
        {
            id: 4,
            header: "Compliance Always",
            desc: `Every client relationship will be covered by a formal data handling agreement before any data is stored.`,
        },
        {
            id: 5,
            header: "Transparency",
            desc: `Clients will always know the status of their data, their uptime, and any incidnets affecting their service.`,
        },
    ];

    return (
        <section className="bg-black text-white py-24 px-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
                    Commitments We Will Not Break
                </h2>

                <div className="border-b border-white/10">
                    {commitments.map((c) => (
                        <CommitmentBlock key={c.id} id={c.id} title={c.header}>
                            {c.desc}
                        </CommitmentBlock>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Commitments;