"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { OpenWaitlistButton } from "@/components/WaitlistModal";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-black/6 bg-[#fdfdfd]/85 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur-xl"
          : "border-b border-transparent bg-[#fdfdfd]/70 backdrop-blur-md"
      }`}
    >
      <div className="page-shell flex h-[76px] items-center justify-between">
        <a href="#" aria-label="Poseidon home" className="reveal is-revealed">
          <Image
            src="/poseidon-logo.png"
            alt="Poseidon"
            width={210}
            height={56}
            className="h-14 w-[210px] object-contain mix-blend-multiply"
            priority
          />
        </a>
        <OpenWaitlistButton className="btn-secondary">
          Join waitlist
        </OpenWaitlistButton>
      </div>
    </header>
  );
}
