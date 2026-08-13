function CTA() {
  return (
    <div>
      <button
        disabled={false}
        onClick={() => {
          window.location.href = "/register";
        }}
        className="border pointer disabled:cursor-not-allowed  border-[#ffed00] text-[#ffed00] hover:bg-[#ffed00]/90 hover:text-black px-4 py-2 font-semibold rounded-sm  transition-all duration-200"
      >
        Get Started
      </button>
    </div>
  );
}

export default CTA;
