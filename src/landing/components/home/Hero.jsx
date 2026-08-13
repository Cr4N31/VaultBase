import LogoAnimated from "../animation/LogoAnimated";
import AfricanReach from "/svg/vaultbase_africa_reach.svg";
function Hero() {
  return (
    <section className="py-22 mt-20 flex flex-col justify-center items-center text-center px-6 bg-black">
      <img
        src={AfricanReach}
        alt=""
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      />

      <span className="text-[#ffed00] text-[8px] uppercase tracking-[0.3em] mb-6">
        Encrypted · Compliant · Transparent
      </span>

      <div className="max-w-2xl">
        <div>
          <div className="flex justify-center">
            <LogoAnimated />
          </div>

          <p
            className="text-white text-sm md:text-lg font-medium mb-3"
            data-aos="fade-up"
            data-aos-once="true"
          >
            Your data is encrypted, compliant, all in one place.
          </p>

          <p
            className="text-white/60 text-base font-light text-xs md:text-sm mb-10"
            data-aos="fade-up"
            data-aos-once="true"
          >
            Upload the data you already have. VaultBase secures every record
            with field-level encryption, fully aligned with NDPA 2023.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <a
            href="#"
            className="bg-[#ffed00] text-black text-sm font-semibold px-8 py-3 rounded-full hover:bg-[#ffed00]/90 transition"
          >
            Register Your Organization
          </a>

          <a
            href="#"
            className="border text-sm border-[#ffed00]/40 text-[#ffed00] font-semibold px-8 py-3 rounded-full hover:border-[#ffed00] transition"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
export default Hero;
