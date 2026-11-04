import Image from "next/image";
import { OpenWaitlistButton } from "@/components/WaitlistModal";
import { Reveal } from "@/components/Reveal";

export function HeroSection() {
  return (
    <section className="page-shell grid min-h-[calc(100vh-76px)] items-center gap-12 py-14 lg:grid-cols-2 lg:gap-10 lg:py-10">
      <div className="relative z-10 max-w-[430px]">
        <Reveal delayMs={40}>
          <p className="eyebrow mb-3">Your most personal AI agent yet</p>
        </Reveal>
        <Reveal delayMs={120}>
          <h1 className="text-[36px] leading-[42px] font-light tracking-[-0.02em] md:text-[48px] md:leading-[52px]">
            Meet Poseidon.
            <br />
            Be everywhere.
          </h1>
        </Reveal>
        <Reveal delayMs={200}>
          <p className="body-copy mt-3 max-w-[420px]">
            Your AI attends the conversations you can&apos;t, understands what
            matters to you, and turns industry intelligence into your next
            opportunity.
          </p>
        </Reveal>
        <Reveal delayMs={280}>
          <OpenWaitlistButton className="btn-primary mt-8">
            Join the Poseidon waitlist
          </OpenWaitlistButton>
        </Reveal>
      </div>

      <Reveal delayMs={180} className="w-full">
        <div className="hero-visual-frame hero-visual-enter relative flex aspect-[1.52] items-center justify-center overflow-hidden rounded-[32px]">
          <div className="hero-product-window">
            <Image
              src="/poseidon-intelligence-dashboard.png"
              alt="Poseidon intelligence dashboard showing signals, opportunities, and a personalized intelligence model"
              width={1568}
              height={1003}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
          <div className="hero-grain" aria-hidden="true" />
          <OpenWaitlistButton className="group absolute z-10 flex items-center gap-5 rounded-full bg-white py-3 pr-7 pl-3 text-[22px] font-normal shadow-[0_2px_18px_rgba(0,0,0,0.08)] transition-colors">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-white transition-colors group-hover:bg-[#ee6e4b]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M14 7l5 5-5 5" />
              </svg>
            </span>
            Get early access
          </OpenWaitlistButton>
        </div>
      </Reveal>
    </section>
  );
}
