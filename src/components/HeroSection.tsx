import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import { SplitTextReveal, ClipReveal, FloatingParticles, MagneticHover } from "./animations/AnimationUtils";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative h-[100vh] min-h-[700px] overflow-hidden"
      aria-label="Hero — Gorilla trekking and safari tours in Uganda and Rwanda"
    >
      {/* Ken Burns background image with parallax */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <img
          src={gorillaImg}
          alt="Mountain gorilla in Bwindi Impenetrable Forest, Uganda — gorilla trekking safari"
          className="w-full h-full object-cover animate-ken-burns"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating particles */}
      <FloatingParticles count={30} />

      {/* Decorative corner lines */}
      <motion.div
        className="absolute top-12 left-12 w-24 h-24 border-l-2 border-t-2 border-secondary/30"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-32 right-12 w-24 h-24 border-r-2 border-b-2 border-secondary/30"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
      />

      {/* Main content */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        {/* Subtitle with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 30, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-secondary text-sm md:text-base font-body font-semibold uppercase mb-6">
            Welcome to East Africa
          </p>
        </motion.div>

        {/* Main heading with staggered reveals */}
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-3">
          <SplitTextReveal delay={0.5}>Gorilla Trekking</SplitTextReveal>
          <br />
          <span className="text-secondary">
            <SplitTextReveal delay={0.8}>& Safari Tours</SplitTextReveal>
          </span>
          <motion.span
            className="text-white/80 block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic mt-2 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            in Uganda & Rwanda
          </motion.span>
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-white/60 text-base md:text-lg font-body max-w-xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          A once-in-a-lifetime encounter with gorillas in the mist
        </motion.p>

        {/* CTA with animated gradient border + glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <MagneticHover>
            <a
              href="#"
              className="group relative inline-flex items-center gap-3 px-12 py-5 text-sm font-body font-bold uppercase tracking-widest overflow-hidden"
              aria-label="Discover our gorilla trekking and safari tour packages"
            >
              {/* Animated gradient background */}
              <span className="absolute inset-0 bg-secondary animate-pulse-glow" />
              {/* Hover sweep effect */}
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative text-secondary-foreground group-hover:text-primary transition-colors duration-500">
                Discover Our Tours
              </span>
              <span className="relative">
                <svg
                  className="w-4 h-4 text-secondary-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </MagneticHover>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with glow ring */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.span
          className="text-white/40 text-[10px] font-body uppercase tracking-[0.3em]"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <div className="relative">
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-secondary"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          {/* Glow ring behind the scroll indicator */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 5px hsl(38 75% 55% / 0.2)",
                "0 0 20px hsl(38 75% 55% / 0.4)",
                "0 0 5px hsl(38 75% 55% / 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
