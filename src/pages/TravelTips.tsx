import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Luggage, Stethoscope, FileText, Plane, Sun, ShieldCheck, CreditCard, Plug } from "lucide-react";
import {
  SplitTextReveal,
  ClipReveal,
  FloatingParticles,
  StaggerGrid,
  StaggerItem,
} from "@/components/animations/AnimationUtils";

const tips = [
  {
    icon: FileText,
    title: "Visa & Entry Requirements",
    details: [
      "Most nationalities can obtain a visa on arrival or e-visa",
      "East Africa Tourist Visa covers Uganda, Rwanda & Kenya ($100)",
      "Passport must be valid for 6+ months from entry date",
      "Yellow fever vaccination certificate is mandatory",
    ],
  },
  {
    icon: Stethoscope,
    title: "Health & Vaccinations",
    details: [
      "Yellow fever vaccine required (carry your card!)",
      "Malaria prophylaxis recommended — consult your doctor",
      "Bring insect repellent with DEET (30-50%)",
      "Travel insurance with medical evacuation is essential",
    ],
  },
  {
    icon: Luggage,
    title: "Packing Essentials",
    details: [
      "Soft-sided bags preferred for safari vehicles",
      "Layered clothing — mornings and evenings can be cool",
      "Waterproof jacket and sturdy hiking boots for trekking",
      "Binoculars, camera with zoom lens, and extra batteries",
    ],
  },
  {
    icon: Sun,
    title: "Best Time to Visit",
    details: [
      "Dry seasons: June–September and December–February",
      "Gorilla trekking is year-round but drier months are easier",
      "Green season (March–May) offers lush landscapes and fewer crowds",
      "Game viewing is best in dry season when animals gather at water sources",
    ],
  },
  {
    icon: CreditCard,
    title: "Money & Currency",
    details: [
      "Uganda Shilling (UGX) — US dollars widely accepted",
      "Carry clean, post-2006 US bills for best exchange rates",
      "ATMs available in major towns — Visa/Mastercard accepted",
      "Tipping is appreciated: $10-20/day for guides",
    ],
  },
  {
    icon: Plug,
    title: "Power & Connectivity",
    details: [
      "Uganda uses Type G plugs (UK-style, 3-pin)",
      "Bring a universal adapter and portable power bank",
      "Mobile data SIM cards are cheap — MTN or Airtel recommended",
      "Wi-Fi available in most lodges but can be slow in remote areas",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Safety Tips",
    details: [
      "Uganda is generally safe for tourists — use common sense",
      "Always trek with certified guides in national parks",
      "Keep valuables secure and use hotel safes",
      "Drink bottled or purified water only",
    ],
  },
  {
    icon: Plane,
    title: "Getting There",
    details: [
      "Entebbe International Airport (EBB) is the main gateway",
      "Direct flights from Amsterdam, Dubai, Istanbul, Nairobi",
      "Internal flights to parks available (saves driving time)",
      "Road transfers included in all our tour packages",
    ],
  },
];

const TravelTipsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Travel Tips for Uganda & Rwanda | Fresh Tracks Africa</title>
        <meta name="description" content="Essential travel tips for visiting Uganda and Rwanda — visa info, packing lists, health advice, currency, safety, and more from Fresh Tracks Africa." />
      </Helmet>

      <div className="bg-background min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-primary/5">
          <FloatingParticles count={15} className="opacity-10" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
              <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4">── Essential Information</p>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                <SplitTextReveal>Travel Tips</SplitTextReveal>
              </h1>
              <p className="text-xl text-muted-foreground font-body leading-relaxed">
                Everything you need to know before your East African adventure. From visas to vaccinations, we've got you covered.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tips Grid */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {tips.map(({ icon: Icon, title, details }) => (
                <StaggerItem key={title}>
                  <motion.div
                    className="group p-8 border border-border bg-card overflow-hidden"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-foreground">{title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground font-body text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      </div>
    </>
  );
};

export default TravelTipsPage;
