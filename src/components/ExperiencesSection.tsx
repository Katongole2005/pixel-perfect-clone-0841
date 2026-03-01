import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import adventureImg from "@/assets/adventure.jpg";
import culturalImg from "@/assets/cultural-heritage.jpg";
import { ArrowRight } from "lucide-react";
import {
  SplitTextReveal,
  ClipReveal,
  ImageReveal,
  LineDraw,
  MagneticHover,
} from "./animations/AnimationUtils";

const experiences = [
  {
    title: "Mountain Gorilla Trekking",
    subtitle: "UNESCO World Heritage",
    description:
      "Trek through Bwindi Impenetrable Forest to meet endangered mountain gorillas in their natural habitat.",
    image: gorillaImg,
    num: "01",
    href: "/gorilla-trekking",
  },
  {
    title: "Adventure Safaris",
    subtitle: "Thrilling Experiences",
    description:
      "From rafting the Nile to hiking the Rwenzori Mountains — Uganda is an adventurer's paradise.",
    image: adventureImg,
    num: "02",
    href: "/adventure-safaris",
  },
  {
    title: "Cultural Heritage Tours",
    subtitle: "56+ Tribes",
    description:
      "Explore Uganda's rich cultural diversity with traditional kingdoms, historical sites, and authentic community experiences.",
    image: culturalImg,
    num: "03",
    href: "/cultural-tours",
  },
];

const ExperiencesSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const smoothBgY = useSpring(bgY, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-20 lg:py-24 px-4 bg-background overflow-hidden"
      aria-label="Our experiences — gorilla trekking, adventure safaris, and cultural tours"
    >
      {/* Animated grid background */}
      <motion.div
        style={{ y: smoothBgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-14 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <ClipReveal>
              <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
                ── What We Offer
              </p>
            </ClipReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-[1.1]">
              <SplitTextReveal delay={0.1}>
                Gorilla Trekking Safari
              </SplitTextReveal>
              <br />
              <span className="text-secondary italic">
                <SplitTextReveal delay={0.3}>
                  & Mountain Bike Tours
                </SplitTextReveal>
              </span>
            </h2>
            <LineDraw
              className="w-20 h-[2px] bg-secondary mt-8"
              delay={0.6}
            />
          </div>

          <MagneticHover className="shrink-0">
            <a
              href="/travel-topics"
              className="group inline-flex items-center gap-4 text-sm font-body font-bold uppercase tracking-wider text-foreground hover:text-secondary transition-colors duration-500"
            >
              <span>All Experiences</span>
              <span className="relative w-14 h-14 rounded-full border-2 border-current flex items-center justify-center overflow-hidden">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-6 transition-transform duration-500" />
                <ArrowRight className="w-5 h-5 absolute -translate-x-6 group-hover:translate-x-0 transition-transform duration-500" />
              </span>
            </a>
          </MagneticHover>
        </div>

        {/* Experience cards - asymmetric stagger */}
        <div className="space-y-12 md:space-y-16 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
          {experiences.map((exp, i) => {
            const colStart = i === 0 ? "lg:col-span-4" : i === 1 ? "lg:col-span-4 lg:mt-20" : "lg:col-span-4 lg:mt-40";
            return (
              <a key={exp.title} href={exp.href} className={`group cursor-pointer block ${colStart}`}>
                {/* Number */}
                <ClipReveal delay={i * 0.15}>
                  <span className="text-[80px] md:text-[100px] lg:text-[130px] font-display font-bold leading-none text-foreground/[0.04] block -mb-8 md:-mb-10 lg:-mb-14">
                    {exp.num}
                  </span>
                </ClipReveal>

                {/* Image */}
                <div className="relative overflow-hidden mb-3">
                  <ImageReveal
                    src={exp.image}
                    alt={exp.title}
                    className="aspect-[4/3]"
                    delay={0.1 + i * 0.15}
                  />
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-primary/60 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <MagneticHover strength={0.5}>
                      <span className="w-20 h-20 rounded-full border-2 border-primary-foreground flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-primary-foreground" />
                      </span>
                    </MagneticHover>
                  </motion.div>
                </div>

                {/* Content */}
                <ClipReveal delay={0.3 + i * 0.15}>
                  <p className="text-secondary text-[10px] font-body font-bold uppercase tracking-[0.3em] mb-2">
                    {exp.subtitle}
                  </p>
                </ClipReveal>
                <h3 className="text-xl lg:text-2xl font-display font-bold text-foreground mb-2 leading-snug">
                  <SplitTextReveal delay={0.35 + i * 0.15}>
                    {exp.title}
                  </SplitTextReveal>
                </h3>
                <ClipReveal delay={0.45 + i * 0.15}>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mb-5">
                    {exp.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-foreground text-xs font-body font-bold uppercase tracking-wider group-hover:text-secondary group-hover:gap-4 transition-all duration-500">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </ClipReveal>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
