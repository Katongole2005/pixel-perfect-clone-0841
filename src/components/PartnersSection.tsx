import { useRef } from "react";
import { motion } from "framer-motion";
import mtwaLogo from "@/assets/partners/mtwa-logo.jpg";
import uwaLogo from "@/assets/partners/uwa-logo.jpg";
import uwecLogo from "@/assets/partners/uwec-logo.png";
import uhoaLogo from "@/assets/partners/uhoa-logo.png";
import autoLogo from "@/assets/partners/auto-logo.png";
import uiaLogo from "@/assets/partners/uia-logo.png";
import tugataLogo from "@/assets/partners/tugata-logo.png";
import utbLogo from "@/assets/partners/utb-logo.png";
import eacLogo from "@/assets/partners/eac-logo.png";
import attaLogo from "@/assets/partners/atta-logo.png";
import { ClipReveal, SplitTextReveal, GlowCard } from "./animations/AnimationUtils";

const partners = [
  { name: "Ministry of Tourism", logo: mtwaLogo },
  { name: "Uganda Wildlife Authority", logo: uwaLogo },
  { name: "Uganda Wildlife Education Centre", logo: uwecLogo },
  { name: "Uganda Hotel Owners Association", logo: uhoaLogo },
  { name: "Association of Uganda Tour Operators", logo: autoLogo },
  { name: "Uganda Investment Authority", logo: uiaLogo },
  { name: "TUGATA", logo: tugataLogo },
  { name: "Uganda Tourism Board", logo: utbLogo },
  { name: "East African Community", logo: eacLogo },
  { name: "ATTA", logo: attaLogo },
];

const PartnersSection = () => (
  <section className="py-24 px-4 bg-muted relative overflow-hidden" aria-label="Our trusted partners and affiliations">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <ClipReveal>
          <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4">
            ── Trusted By
          </p>
        </ClipReveal>
        <h3 className="text-2xl md:text-4xl font-display font-bold text-foreground">
          <SplitTextReveal>Our Partners</SplitTextReveal>
        </h3>
      </div>
    </div>

    {/* Double marquee - opposite directions */}
    <div className="space-y-6">
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-16 items-center w-max hover:[animation-play-state:paused]">
          {[...partners, ...partners, ...partners].map((p, i) => (
            <GlowCard
              key={`a-${i}`}
              className="flex items-center justify-center w-32 h-20 md:w-40 md:h-24 shrink-0 p-4 bg-card border border-border hover:border-secondary/30 transition-all duration-300"
            >
              <img
                src={p.logo}
                alt={`${p.name} logo — Fresh Tracks Africa partner`}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Second row - reverse direction */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
        <div
          className="flex gap-16 items-center w-max hover:[animation-play-state:paused]"
          style={{ animation: "marquee 30s linear infinite reverse" }}
        >
          {[...partners, ...partners, ...partners].reverse().map((p, i) => (
            <GlowCard
              key={`b-${i}`}
              className="flex items-center justify-center w-32 h-20 md:w-40 md:h-24 shrink-0 p-4 bg-card border border-border hover:border-secondary/30 transition-all duration-300"
            >
              <img
                src={p.logo}
                alt={`${p.name} logo — Fresh Tracks Africa partner`}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
