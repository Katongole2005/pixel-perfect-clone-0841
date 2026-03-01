import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200;

    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setPhase("reveal");
        setTimeout(onComplete, 900);
      }
    };
    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "reveal" || progress < 100 ? null : null}
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[hsl(var(--brand-charcoal))]"
        initial={{ opacity: 1 }}
        exit={{
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0,
        }}
        animate={
          phase === "reveal"
            ? { clipPath: "circle(0% at 50% 50%)", opacity: 0 }
            : { clipPath: "circle(150% at 50% 50%)", opacity: 1 }
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <img
            src={logo}
            alt="Fresh Tracks Africa"
            className="w-28 h-28 md:w-36 md:h-36 object-contain"
          />
        </motion.div>

        {/* Brand name */}
        <motion.h1
          className="text-[hsl(var(--brand-cream))] font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase mb-8"
          initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Fresh Tracks Africa
        </motion.h1>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--secondary)), hsl(var(--brand-earth-light)))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Percentage */}
        <motion.span
          className="mt-4 text-sm text-white/40 font-mono tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
