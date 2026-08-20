import LogoAnimated from "../animation/LogoAnimated";
import VaultbasePrimary from "/img/vaultbase-primary.svg";
import AfricanReach from "/svg/vaultbase_africa_reach.svg";
function Hero() {
  return (
    <section className="py-22 flex flex-col justify-center items-center text-center px-6 bg-black">
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
          <p
            className="text-white/80 text-center whitespace-wrap text-3xl md:text-5xl font-bold mb-6 mt-2"
            data-aos="fade-up"
            data-aos-once="true"
          >
            Your data is encrypted,
            <br />
            compliant, all in one place.
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
      </div>
    </section>
  );
}
export default Hero;
