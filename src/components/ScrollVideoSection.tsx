import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 192;
const PRIORITY_FRAMES = 20;

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(-1);
  const [ready] = useState(true);

  const images = useMemo(() => {
    return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const frameIndex = (i + 1).toString().padStart(3, "0");
      return `/videos/squence/ezgif-frame-${frameIndex}.jpg`;
    });
  }, []);

  const preloadedImages = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ultra-smooth spring: low stiffness + high damping = buttery cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 40,
    restDelta: 0.0001,
    mass: 1.5,
  });

  

  const textOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.4, 0.5], [0, 1, 1, 0]);

  const render = useCallback((index: number) => {
    // Skip if same frame — avoids redundant draws
    if (index === lastFrameRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const img = preloadedImages.current[index];
    if (!img || !img.complete) return;

    lastFrameRef.current = index;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const dpr = window.devicePixelRatio || 1;
      // Cap DPR at 2 for mobile performance
      const cappedDpr = Math.min(dpr, 2);

      const displayW = canvas.width / cappedDpr;
      const displayH = canvas.height / cappedDpr;
      const canvasAR = displayW / displayH;
      const imgAR = img.width / img.height;

      let drawW: number, drawH: number, offX: number, offY: number;
      if (canvasAR > imgAR) {
        drawW = displayW;
        drawH = displayW / imgAR;
        offX = 0;
        offY = (displayH - drawH) / 2;
      } else {
        drawW = displayH * imgAR;
        drawH = displayH;
        offX = (displayW - drawW) / 2;
        offY = 0;
      }

      context.save();
      context.scale(cappedDpr, cappedDpr);
      context.drawImage(img, offX, offY, drawW, drawH);
      context.restore();
    });
  }, []);

  useEffect(() => {
    let loaded = 0;
    let cancelled = false;

    const loadImage = (index: number): Promise<void> =>
      new Promise((resolve) => {
        if (cancelled) { resolve(); return; }
        const img = new Image();
        img.decoding = "async";
        img.src = images[index];
        img.onload = img.onerror = () => {
          preloadedImages.current[index] = img;
          loaded++;
          resolve();
        };
      });

    const preload = async () => {
      // Priority: first N frames for instant usability
      const priorityPromises = images.slice(0, PRIORITY_FRAMES).map((_, i) => loadImage(i));
      await Promise.all(priorityPromises);
      if (cancelled) return;

      // Load remainder in small batches to avoid overwhelming the network
      const batchSize = 10;
      for (let i = PRIORITY_FRAMES; i < TOTAL_FRAMES; i += batchSize) {
        if (cancelled) return;
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }
    };

    preload();
    return () => { cancelled = true; };
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      lastFrameRef.current = -1; // force redraw after resize
      render(Math.min(TOTAL_FRAMES - 1, Math.floor(smoothProgress.get() * TOTAL_FRAMES)));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const firstImg = preloadedImages.current[0];
    if (firstImg?.complete) render(0);

    const unsubscribe = smoothProgress.on("change", (progress) => {
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
      render(frameIndex);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [smoothProgress, render]);

  const containerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <motion.div
          style={{ opacity: containerOpacity }}
          className="w-full h-full will-change-transform"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ willChange: "contents" }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none will-change-opacity"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg select-none tracking-wide">
            Discover Uganda
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollVideoSection;
