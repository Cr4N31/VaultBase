import { useEffect, useRef, useState } from "react";
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

const capabilities = [
  {
    title: "Live schema visualisation",
    description:
      "See how your organization's records and related tables connect.",
  },
  {
    title: "Encryption & audit visibility",
    description:
      "Understand which data is protected and how activity is tracked.",
  },
  {
    title: "Backups & monitoring",
    description:
      "Keep an eye on database health, uptime, and backup status.",
  },
];

function SchemaField({ name, type, kind }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-black/10 px-4 py-2.5 font-mono text-xs">
      <span className="flex min-w-0 items-center gap-2 text-black/80">
        {kind && (
          <span className="w-8 shrink-0 text-[9px] font-semibold tracking-wide text-[#5b6c57]">
            {kind}
          </span>
        )}
        <span className="truncate">{name}</span>
      </span>
      <span className="shrink-0 text-[10px] text-black/45">{type}</span>
    </div>
  );
}

function EntityCard({ name, description, fields, className = "", children }) {
  return (
    <article
      className={`overflow-hidden rounded-md border border-[#5b6c57]/30 bg-[#f5f2eb] ${className}`}
    >
      <header className="flex items-start justify-between gap-3 bg-[#5b6c57]/[0.07] px-4 py-3">
        <div>
          <h3 className="font-mono text-sm font-semibold text-[#5b6c57]">
            {name}
          </h3>
          {description && (
            <p className="mt-1 text-[11px] leading-relaxed text-black/50">
              {description}
            </p>
          )}
        </div>
        <span className="shrink-0 rounded border border-[#5b6c57]/25 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[#5b6c57]">
          table
        </span>
      </header>
      <div>
        {fields.map((field) => (
          <SchemaField key={field.name} {...field} />
        ))}
      </div>
      {children}
    </article>
  );
}

function Relationship({ children }) {
  return (
    <div className="flex items-center gap-3 py-3 font-mono text-[10px] uppercase tracking-wider text-[#5b6c57] sm:text-xs">
      <span className="h-px flex-1 bg-[#5b6c57]/30" />
      <span className="text-center">{children}</span>
      <span className="h-px flex-1 bg-[#5b6c57]/30" />
    </div>
  );
}

function SchemaDiagram() {
  const [ref, inView] = useInViewOnce(0.15);

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden rounded-lg border border-[#5b6c57]/25 bg-[#f5f2eb] shadow-[0_16px_50px_rgba(45,58,42,0.08)]"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#5b6c57]/20 bg-[#5b6c57]/[0.06] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#5b6c57]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5b6c57] sm:text-xs">
            VaultBase / storage model
          </span>
        </div>
        <span className="font-mono text-[10px] text-black/45">
          CONCEPTUAL SCHEMA
        </span>
      </div>

      <div className="p-4 sm:p-7 md:p-10">
        <div className="mx-auto max-w-xl">
          <div className="mb-2 flex items-center justify-between rounded-md border border-[#5b6c57]/20 px-4 py-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
                Workspace boundary
              </p>
              <p className="mt-1 text-sm font-semibold text-black">
                Individual account or enterprise workspace
              </p>
            </div>
            <span className="rounded-full border border-[#5b6c57]/25 px-2.5 py-1 font-mono text-[9px] uppercase text-[#5b6c57]">
              scoped access
            </span>
          </div>
          <div className="mx-auto h-5 w-px bg-[#5b6c57]/40" />
          <EntityCard
            name="organizations"
            description="Enterprise workspace organization boundary"
            fields={[
              { name: "id", type: "uuid", kind: "PK" },
              { name: "organization data", type: "managed per organization" },
            ]}
          />
        </div>

        <Relationship>
          one organization <span aria-hidden="true">→</span> many records
        </Relationship>

        <div className="grid gap-5 md:grid-cols-2 md:gap-8">
          <div>
            <EntityCard
              name="records"
              description="Organization-owned records; uploaded columns can vary by use case"
              fields={[
                { name: "id", type: "uuid", kind: "PK" },
                { name: "org_id", type: "uuid", kind: "FK" },
                {
                  name: "record payload",
                  type: "encrypted data",
                  kind: "LOCK",
                },
              ]}
            >
              <div className="px-3 pb-3 pt-2">
                <Relationship>one record → zero or more sub-tables</Relationship>
                <EntityCard
                  name="sub_tables"
                  description="Optional additional data attached to a record"
                  fields={[
                    { name: "record_id", type: "uuid", kind: "FK" },
                    { name: "custom columns", type: "record-specific data" },
                  ]}
                />
              </div>
            </EntityCard>
          </div>

          <div className="flex flex-col">
            <div className="mb-3 flex-1">
              <EntityCard
                name="audit_log"
                description="Activity trail for record access and changes"
                fields={[
                  { name: "id", type: "uuid", kind: "PK" },
                  { name: "org_id", type: "uuid", kind: "FK" },
                  { name: "actor", type: "account or service" },
                  { name: "action", type: "read / write / export" },
                  { name: "target", type: "record reference" },
                  { name: "occurred_at", type: "timestamp" },
                ]}
              />
            </div>
            <div className="rounded-md border border-dashed border-[#5b6c57]/35 px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#5b6c57]">
                Platform operations
              </p>
              <p className="mt-1 text-xs leading-relaxed text-black/55">
                Backups, uptime monitoring, and encryption status are tracked
                alongside the organization&apos;s data.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] leading-relaxed text-black/45 sm:text-xs">
          Illustrative relationships based on VaultBase&apos;s described product
          model; exact implementation fields may vary.
        </p>
      </div>
    </motion.div>
  );
}

function ErdVisualizer() {
  return (
    <section className="relative overflow-hidden bg-[#f5f2eb] px-5 py-16 sm:px-8 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl md:mb-14" data-aos="fade-in">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#5b6c57]">
            Inside the data model
          </p>
          <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl">
            A clear structure for every organization&apos;s data.
          </h2>
          <p className="text-base leading-relaxed text-black/60">
            VaultBase keeps organization data scoped, supports flexible records
            and row-level sub-tables, and tracks activity with an audit trail.
            Sensitive record payloads are encrypted.
          </p>
        </div>

        <div className="mb-14" data-aos="fade-in">
          <SchemaDiagram />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="border-t border-[#5b6c57]/25 pt-5"
            >
              <h3 className="mb-2 text-base font-semibold text-[#5b6c57]">
                {capability.title}
              </h3>
              <p className="text-sm leading-relaxed text-black/70">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ErdVisualizer;
