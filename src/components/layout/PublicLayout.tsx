import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import TopBar from "@/components/TopBar";
import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import {
    ScrollProgress,
    CustomCursor,
    BackToTop,
} from "@/components/animations/AnimationUtils";
import StickyCtaBar from "@/components/StickyCtaBar";

const PublicLayout = () => {
    const { pathname } = useLocation();
    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoResize: true,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        };

        rafIdRef.current = requestAnimationFrame(raf);

        const resizeObserver = new ResizeObserver(() => {
            lenis.resize();
        });
        resizeObserver.observe(document.body);

        const handleLoad = () => lenis.resize();
        window.addEventListener("load", handleLoad);

        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
            window.removeEventListener("load", handleLoad);
            resizeObserver.disconnect();
            lenis.destroy();
            lenisRef.current = null;
            rafIdRef.current = null;
        };
    }, []);

    // Reset scroll on route change without re-creating the Lenis loop
    useEffect(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
    }, [pathname]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Skip to content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-secondary focus:text-secondary-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
            >
                Skip to main content
            </a>

            {/* Global UI overlays */}
            <ScrollProgress />
            <CustomCursor />
            <BackToTop />
            <StickyCtaBar />

            <header>
                <TopBar />
                <HeaderBar />
                <Navbar />
            </header>

            <main id="main-content" className="flex-1">
                <AnimatePresence mode="wait">
                    <Outlet key={pathname} />
                </AnimatePresence>
            </main>

            <FooterSection />
        </div>
    );
};

export default PublicLayout;
