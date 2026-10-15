function CommitmentItem({ id, title, children }) {
  return (
    <article className="grid grid-cols-[2rem_1fr] gap-4 border-t border-black/10 py-6 sm:gap-6">
      <span className="pt-1 font-mono text-xs text-[#5b6c57]">
        {String(id).padStart(2, "0")}
      </span>
      <div>
        <h3 className="mb-2 text-base font-semibold leading-snug text-black sm:text-lg">
          {title}
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-black/60">
          {children}
        </p>
      </div>
    </article>
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
    <section className="bg-[#f5f2eb] px-5 py-16 text-black sm:px-8 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:mb-12 md:mb-16 md:text-5xl">
          Commitments We Will Not Break
        </h2>

        <div className="grid md:grid-cols-2 md:gap-x-10">
          {commitments.map((c) => (
            <CommitmentItem key={c.id} id={c.id} title={c.header}>
              {c.desc}
            </CommitmentItem>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Commitments;
