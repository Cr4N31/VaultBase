function CTA() {
  return (
    <div>
      <button
        disabled={false}
        onClick={() => {
          window.location.href = "/register";
        }}
        className="border text-sm pointer hover:bg-[#5b6c57] hover:text-[#fcf3eb] transition-all duration-250 border-[#5b6c57]/80 text-[#5b6c57] hover:border-[#5b6c57] px-3 py-2 font-semibold transition-all duration-200"
      >
        Get Started
      </button>
    </div>
  );
}

export default CTA;
