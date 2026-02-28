import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Helmet } from "react-helmet-async";
import {
    FloatingParticles,
} from "@/components/animations/AnimationUtils";

const revealVariants = {
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

const scaleVariants = {
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { delay: i * 0.12, duration: 0.65, ease: "easeOut" },
    }),
    hidden: { filter: "blur(10px)", opacity: 0, scale: 0.97 },
};

const AboutPage = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Helmet>
                <title>About Us | Godka Tours</title>
                <meta name="description" content="Learn about Godka Tours' history, values, and our commitment to wildlife conservation in East Africa." />
            </Helmet>
            <div className="bg-background">
                {/* ── Hero Banner ── */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1600&auto=format&fit=crop"
                        alt="Godka Tours - About Us"
                        className="w-full h-full object-cover animate-ken-burns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
                    <FloatingParticles count={12} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <motion.p
                            className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            ── Our Story
                        </motion.p>
                        <motion.h1
                            className="text-white text-4xl md:text-6xl font-display font-semibold"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                        >
                            About Us
                        </motion.h1>
                    </div>
                </div>

                {/* ── About Section ── */}
                <section className="py-12 px-4 bg-[#f9f9f9]" ref={heroRef}>
                    <div className="max-w-6xl mx-auto">
                        <div className="relative">

                            {/* Top header bar */}
                            <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
                                <div className="flex items-center gap-2">
                                    <motion.span
                                        className="text-secondary text-lg"
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                                    >
                                        ✱
                                    </motion.span>
                                    <TimelineContent
                                        as="span"
                                        animationNum={0}
                                        timelineRef={heroRef}
                                        customVariants={revealVariants}
                                        className="text-sm font-body font-semibold text-gray-600 uppercase tracking-widest"
                                    >
                                        Who We Are
                                    </TimelineContent>
                                </div>

                                {/* Social icons */}
                                <div className="flex gap-3">
                                    {[
                                        { href: "https://facebook.com", label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                                        { href: "https://instagram.com", label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01" },
                                        { href: "https://twitter.com", label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                                    ].map(({ href, label, path }, i) => (
                                        <TimelineContent
                                            as="a"
                                            key={label}
                                            animationNum={i}
                                            timelineRef={heroRef}
                                            customVariants={revealVariants}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="md:w-8 md:h-8 w-6 h-6 border border-gray-200 bg-white rounded-lg flex items-center justify-center hover:border-secondary hover:bg-secondary/10 transition-colors"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-600">
                                                <path d={path} />
                                            </svg>
                                        </TimelineContent>
                                    ))}
                                </div>
                            </div>

                            {/* Hero image with SVG clip shape */}
                            <TimelineContent
                                as="figure"
                                animationNum={4}
                                timelineRef={heroRef}
                                customVariants={scaleVariants}
                                className="relative group"
                            >
                                <svg className="w-full" width="100%" height="100%" viewBox="0 0 100 40">
                                    <defs>
                                        <clipPath id="clip-inverted-about" clipPathUnits="objectBoundingBox">
                                            <path d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z" fill="#D9D9D9" />
                                        </clipPath>
                                    </defs>
                                    <image
                                        clipPath="url(#clip-inverted-about)"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        height="100%"
                                        href="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1400&auto=format&fit=crop"
                                    />
                                </svg>
                            </TimelineContent>

                            {/* Stats row */}
                            <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
                                <TimelineContent
                                    as="div"
                                    animationNum={5}
                                    timelineRef={heroRef}
                                    customVariants={revealVariants}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                                        <span className="text-secondary font-bold">15+</span>
                                        <span className="text-gray-600">years in East Africa</span>
                                        <span className="text-gray-300">|</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                                        <span className="text-secondary font-bold">5,000+</span>
                                        <span className="text-gray-600">happy trekkers</span>
                                    </div>
                                </TimelineContent>

                                <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
                                    <TimelineContent
                                        as="div"
                                        animationNum={6}
                                        timelineRef={heroRef}
                                        customVariants={revealVariants}
                                        className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2"
                                    >
                                        <span className="text-secondary font-semibold">100%</span>
                                        <span className="text-gray-600 uppercase">Permit<br />Success</span>
                                    </TimelineContent>
                                    <TimelineContent
                                        as="div"
                                        animationNum={7}
                                        timelineRef={heroRef}
                                        customVariants={revealVariants}
                                        className="flex items-center gap-2 mb-2 sm:text-base text-xs"
                                    >
                                        <span className="text-secondary font-bold">4.9★</span>
                                        <span className="text-gray-600">avg. traveller rating</span>
                                        <span className="text-gray-300 lg:hidden block">|</span>
                                    </TimelineContent>
                                </div>
                            </div>
                        </div>

                        {/* ── Main content columns ── */}
                        <div className="grid md:grid-cols-3 gap-8 mt-4">
                            <div className="md:col-span-2">
                                <h2 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-display font-semibold text-gray-900 mb-8">
                                    <VerticalCutReveal
                                        splitBy="words"
                                        staggerDuration={0.1}
                                        staggerFrom="first"
                                        reverse={true}
                                        transition={{
                                            type: "spring",
                                            stiffness: 250,
                                            damping: 30,
                                            delay: 0.6,
                                        }}
                                    >
                                        Connecting You With the Wild Heart of Africa.
                                    </VerticalCutReveal>
                                </h2>

                                <TimelineContent
                                    as="div"
                                    animationNum={9}
                                    timelineRef={heroRef}
                                    customVariants={revealVariants}
                                    className="grid md:grid-cols-2 gap-8 text-gray-600"
                                >
                                    <p className="leading-relaxed text-sm md:text-base text-justify font-body">
                                        Founded in Kampala, Godka Tours has spent over 15 years guiding travellers deep into the forests of Bwindi, the plains of Queen Elizabeth, and the misty peaks of the Rwenzori — crafting journeys that leave a lasting mark on every soul who joins us.
                                    </p>
                                    <p className="leading-relaxed text-sm md:text-base text-justify font-body">
                                        We believe travel should be transformative. Every gorilla permit we secure, every trail we lead, contributes directly to the conservation of Uganda's incredible biodiversity and the livelihoods of the communities that call these wild places home.
                                    </p>
                                </TimelineContent>
                            </div>

                            {/* Right column */}
                            <div className="md:col-span-1">
                                <div className="text-right">
                                    <TimelineContent
                                        as="div"
                                        animationNum={12}
                                        timelineRef={heroRef}
                                        customVariants={revealVariants}
                                        className="text-secondary text-2xl font-display font-bold mb-1"
                                    >
                                        GODKA TOURS
                                    </TimelineContent>
                                    <TimelineContent
                                        as="div"
                                        animationNum={13}
                                        timelineRef={heroRef}
                                        customVariants={revealVariants}
                                        className="text-gray-500 text-sm font-body mb-8"
                                    >
                                        Safari & Gorilla Trekking Specialists
                                    </TimelineContent>

                                    <TimelineContent
                                        as="div"
                                        animationNum={14}
                                        timelineRef={heroRef}
                                        customVariants={revealVariants}
                                        className="mb-6"
                                    >
                                        <p className="text-gray-900 font-body font-medium mb-4 text-sm">
                                            Ready to plan the adventure of a lifetime in East Africa?
                                        </p>
                                    </TimelineContent>

                                    <TimelineContent
                                        as="div"
                                        animationNum={15}
                                        timelineRef={heroRef}
                                        customVariants={revealVariants}
                                    >
                                        <Link
                                            to="/contact"
                                            className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 border border-primary/80 flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-primary-foreground px-5 py-3 rounded-sm cursor-pointer font-body font-bold text-sm uppercase tracking-wider items-center"
                                        >
                                            Let's Plan Your Trip <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </TimelineContent>
                                </div>
                            </div>
                        </div>

                        {/* ── Values strip ── */}
                        <div className="mt-20 grid sm:grid-cols-3 gap-8 border-t border-gray-200 pt-12">
                            {[
                                { num: "01", title: "Conservation First", body: "A portion of every tour fee goes directly to ranger training and community conservation projects around Bwindi." },
                                { num: "02", title: "Expert Local Guides", body: "All our guides are UWEC-certified Ugandans with decades of experience in the forests and national parks." },
                                { num: "03", title: "Tailored Adventures", body: "No two travellers are alike. We build every itinerary from scratch around your pace, interests, and budget." },
                            ].map(({ num, title, body }, i) => (
                                <TimelineContent
                                    key={num}
                                    as="div"
                                    animationNum={16 + i}
                                    timelineRef={heroRef}
                                    customVariants={revealVariants}
                                    className="flex flex-col gap-3"
                                >
                                    <span className="text-secondary font-display font-bold text-3xl">{num}</span>
                                    <h3 className="font-display font-bold text-gray-900 text-lg">{title}</h3>
                                    <p className="text-gray-500 font-body text-sm leading-relaxed">{body}</p>
                                </TimelineContent>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutPage;
