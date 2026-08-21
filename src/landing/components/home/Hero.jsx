const branches = [
  {
    problem: "records scattered across spreadsheets and paper files",
    solution: "one encrypted system of record",
  },
  {
    problem: "no way to prove who accessed or changed a record",
    solution: "every action logged automatically",
  },
  {
    problem: "compliance is a guess, not a guarantee",
    solution: "built to NDPA 2023 from day one",
  },
];

function Hero() {
  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-14 md:gap-10">
        {/* Text column */}
        <div className="flex flex-col text-center md:text-left max-w-xl mx-auto md:mx-0">
          <span className="text-[#ffed00] text-xs uppercase tracking-[0.3em] mb-3">
            Encrypted · database · platform
          </span>

          <p
            className="text-white/80 text-3xl md:text-5xl font-bold mb-6 mt-2 leading-tight"
            data-aos="fade-up"
            data-aos-once="true"
          >
            Your data is encrypted,
            <br />
            compliant, all in one place.
          </p>

          <p
            className="text-white/60 leading-relaxed font-light text-xs md:text-sm"
            data-aos="fade-up"
            data-aos-once="true"
          >
            VaultBase is the encrypted database platform for Nigerian schools,
            clinics, and businesses. Upload the data you already have and we
            handle field-level encryption, fully aligned with NDPA 2023.
          </p>
        </div>

        {/* IDE-style branch graph */}
        <div
          className="w-full md:w-[380px] shrink-0 text-left mx-auto md:mx-0"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <p className="font-mono text-[10px] text-white/30 mb-4 tracking-wide">
            // what we fix
          </p>

          <div className="relative border-l border-white/15 pl-6 space-y-4">
            {branches.map((branch) => (
              <div key={branch.problem} className="relative">
                <span className="absolute -left-[29px] top-4 w-2 h-2 rounded-full bg-[#ffed00]" />
                <div className="bg-[#0A0A0A] border border-white/10 rounded-md px-4 py-3">
                  <p className="font-mono text-[11px] text-white/40 leading-relaxed">
                    // {branch.problem}
                  </p>
                  <p className="font-mono text-[11px] text-[#ffed00] leading-relaxed mt-1">
                    fix: "{branch.solution}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
