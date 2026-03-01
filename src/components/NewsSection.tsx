import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  SplitTextReveal,
  ClipReveal,
  StaggerGrid,
  StaggerItem,
  CharReveal,
} from "./animations/AnimationUtils";

const reviews = [
  {
    name: "Sarah M.",
    location: "London, UK",
    text: "Fresh Tracks Africa made our gorilla trekking dream a reality. Every detail was perfectly arranged. The guides were knowledgeable and passionate.",
    rating: 5,
    initial: "S",
  },
  {
    name: "David K.",
    location: "New York, USA",
    text: "An incredible safari experience through Queen Elizabeth National Park. We saw the tree-climbing lions! Highly recommend Fresh Tracks Africa.",
    rating: 5,
    initial: "D",
  },
  {
    name: "Maria L.",
    location: "Berlin, Germany",
    text: "The cultural immersion was extraordinary. We visited local communities and experienced authentic Ugandan hospitality. Truly unforgettable.",
    rating: 5,
    initial: "M",
  },
];

const NewsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const smoothBgX = useSpring(bgX, { stiffness: 40, damping: 20 });

  return (
    <section ref={ref} className="py-32 px-4 bg-primary relative overflow-hidden" aria-label="Traveler testimonials and reviews">
      {/* Scrolling background text */}
      <motion.div
        style={{ x: smoothBgX }}
        className="absolute top-8 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[120px] lg:text-[180px] font-display font-bold text-primary-foreground/[0.02] leading-none">
          TESTIMONIALS ★ REVIEWS ★ TESTIMONIALS
        </span>
      </motion.div>

      {/* Animated circles */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 border border-primary-foreground/5 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-96 h-96 border border-primary-foreground/[0.03] rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <ClipReveal>
            <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
              ── Testimonials
            </p>
          </ClipReveal>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground">
            <SplitTextReveal>What Our Travelers Say</SplitTextReveal>
          </h2>
        </div>

        <StaggerGrid className="grid md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <StaggerItem key={review.name}>
              <motion.div
                className="group relative bg-primary-foreground/[0.03] backdrop-blur-sm border border-primary-foreground/10 p-8 lg:p-10 hover:bg-primary-foreground/[0.06] transition-colors duration-500 cursor-default"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <motion.div
                    className="absolute -top-8 -right-8 w-16 h-16 bg-secondary rotate-45"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  />
                </div>

                <Quote className="w-12 h-12 text-secondary/15 mb-6" />

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + j * 0.08 }}
                    >
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-primary-foreground/70 font-body leading-[1.9] mb-8 text-[15px]">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-primary-foreground/10">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-secondary-foreground font-display font-bold">
                      {review.initial}
                    </span>
                  </motion.div>
                  <div>
                    <p className="text-primary-foreground font-body font-bold text-sm">
                      {review.name}
                    </p>
                    <p className="text-primary-foreground/35 font-body text-xs">
                      {review.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <a href="/reviews" className="inline-flex items-center gap-3 text-primary-foreground/40 font-body text-sm border border-primary-foreground/10 px-6 py-3 hover:border-secondary/50 hover:text-primary-foreground/60 transition-all duration-300">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-3 h-3 text-secondary fill-secondary" />
              ))}
            </div>
            <span>Rated 5/5 on Google Reviews</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
