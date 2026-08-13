function CTA() {
  return (
    <div>
      <button
        disabled={false}
        onClick={() => {
          window.location.href = "/register";
        }}
        className="border text-sm pointer disabled:cursor-not-allowed  border-[#ffed00]/70 text-[#ffed00] hover:border-[#ffed00] px-3 py-2 font-semibold transition-all duration-200"
      >
        Get Started
      </button>
    </div>
  );
}

export default CTA;
