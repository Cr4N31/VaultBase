const paths = [
  {
    label: "Individual",
    tagline: "For managing your own data, on your own.",
    sidebar: ["Overview", "Upload data", "Settings"],
    highlights: [
      "DB health & uptime monitoring",
      "ERD visualiser of your uploaded data",
      "Search with filters, built from your own columns",
      "Sub-tables: attach extra data to any single row",
    ],
  },
  {
    label: "Enterprise",
    tagline:
      "Everything Individual offers, run across every organization you manage.",
    sidebar: ["Overview", "Register organization", "Settings"],
    highlights: [
      "Overview of every organization you've registered",
      "Per-organization DB health, uptime & encryption status",
      "Per-organization ERD visualiser & search with filters",
      "DB view: see the actual data, spreadsheet-style",
      "Sub-tables, available inside every organization",
    ],
  },
];

function PathSplit() {
  return (
    <div className="bg-black py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-16" data-aos="-up">
          <p className="uppercase tracking-[0.3em] text-xs text-[#ffed00] mb-4">
            The branch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Two ways to use VaultBase. One choice decides which.
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            You're not stuck configuring a generic dashboard. Pick your path and
            the interface, pricing, and tools that follow are built for it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path, index) => (
            <div
              key={path.label}
              className="border border-white/10 hover:border-[#ffed00]/30 transition-all duration-500 rounded-lg p-8"
            >
              <h3 className="text-white text-xl font-bold mb-2">
                {path.label}
              </h3>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                {path.tagline}
              </p>

              <p className="uppercase tracking-[0.2em] text-[11px] text-[#ffed00]/70 mb-3">
                Side panel
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {path.sidebar.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-white/70 border border-white/10 rounded-full px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="uppercase tracking-[0.2em] text-[11px] text-[#ffed00]/70 mb-3">
                What's inside
              </p>
              <ul className="space-y-2">
                {path.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 text-sm text-white/70 leading-relaxed"
                  >
                    <span className="text-[#ffed00] shrink-0">→</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PathSplit;
