import video from "/videos/erdvideo.mp4";
const tables = [
  {
    name: "organizations",
    rows: [
      { field: "id", type: "uuid" },
      { field: "name", type: "text" },
      { field: "sector", type: "text" },
    ],
  },
  {
    name: "records",
    rows: [
      { field: "id", type: "uuid" },
      { field: "org_id", type: "fk" },
      { field: "data", type: "encrypted", locked: true },
    ],
  },
  {
    name: "audit_log",
    rows: [
      { field: "id", type: "uuid" },
      { field: "actor", type: "text" },
      { field: "action", type: "text" },
    ],
  },
];

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

function TableCard({ table }) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-lg w-full md:w-56 shrink-0">
      <div className="border-b border-white/10 px-4 py-3">
        <span className="text-white text-sm font-semibold">{table.name}</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        {table.rows.map((row) => (
          <div
            key={row.field}
            className="flex items-center justify-between text-xs"
          >
            <span className={row.locked ? "text-[#ffed00]" : "text-white/70"}>
              {row.field}
            </span>
            <span className="text-white/30">{row.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErdVisualizer() {
  return (
    <div className="relative bg-black py-24 px-8 overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Dark overlay so text stays readable over the video */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content sits above the video + overlay */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16" data-aos="fade-up">
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

        {/* Mock schema diagram */}
        <div
          className="flex flex-col md:flex-row items-center gap-6 md:gap-0 mb-20"
          data-aos="fade-up"
        >
          <TableCard table={tables[0]} />
          <div className="hidden md:block flex-1 border-t border-dashed border-[#ffed00]/30 mx-2" />
          <div className="md:hidden h-6 border-l border-dashed border-[#ffed00]/30" />
          <TableCard table={tables[1]} />
          <div className="hidden md:block flex-1 border-t border-dashed border-[#ffed00]/30 mx-2" />
          <div className="md:hidden h-6 border-l border-dashed border-[#ffed00]/30" />
          <TableCard table={tables[2]} />
        </div>

        {/* Capability highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={capability.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
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
