import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import { ArrowUpRight } from "lucide-react";
import {
  SplitTextReveal,
  ClipReveal,
  StaggerGrid,
  StaggerItem,
  MagneticHover,
} from "./animations/AnimationUtils";

const parks = [
  { name: "Bwindi Impenetrable", tag: "Gorilla Trekking", image: news1, tours: "12 Tours", area: "331 km²" },
  { name: "Queen Elizabeth", tag: "Wildlife Safari", image: news2, tours: "8 Tours", area: "1,978 km²" },
  { name: "Murchison Falls", tag: "Waterfalls & Wildlife", image: news3, tours: "10 Tours", area: "3,893 km²" },
  { name: "Kibale Forest", tag: "Chimpanzee Tracking", image: news4, tours: "6 Tours", area: "795 km²" },
];

const AfconSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });

  return (
    <section ref={ref} className="py-32 px-4 bg-background relative overflow-hidden" aria-label="Top national parks in Uganda for safari and gorilla trekking">
      {/* Giant moving background text */}
      <motion.div
        style={{ x: smoothX }}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[200px] lg:text-[300px] font-display font-bold text-foreground/[0.02] leading-none">
          EXPLORE UGANDA
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <ClipReveal>
            <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
              ── Must-Visit Destinations
            </p>
          </ClipReveal>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
            <SplitTextReveal>Top National Parks</SplitTextReveal>
          </h2>
          <ClipReveal delay={0.3}>
            <p className="text-muted-foreground font-body mt-5 max-w-md mx-auto text-[15px] leading-relaxed">
              Each park offers a unique ecosystem and unforgettable encounters
              with wildlife
            </p>
          </ClipReveal>
        </div>

        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {parks.map((park) => (
            <StaggerItem key={park.name}>
              <a href="/national-parks" className="group relative overflow-hidden cursor-pointer block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={park.image}
                    alt={`${park.name} National Park — ${park.tag} in Uganda`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Hover line accent */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-secondary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ originX: 0 }}
                  />

                  {/* Top info */}
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                    <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-body font-bold uppercase tracking-[0.2em] px-3 py-2 border border-white/10">
                      {park.tag}
                    </span>
                    <MagneticHover strength={0.4}>
                      <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </span>
                    </MagneticHover>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-white text-lg font-display font-bold leading-snug mb-1">
                          {park.name}
                        </h3>
                        <p className="text-white/40 text-[10px] font-body font-bold uppercase tracking-[0.2em]">
                          {park.tours} · {park.area}
                        </p>
                      </div>
                    </div>
                    {/* Expanding line on hover */}
                    <motion.div
                      className="h-px bg-white/30 mt-4"
                      initial={{ scaleX: 0.3 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
};

export default AfconSection;
