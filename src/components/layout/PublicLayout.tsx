import { useEffect } from "react";
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

const PublicLayout = () => {
    const { pathname } = useLocation();

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
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Reset scroll on route change
        lenis.scrollTo(0, { immediate: true });

        return () => {
            lenis.destroy();
        };
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
