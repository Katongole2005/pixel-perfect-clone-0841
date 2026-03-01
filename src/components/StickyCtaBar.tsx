import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-[90] backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground hidden sm:block">
              <span className="text-foreground font-medium">
                Ready for an unforgettable African adventure?
              </span>{" "}
              Let us craft your dream safari.
            </p>
            <p className="text-sm text-foreground font-medium sm:hidden">
              Plan your African adventure
            </p>

            <Link
              to="/plan-your-trip"
              className="group flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
            >
              Plan Your Trip
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCtaBar;
