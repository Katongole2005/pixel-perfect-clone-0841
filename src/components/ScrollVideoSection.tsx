import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 192;
const PRIORITY_FRAMES = 20;

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  const loadProgress = (loadedCount / TOTAL_FRAMES) * 100;

  // Text overlay opacity: fade in 0.1-0.2, fade out 0.4-0.5
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.4, 0.5], [0, 1, 1, 0]);

  const render = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = preloadedImages.current[index];
    if (!img || !img.complete) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const dpr = window.devicePixelRatio || 1;
      context.clearRect(0, 0, canvas.width, canvas.height);

      const displayW = canvas.width / dpr;
      const displayH = canvas.height / dpr;
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
      context.scale(dpr, dpr);
      context.drawImage(img, offX, offY, drawW, drawH);
      context.restore();
    });
  }, []);

  useEffect(() => {
    let loaded = 0;

    const loadImage = (index: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = images[index];
        img.onload = img.onerror = () => {
          preloadedImages.current[index] = img;
          loaded++;
          setLoadedCount(loaded);
          if (loaded >= TOTAL_FRAMES * 0.8) setReady(true);
          resolve();
        };
      });

    const preload = async () => {
      // Priority: first N frames
      const priorityPromises = images.slice(0, PRIORITY_FRAMES).map((_, i) => loadImage(i));
      await Promise.all(priorityPromises);

      // Remainder in background
      const rest = images.slice(PRIORITY_FRAMES).map((_, i) => loadImage(i + PRIORITY_FRAMES));
      await Promise.all(rest);
    };

    preload();
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      render(Math.min(TOTAL_FRAMES - 1, Math.floor(smoothProgress.get() * TOTAL_FRAMES)));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Initial render
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
        {/* Loading overlay */}
        {!ready && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background">
            <p className="text-foreground/70 text-sm font-medium mb-3">
              Loading experience… {Math.round(loadProgress)}%
            </p>
            <div className="w-48 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-200 rounded-full"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        <motion.div style={{ opacity: containerOpacity }} className="w-full h-full">
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>

        {/* Text overlay */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
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
