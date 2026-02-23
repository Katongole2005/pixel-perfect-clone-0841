import { useRef, useEffect, useMemo } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = 192;
  
  // Create an array of image paths
  const images = useMemo(() => {
    return Array.from({ length: totalFrames }, (_, i) => {
      const frameIndex = (i + 1).toString().padStart(3, '0');
      return `/videos/squence/ezgif-frame-${frameIndex}.jpg`;
    });
  }, []);

  const preloadedImages = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Preload images
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      preloadedImages.current[index] = img;
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const render = (index: number) => {
      const img = preloadedImages.current[index];
      if (img && img.complete) {
        // Clear canvas and draw new frame
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Handle object-cover behavior manually on canvas
        const canvasAspectRatio = canvas.width / canvas.height;
        const imgAspectRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasAspectRatio > imgAspectRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspectRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspectRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }
        
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Initial render
    const img = new Image();
    img.src = images[0];
    img.onload = () => render(0);

    const unsubscribe = smoothProgress.on("change", (progress) => {
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(progress * totalFrames)
      );
      render(frameIndex);
    });

    // Resize handler to keep canvas full screen
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render(Math.min(totalFrames - 1, Math.floor(smoothProgress.get() * totalFrames)));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, smoothProgress]);

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ opacity }} className="w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollVideoSection;
