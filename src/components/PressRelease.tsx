import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import pressImg from "@/assets/press-release.jpg";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import { ArrowRight } from "lucide-react";
import {
  SplitTextReveal,
  ClipReveal,
  ImageReveal,
  LineDraw,
  AnimatedCounter,
  MagneticHover,
} from "./animations/AnimationUtils";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Happy Travelers" },
  { value: 50, suffix: "+", label: "Tour Packages" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

const PressRelease = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const smoothScale = useSpring(imgScale, { stiffness: 60, damping: 20 });
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const smoothRotate = useSpring(rotate, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 bg-muted relative overflow-hidden"
      aria-label="About Fresh Tracks Africa — 10+ years creating unforgettable safari experiences"
    >
      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 rounded-full bg-secondary"
        animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-32 w-3 h-3 rounded-full bg-secondary/30"
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Image composition */}
          <div className="lg:col-span-6 relative">
            <motion.div style={{ rotate: smoothRotate }}>
              <div className="relative">
                <ImageReveal
                  src={pressImg}
                  alt="Tourism in Uganda"
                  className="aspect-[4/5] w-full"
                />
                {/* Floating secondary image */}
                <motion.div
                  className="absolute -bottom-8 -right-8 w-2/5 border-4 border-muted shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <img
                    src={gorillaImg}
                    alt="Gorilla"
                    className="w-full aspect-square object-cover"
                  />
                </motion.div>
                {/* Experience badge */}
                <motion.div
                  className="absolute -top-6 -left-6 bg-secondary text-secondary-foreground p-6 shadow-xl"
                  initial={{ opacity: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <span className="text-3xl font-display font-bold block">10+</span>
                  <span className="text-[10px] font-body font-bold uppercase tracking-wider">Years</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6 lg:pl-8">
            <ClipReveal>
              <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
                ── Welcome to Fresh Tracks Africa
              </p>
            </ClipReveal>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-[1.1] mb-4">
              <SplitTextReveal>We Create</SplitTextReveal>
              <br />
              <span className="text-secondary italic">
                <SplitTextReveal delay={0.2}>Unforgettable</SplitTextReveal>
              </span>
              <br />
              <SplitTextReveal delay={0.35}>Experiences</SplitTextReveal>
            </h2>

            <LineDraw className="w-16 h-[2px] bg-secondary my-8" delay={0.5} />

            <ClipReveal delay={0.4}>
              <p className="text-muted-foreground font-body leading-[2] text-[15px] mb-5">
                Fresh Tracks Africa Tours & Travel Ltd. is your trusted partner for
                unforgettable adventures in Uganda and Rwanda. We specialize in
                personalized gorilla trekking expeditions, wildlife safaris, and
                cultural heritage tours.
              </p>
            </ClipReveal>
            <ClipReveal delay={0.5}>
              <p className="text-muted-foreground font-body leading-[2] text-[15px] mb-10">
                With years of local expertise, we craft journeys that go beyond
                the ordinary — connecting you with the raw beauty of East
                Africa.
              </p>
            </ClipReveal>

            <ClipReveal delay={0.6}>
              <MagneticHover className="inline-block">
                <a
                  href="#"
                  className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 text-sm font-body font-bold uppercase tracking-wider overflow-hidden"
                >
                  <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center gap-3">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </MagneticHover>
            </ClipReveal>
          </div>
        </div>

        {/* Stats with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-24 relative">
          {/* Top line */}
          <LineDraw className="absolute top-0 left-0 right-0 h-px bg-border" delay={0.3} />
          <LineDraw className="absolute bottom-0 left-0 right-0 h-px bg-border" delay={0.4} />

          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative py-10 px-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              {i < 3 && (
                <div className="absolute right-0 top-4 bottom-4 w-px bg-border hidden md:block" />
              )}
              <p className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-muted-foreground font-body text-xs uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressRelease;
