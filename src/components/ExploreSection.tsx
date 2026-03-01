import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import exploreImg from "@/assets/explore-uganda.jpg";
import adventureImg from "@/assets/adventure.jpg";
import { ArrowRight, Calendar, DollarSign, Check } from "lucide-react";
import {
  SplitTextReveal,
  ClipReveal,
  ImageReveal,
  LineDraw,
  MagneticHover,
} from "./animations/AnimationUtils";

const safaris = [
  {
    title: "3-Day Gorilla Trek",
    price: "1,500",
    duration: "3 Days / 2 Nights",
    image: exploreImg,
    highlights: ["Bwindi Forest", "Gorilla Permit Included", "Luxury Lodge"],
  },
  {
    title: "5-Day Uganda Safari",
    price: "2,200",
    duration: "5 Days / 4 Nights",
    image: adventureImg,
    highlights: ["Queen Elizabeth NP", "Game Drives", "Boat Safari"],
  },
];

const ExploreSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const smoothY1 = useSpring(y1, { stiffness: 60, damping: 20 });
  const smoothY2 = useSpring(y2, { stiffness: 60, damping: 20 });

  return (
    <section ref={ref} className="py-32 px-4 bg-muted relative overflow-hidden" aria-label="Featured safari packages and pricing">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left sticky content */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <ClipReveal>
              <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
                ── Featured Packages
              </p>
            </ClipReveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-[1.1] mb-5">
              <SplitTextReveal>Join Us on Our</SplitTextReveal>
              <br />
              <span className="text-secondary italic">
                <SplitTextReveal delay={0.2}>Active Safaris</SplitTextReveal>
              </span>
            </h2>
            <LineDraw className="w-16 h-[2px] bg-secondary my-8" delay={0.4} />
            <ClipReveal delay={0.5}>
              <p className="text-muted-foreground font-body leading-[2] text-[15px] mb-10">
                Our carefully curated safari packages offer the perfect blend of
                adventure, comfort, and authentic East African experiences.
              </p>
            </ClipReveal>
            <ClipReveal delay={0.6}>
              <MagneticHover className="inline-block">
                <a
                  href="/trip-search"
                  className="group relative inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-10 py-5 text-sm font-body font-bold uppercase tracking-wider overflow-hidden"
                >
                  <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center gap-3 group-hover:text-primary-foreground transition-colors duration-500">
                    View All Safaris
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </MagneticHover>
            </ClipReveal>
          </div>

          {/* Right cards with parallax offset */}
          <div className="lg:col-span-7 space-y-8">
            {safaris.map((safari, i) => (
              <motion.div
                key={safari.title}
                style={{ y: i === 0 ? smoothY1 : smoothY2 }}
              >
                <motion.div
                  className="group cursor-pointer bg-card border border-border hover:border-secondary/40 overflow-hidden relative"
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: -8 }}
                >
                  {/* Left accent bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ originY: 0 }}
                  />

                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-2/5 overflow-hidden">
                      <motion.img
                        src={safari.image}
                        alt={`${safari.title} — ${safari.duration} starting from $${safari.price} per person`}
                        className="w-full h-60 sm:h-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/40 backdrop-blur-md text-white text-[9px] font-body font-bold uppercase tracking-[0.2em] px-3 py-2 flex items-center gap-1.5 border border-white/10">
                          <Calendar className="w-3 h-3" />
                          {safari.duration}
                        </span>
                      </div>
                    </div>
                    <div className="sm:w-3/5 p-8 flex flex-col justify-center">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                        {safari.title}
                      </h3>
                      <p className="text-secondary font-display font-bold text-2xl flex items-baseline gap-1 mb-5">
                        <span className="text-sm font-body text-muted-foreground">From</span>
                        ${safari.price}
                        <span className="text-muted-foreground text-xs font-body font-normal">
                          /person
                        </span>
                      </p>
                      <ul className="space-y-2.5 mb-6">
                        {safari.highlights.map((h) => (
                          <li
                            key={h}
                            className="text-muted-foreground font-body text-sm flex items-center gap-3"
                          >
                            <span className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-secondary" />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <a href="/plan-your-trip" className="inline-flex items-center gap-2 text-foreground text-xs font-body font-bold uppercase tracking-wider group-hover:text-secondary group-hover:gap-4 transition-all duration-500">
                        View Details <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
