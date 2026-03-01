import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Shield, Heart, MapPin, Users, Headphones } from "lucide-react";
import {
  SplitTextReveal,
  ClipReveal,
  StaggerGrid,
  StaggerItem,
  LineDraw,
  MagneticHover,
} from "./animations/AnimationUtils";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const values = [
  { icon: Globe, title: "Global Expertise", desc: "International travel standards with deep local knowledge", num: "01" },
  { icon: Shield, title: "ATTA Certified", desc: "Licensed and regulated tour operator you can trust", num: "02" },
  { icon: Heart, title: "Personalized Service", desc: "Every trip tailored to your unique preferences", num: "03" },
  { icon: MapPin, title: "Local Guides", desc: "Expert guides who know every trail and story", num: "04" },
  { icon: Users, title: "Small Groups", desc: "Intimate experiences, not crowded tourist tours", num: "05" },
  { icon: Headphones, title: "24/7 Support", desc: "We're with you throughout your entire journey", num: "06" },
];

const AboutSection = () => {
  const { settings } = useSiteSettings();
  const { about } = settings;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-32 px-4 bg-background relative overflow-hidden" aria-label="Why choose Fresh Tracks Africa — mission, values, and certifications">
      {/* Moving background text */}
      <motion.div
        style={{ x: bgX }}
        className="absolute bottom-10 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[150px] lg:text-[250px] font-display font-bold text-foreground/[0.02] leading-none">
          WHY CHOOSE US
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <ClipReveal>
            <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
              ── Why Choose Us
            </p>
          </ClipReveal>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-5">
            <SplitTextReveal>{about.mission_title || "Mission & Vision"}</SplitTextReveal>
          </h2>
          <ClipReveal delay={0.3}>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-[15px] leading-relaxed">
              {about.mission_text || "We believe in responsible tourism that benefits local communities while providing authentic, transformative experiences."}
            </p>
          </ClipReveal>
        </div>

        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map(({ icon: Icon, title, desc, num }) => (
            <StaggerItem key={title}>
              <motion.div
                className="group relative p-8 lg:p-10 border border-border bg-card cursor-default overflow-hidden"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[2px] bg-secondary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{ originX: 0 }}
                />

                {/* Background number */}
                <span className="absolute top-4 right-6 text-6xl font-display font-bold text-foreground/[0.04] leading-none select-none">
                  {num}
                </span>

                <div className="relative">
                  <motion.div
                    className="w-14 h-14 bg-secondary/10 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.15, rotate: 8, backgroundColor: "hsl(var(--secondary))" }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors duration-400" />
                  </motion.div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-3">
                    {title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
};

export default AboutSection;

