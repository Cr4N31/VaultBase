import { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to actual endpoint once backend contact route exists.
    // For now this just confirms the form works end-to-end in the UI.
    setSubmitted(true);
  };

  return (
    <div className="bg-black pb-24 px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          {submitted ? (
            <div className="border border-[#ffed00]/30 rounded-lg p-8">
              <h3 className="text-white text-lg font-semibold mb-2">
                Message received.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We'll get back to you shortly. In the meantime, feel free to
                reach out directly using the details alongside this form.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/70 text-xs uppercase tracking-[0.15em] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-[#ffed00]/50 transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs uppercase tracking-[0.15em] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-[#ffed00]/50 transition"
                  placeholder="you@organization.com"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs uppercase tracking-[0.15em] mb-2">
                  Organization{" "}
                  <span className="text-white/30 normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-[#ffed00]/50 transition"
                  placeholder="School, clinic, or business name"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs uppercase tracking-[0.15em] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-[#ffed00]/50 transition resize-none"
                  placeholder="What do you want to know?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffed00] text-black font-semibold text-sm py-3 rounded-md hover:opacity-90 transition"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        {/* Direct contact info */}
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-[#ffed00] mb-6">
            Direct
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-1">
                Email
              </p>
              <p className="text-white text-base">hello@cran3.com</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-1">
                Based in
              </p>
              <p className="text-white text-base">Abuja, Nigeria</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-1">
                Response time
              </p>
              <p className="text-white text-base">
                Usually within 1–2 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
