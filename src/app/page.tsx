import { CookiePreferences } from "@/components/CookiePreferences";
import { HeroSection } from "@/components/HeroSection";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemsSection } from "@/components/SystemsSection";
import { WaitlistModalProvider } from "@/components/WaitlistModal";

export default function Home() {
  return (
    <WaitlistModalProvider>
      <div className="min-h-screen bg-[#fdfdfd] text-black">
        <SiteHeader />
        <main className="overflow-x-hidden">
          <HeroSection />
          <SystemsSection />
        </main>
      </div>
      <CookiePreferences />
    </WaitlistModalProvider>
  );
}
