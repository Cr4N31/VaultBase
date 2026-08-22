import { useState } from "react";

const individualPlans = [
  {
    name: "Free",
    price: "₦0",
    period: "/mo",
    description: "Try VaultBase with a small amount of your own data.",
    features: [
      "Up to 500 records",
      "Basic data upload",
      "Standard encryption",
      "Community support",
    ],
  },
  {
    name: "Starter",
    price: "TBD",
    period: "/mo",
    description: "For individuals managing a single dataset seriously.",
    features: [
      "Higher record limit",
      "Search with filters",
      "DB health & uptime monitoring",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "TBD",
    period: "/mo",
    description: "For individuals who need the full toolset.",
    features: [
      "Everything in Starter",
      "ERD visualiser",
      "Sub-tables on any row",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "TBD",
    period: "/mo",
    description: "Highest limits, for power users.",
    features: [
      "Everything in Pro",
      "Highest record limits",
      "Advanced monitoring",
      "Dedicated support",
    ],
  },
];

const enterprisePlans = [
  {
    name: "SMEs",
    price: "TBD",
    period: "/mo",
    description:
      "For small and growing businesses managing customer and staff data.",
    features: [
      "Register multiple organizations",
      "Per-organization DB view",
      "Search, filters & ERD per org",
      "Email & priority support",
    ],
  },
  {
    name: "School",
    price: "TBD",
    period: "/mo",
    description:
      "Built around student and staff records at institutional scale.",
    features: [
      "Everything in SMEs",
      "Higher record limits for student data",
      "Encryption status per organization",
      "Dedicated onboarding",
    ],
    featured: true,
  },
  {
    name: "Large Business",
    price: "Custom",
    period: "",
    description: "For organizations with complex data and compliance needs.",
    features: [
      "Everything in School",
      "Custom record limits",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];

function PlanCard({ plan }) {
  return (
    <div
      className={`rounded-lg p-8 border ${
        plan.featured
          ? "border-[#ffed00]/50 bg-[#ffed00]/[0.03]"
          : "border-white/10"
      }`}
    >
      {plan.featured && (
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#ffed00] font-medium">
          Most popular
        </span>
      )}
      <h3 className="text-white text-xl font-bold mt-2 mb-1">{plan.name}</h3>
      <p className="text-white/50 text-sm mb-6 leading-relaxed">
        {plan.description}
      </p>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-white text-3xl font-bold">{plan.price}</span>
        {plan.period && (
          <span className="text-white/40 text-sm">{plan.period}</span>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex gap-2 text-sm text-white/70 leading-relaxed"
          >
            <span className="text-[#ffed00] shrink-0">→</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-md text-sm font-semibold transition ${
          plan.featured
            ? "bg-[#ffed00] text-black hover:opacity-90"
            : "border border-white/20 text-white hover:border-[#ffed00]/50"
        }`}
      >
        Get started
      </button>
    </div>
  );
}

function PricingPlans() {
  const [accountType, setAccountType] = useState("individual");
  const plans =
    accountType === "individual" ? individualPlans : enterprisePlans;

  return (
    <div className="bg-black pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex border border-white/10 rounded-full p-1 bg-white/5">
            <button
              onClick={() => setAccountType("individual")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                accountType === "individual"
                  ? "bg-[#ffed00] text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setAccountType("enterprise")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                accountType === "enterprise"
                  ? "bg-[#ffed00] text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Enterprise
            </button>
          </div>
        </div>

        {/* Plan grid */}
        <div
          className={`grid gap-6 ${
            accountType === "individual"
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          }`}
        >
          {plans.map((plan) => (
            <div key={plan.name}>
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPlans;
