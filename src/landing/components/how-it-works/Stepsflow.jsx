const steps = [
  {
    number: "01",
    title: "Create your account",
    description: "Sign up in minutes — no paperwork, no back-and-forth.",
  },
  {
    number: "02",
    title: "Tell us how you'll use it",
    description:
      "Choose Individual or Enterprise. This one choice shapes your interface, your pricing, and what's available to you from here on.",
  },
  {
    number: "03",
    title: "Bring in your data",
    description:
      "Individual accounts upload data directly. Enterprise accounts register each organization they manage.",
  },
  {
    number: "04",
    title: "See everything from one overview",
    description:
      "Database health, uptime, live schema visualisation, and search all in one place, from the moment your data lands.",
  },
];

function StepsFlow() {
  return (
    <div className="bg-black py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="border-t border-white/10 pt-5"
            >
              <span className="text-[#ffed00] text-sm font-medium">
                {step.number}
              </span>
              <h3 className="text-white text-lg font-semibold mt-3 mb-3">
                {step.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepsFlow;
