"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
    className,
    activeIndex,           // ← optional external scroll-driven index
    showControls = true,   // ← hide arrows when scroll-driven
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
    className?: string;
    activeIndex?: number;
    showControls?: boolean;
}) => {
    const [internalActive, setInternalActive] = useState(0);

    // Use external index if provided, else internal state
    const active = activeIndex !== undefined ? activeIndex : internalActive;

    const handleNext = () => setInternalActive((prev) => (prev + 1) % testimonials.length);
    const handlePrev = () => setInternalActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const isActive = (index: number) => index === active;

    useEffect(() => {
        if (autoplay && activeIndex === undefined) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay, activeIndex]);

    const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

    return (
        <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-12", className)}>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                {/* Image stack */}
                <div>
                    <div className="relative h-80 md:h-[420px] w-full" style={{ perspective: 1000 }}>
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.src}
                                animate={{
                                    opacity: isActive(index) ? 1 : index < active ? 0.7 : 0.5,
                                    scale: isActive(index) ? 1 : index < active ? 0.35 : 0.93,
                                    rotate: isActive(index) ? 0 : index < active ? -15 : randomRotateY(),
                                    zIndex: isActive(index) ? 999 : index < active ? 998 - index : testimonials.length + 2 - index,
                                    x: isActive(index) ? 0 : index < active ? "-100%" : 0,
                                    y: isActive(index) ? [0, -60, 0] : index < active ? "-70%" : 0,
                                    filter: isActive(index) ? "brightness(1)" : index < active ? "brightness(0.85)" : "brightness(0.7)",
                                    
                                }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 origin-bottom-right"
                            >
                                <img
                                    src={testimonial.src}
                                    alt={testimonial.name}
                                    draggable={false}
                                    className="h-full w-full rounded-3xl object-cover object-center"
                                />
                            </motion.div>
                        ))}

                        {/* Dot indicators */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                            {testimonials.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        width: isActive(i) ? 24 : 8,
                                        backgroundColor: isActive(i) ? "hsl(38 75% 55%)" : "hsl(38 75% 55% / 0.3)",
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="h-2 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Text content */}
                <div className="flex justify-between flex-col py-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Quote mark */}
                            <div className="text-secondary text-6xl font-display leading-none mb-4 opacity-40">"</div>

                            <h3 className="text-2xl font-bold text-foreground font-display">
                                {testimonials[active].name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-body mb-6">
                                {testimonials[active].designation}
                            </p>

                            <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
                                {testimonials[active].quote.split(" ").map((word, index) => (
                                    <motion.span
                                        key={`${active}-${index}`}
                                        initial={{ filter: "blur(8px)", opacity: 0, y: 5 }}
                                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, ease: "easeOut", delay: 0.02 * index }}
                                        className="inline-block"
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls — only shown when not scroll-driven */}
                    {showControls && (
                        <div className="flex gap-4 pt-12 md:pt-0">
                            <button
                                onClick={handlePrev}
                                aria-label="Previous testimonial"
                                className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button hover:scale-110 transition-transform"
                            >
                                <IconArrowLeft className="h-5 w-5 text-secondary-foreground group-hover/button:rotate-12 transition-transform duration-300" />
                            </button>
                            <button
                                onClick={handleNext}
                                aria-label="Next testimonial"
                                className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button hover:scale-110 transition-transform"
                            >
                                <IconArrowRight className="h-5 w-5 text-secondary-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
                            </button>
                        </div>
                    )}

                    {/* Scroll hint when scroll-driven */}
                    {!showControls && (
                        <motion.p
                            className="text-xs font-body text-muted-foreground/50 uppercase tracking-widest mt-8"
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            ↓ Keep scrolling
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
};
