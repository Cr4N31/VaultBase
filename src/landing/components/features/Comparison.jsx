const rows = [
  {
    before:
      "Records scattered across spreadsheets, paper files, and shared drives",
    after: "One encrypted system of record for your entire organization",
  },
  {
    before: "No way to tell who accessed or changed a record, or when",
    after: "Every read, write, and export logged automatically",
  },
  {
    before: "Backups are manual, inconsistent, or don't happen at all",
    after: "Backups and monitoring built in, running by default",
  },
  {
    before: "Compliance is a guess, hoped for rather than proven",
    after: "Built to NDPA 2023 from the ground up",
  },
  {
    before: "No visibility into your data until something goes wrong",
    after: "A live overview of your organization's data, anytime",
  },
];

function Comparison() {
  return (
    <div className="bg-black py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-16" data-aos="fade-up">
          <p className="uppercase tracking-[0.3em] text-xs text-[#ffed00] mb-4">
            The difference
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The old way was never built for this.
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Most organizations aren't dealing with bad intentions, just tools
            that were never designed to hold sensitive records safely.
          </p>
        </div>

        {/* Column headers */}
        <div
          className="grid grid-cols-2 gap-4 md:gap-8 mb-4"
          data-aos="fade-up"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">
            The old way
          </span>
          <span className="text-[#ffed00] text-xs uppercase tracking-[0.2em]">
            The VaultBase way
          </span>
        </div>

        <div className="space-y-4">
          {rows.map((row, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="grid grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-4"
            >
              <div className="flex gap-3">
                <span className="text-white/30 shrink-0">✕</span>
                <p className="text-white/50 text-sm leading-relaxed">
                  {row.before}
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#ffed00] shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  {row.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comparison;
