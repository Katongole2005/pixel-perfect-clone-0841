import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";

/* ─── Variants ─── */
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
  },
};

const numberVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 40,
    y: 15,
    rotate: direction * 5,
  }),
  visible: {
    opacity: 0.7,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
  },
};

const ghostVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 15, rotate: -5 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
  },
  floating: {
    y: [-8, 8],
    transition: {
      y: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" as const },
    },
  },
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <AnimatePresence mode="wait">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* ── 4 👻 4 ── */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
            <motion.span
              className="text-[80px] md:text-[120px] font-bold text-[#222222] opacity-70 select-none font-display leading-none"
              variants={numberVariants}
              custom={-1}
            >
              4
            </motion.span>

            <motion.div
              variants={ghostVariants}
              animate={["visible", "floating"]}
            >
              {/* Ghost SVG — inline so no external img dependency */}
              <svg
                viewBox="0 0 120 120"
                className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* body */}
                <path
                  d="M20 110 C20 110 15 90 15 65 C15 35 35 10 60 10 C85 10 105 35 105 65 C105 90 100 110 100 110 L88 97 L76 110 L64 97 L52 110 L40 97 L28 110 Z"
                  fill="#3d6e47"
                  opacity="0.85"
                />
                {/* eyes */}
                <ellipse cx="45" cy="58" rx="9" ry="11" fill="white" />
                <ellipse cx="75" cy="58" rx="9" ry="11" fill="white" />
                <circle cx="48" cy="61" r="5" fill="#1a3a20" />
                <circle cx="78" cy="61" r="5" fill="#1a3a20" />
                {/* shine */}
                <circle cx="50" cy="57" r="2" fill="white" opacity="0.8" />
                <circle cx="80" cy="57" r="2" fill="white" opacity="0.8" />
              </svg>
            </motion.div>

            <motion.span
              className="text-[80px] md:text-[120px] font-bold text-[#222222] opacity-70 select-none font-display leading-none"
              variants={numberVariants}
              custom={1}
            >
              4
            </motion.span>
          </div>

          {/* ── Message ── */}
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-[#222222] mb-4 md:mb-6 opacity-70 font-display select-none"
            variants={itemVariants}
          >
            Boo! Page Missing!
          </motion.h1>

          <motion.p
            className="text-base md:text-xl text-[#222222] mb-8 md:mb-12 opacity-50 font-body select-none max-w-sm mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Looks like this trail leads nowhere — this page has gone into the wild.
          </motion.p>

          {/* ── CTA ── */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="flex justify-center"
          >
            <Link to="/">
              <FlowButton text="Back to camp" />
            </Link>
          </motion.div>

          {/* ── Sub-link ── */}
          <motion.div className="mt-10" variants={itemVariants}>
            <Link
              to="/contact"
              className="text-[#222222] opacity-40 hover:opacity-70 transition-opacity underline font-body text-sm select-none"
            >
              Need help? Contact us →
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NotFound;
