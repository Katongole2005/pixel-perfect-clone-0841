import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mountain, Clock, Users, Star, Shield, Camera } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import {
    SplitTextReveal,
    ClipReveal,
    StaggerGrid,
    StaggerItem,
    FloatingParticles,
    GlowCard,
    LineDraw,
} from "@/components/animations/AnimationUtils";

/* ─── Gorilla trekking tour testimonials ─── */
const testimonials = [
    {
        quote:
            "Tracking the silverback through the misty jungle was the most breathtaking experience of my life. The guides were incredibly knowledgeable and kept us safe the entire time.",
        name: "Emma Hartley",
        designation: "Wildlife Photographer, UK",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop",
    },
    {
        quote:
            "We spent an unforgettable hour with a gorilla family in Bwindi. Watching the baby gorillas play while the silverback rested just meters away — pure magic.",
        name: "Carlos Mendez",
        designation: "Conservation Biologist, Spain",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    },
    {
        quote:
            "The whole experience from permit booking to the trek itself was flawlessly organized by Fresh Tracks Africa. Our ranger guide knew every gorilla by name!",
        name: "Yuki Tanaka",
        designation: "Travel Blogger, Japan",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    },
    {
        quote:
            "A once-in-a-lifetime encounter. Trekking through the forest, hearing the gorillas before you see them, then locking eyes with a gentle giant — I was moved to tears.",
        name: "Amara Osei",
        designation: "Eco-Tourism Advocate, Ghana",
        src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    },
    {
        quote:
            "The permits were handled smoothly, the accommodation was excellent, and our guide was exceptional. Easily the highlight of my East Africa trip.",
        name: "David Thornton",
        designation: "Adventure Traveller, Australia",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
];

/* ─── Why Trek Cards ─── */
const features = [
    {
        icon: Mountain,
        title: "World's Best Habitat",
        desc: "Bwindi Impenetrable Forest shelters nearly half of all remaining mountain gorillas on Earth.",
    },
    {
        icon: Clock,
        title: "Hour with the Giants",
        desc: "Each permit grants you one full, intimate hour with a habituated gorilla family.",
    },
    {
        icon: Users,
        title: "Expert Rangers",
        desc: "Uganda Wildlife Authority rangers lead every trek, ensuring safety and conservation.",
    },
    {
        icon: Star,
        title: "Bucket-List Moment",
        desc: "Consistently ranked among the top wildlife experiences in the world by National Geographic.",
    },
    {
        icon: Shield,
        title: "Conservation Impact",
        desc: "Permit fees directly fund gorilla conservation and support local communities.",
    },
    {
        icon: Camera,
        title: "Photography Heaven",
        desc: "Encounter gorillas in stunning forest light — perfect for wildlife photography.",
    },
];

/* ─── Package Cards ─── */
const packages = [
    {
        title: "1-Day Express Trek",
        duration: "1 Day",
        price: "From $800",
        description: "A focused gorilla trekking experience in Bwindi. Ideal for tight schedules — permit, ranger, and park fees included.",
        highlights: ["Gorilla permit included", "Expert ranger guide", "Park entry fees", "Packed lunch"],
        img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "3-Day Bwindi Safari",
        duration: "3 Days / 2 Nights",
        price: "From $1,850",
        description: "Gorilla trekking combined with scenic forest walks, birdwatching, and community village tours.",
        highlights: ["Gorilla permit included", "Lodge accommodation", "Forest nature walk", "Village cultural tour"],
        img: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "7-Day Ultimate Uganda",
        duration: "7 Days / 6 Nights",
        price: "From $3,500",
        description: "The complete Uganda experience — gorilla trekking, Queen Elizabeth NP wildlife drives, and Lake Bunyonyi.",
        highlights: ["Gorilla permit included", "Big Five game drives", "Chimpanzee tracking", "Lake Bunyonyi cruise"],
        img: "https://images.unsplash.com/photo-1504173010664-32509107de5d?q=80&w=800&auto=format&fit=crop",
    },
];

const GorillaTrekkingPage = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    // ── Scroll-driven testimonials ──
    const testimonialsScrollRef = useRef<HTMLDivElement>(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const { scrollYProgress: testimonialProgress } = useScroll({
        target: testimonialsScrollRef,
        offset: ["start start", "end end"],
    });
    useMotionValueEvent(testimonialProgress, "change", (v) => {
        // Map 0→1 scroll progress across (n-1) steps
        const idx = Math.min(
            testimonials.length - 1,
            Math.floor(v * testimonials.length)
        );
        setActiveTestimonial(idx);
    });

    return (
        <>
            <Helmet>
                <title>Gorilla Trekking Packages | Fresh Tracks Africa</title>
                <meta name="description" content="Experience thrilling gorilla trekking in Uganda and Rwanda. Book an unforgettable wildlife encounter with Fresh Tracks Africa." />
                <link rel="canonical" href="https://pixel-perfect-clone-0841.lovable.app/gorilla-trekking" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pixel-perfect-clone-0841.lovable.app/gorilla-trekking" />
                <meta property="og:title" content="Gorilla Trekking Packages | Fresh Tracks Africa" />
                <meta property="og:description" content="Experience thrilling gorilla trekking in Uganda and Rwanda. Unforgettable wildlife encounters." />
                <meta property="og:site_name" content="Fresh Tracks Africa Tours & Travel" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "TouristTrip",
                    "name": "Gorilla Trekking in Uganda & Rwanda",
                    "description": "Trek through Bwindi Impenetrable Forest to meet endangered mountain gorillas in their natural habitat.",
                    "touristType": "Wildlife Safari",
                    "provider": { "@type": "TravelAgency", "name": "Fresh Tracks Africa Tours & Travel Ltd.", "url": "https://pixel-perfect-clone-0841.lovable.app" }
                })}</script>
            </Helmet>
            <div className="bg-background">
                {/* ── Hero ── */}
                <div ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
                    <motion.div style={{ y: heroY }} className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop"
                            alt="Mountain gorilla in Bwindi Impenetrable Forest Uganda"
                            className="w-full h-full object-cover animate-ken-burns"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
                    <FloatingParticles count={25} />

                    {/* Corner accents */}
                    <motion.div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-secondary/30"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                    <motion.div className="absolute bottom-28 right-10 w-20 h-20 border-r-2 border-b-2 border-secondary/30"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.8 }} />

                    <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <motion.p
                            className="text-secondary text-xs md:text-sm font-body font-bold uppercase tracking-[0.4em] mb-5"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
                        >
                            Uganda & Rwanda
                        </motion.p>
                        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-display font-semibold leading-tight mb-5">
                            <SplitTextReveal delay={0.5}>Gorilla Trekking</SplitTextReveal>
                            <br />
                            <span className="italic text-3xl sm:text-4xl md:text-5xl text-white/70">
                                <SplitTextReveal delay={0.9}>in the Wild</SplitTextReveal>
                            </span>
                        </h1>
                        <ClipReveal delay={1.2}>
                            <p className="text-white/60 font-body text-base md:text-lg max-w-lg">
                                Come face-to-face with the world's last mountain gorillas in their misty forest home
                            </p>
                        </ClipReveal>

                        <motion.div className="flex flex-wrap gap-4 mt-10 justify-center"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6 }}>
                            <a href="#packages"
                                className="group relative inline-flex items-center gap-2 px-10 py-4 text-sm font-body font-bold uppercase tracking-widest overflow-hidden">
                                <span className="absolute inset-0 bg-secondary animate-pulse-glow" />
                                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <span className="relative text-secondary-foreground group-hover:text-primary transition-colors duration-500">
                                    View Packages
                                </span>
                            </a>
                            <a href="#contact"
                                className="inline-flex items-center gap-2 px-10 py-4 text-sm font-body font-bold uppercase tracking-widest border-2 border-white/30 text-white hover:border-secondary hover:text-secondary transition-all duration-300">
                                Book a Trek
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                        <motion.div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
                            <motion.div className="w-1.5 h-1.5 rounded-full bg-secondary"
                                animate={{ y: [0, 16, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── Why Trek Section ── */}
                <section className="py-24 px-4 bg-background">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <ClipReveal>
                                <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4">── Why Go</p>
                            </ClipReveal>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                                <SplitTextReveal>A Wildlife Encounter</SplitTextReveal>
                                <br />
                                <span className="italic text-foreground/60">
                                    <SplitTextReveal delay={0.3}>Like No Other</SplitTextReveal>
                                </span>
                            </h2>
                            <LineDraw className="h-px w-24 bg-secondary mx-auto mt-8" delay={0.4} />
                        </div>

                        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((f) => (
                                <StaggerItem key={f.title}>
                                    <GlowCard className="p-8 border border-border bg-card h-full">
                                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                                            <f.icon className="w-5 h-5 text-secondary" />
                                        </div>
                                        <h3 className="text-lg font-display font-bold text-foreground mb-3">{f.title}</h3>
                                        <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.desc}</p>
                                    </GlowCard>
                                </StaggerItem>
                            ))}
                        </StaggerGrid>
                    </div>
                </section>

                {/* ── Packages ── */}
                <section id="packages" className="py-24 px-4 bg-muted">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <ClipReveal>
                                <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4">── Our Packages</p>
                            </ClipReveal>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                                <SplitTextReveal>Choose Your</SplitTextReveal>
                                {" "}
                                <span className="italic">
                                    <SplitTextReveal delay={0.3}>Adventure</SplitTextReveal>
                                </span>
                            </h2>
                        </div>

                        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {packages.map((pkg, i) => (
                                <StaggerItem key={pkg.title}>
                                    <GlowCard className="bg-card border border-border overflow-hidden group h-full flex flex-col">
                                        <div className="relative h-56 overflow-hidden">
                                            <img src={pkg.img} alt={pkg.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-secondary text-secondary-foreground px-3 py-1 text-xs font-body font-bold uppercase tracking-wider">
                                                    {pkg.duration}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-xl font-display font-bold text-foreground mb-2">{pkg.title}</h3>
                                            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5">{pkg.description}</p>
                                            <ul className="space-y-2 mb-6 flex-1">
                                                {pkg.highlights.map((h) => (
                                                    <li key={h} className="flex items-center gap-2 text-sm font-body text-foreground/70">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                                <span className="text-lg font-display font-bold text-foreground">{pkg.price}</span>
                                                <a href="#contact"
                                                    className="group/btn flex items-center gap-1 text-secondary font-body font-bold text-sm hover:gap-2 transition-all">
                                                    Book Now
                                                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    </GlowCard>
                                </StaggerItem>
                            ))}
                        </StaggerGrid>
                    </div>
                </section>

                {/* ── Traveller Stories — scroll-driven ── */}
                {/* Outer tall container: each testimonial gets 100vh of scroll room */}
                <div
                    ref={testimonialsScrollRef}
                    style={{ height: `${testimonials.length * 100}vh` }}
                    className="relative"
                >
                    {/* Sticky panel that stays in view while user scrolls through */}
                    <div className="sticky top-0 h-screen flex flex-col justify-center bg-background overflow-hidden">
                        {/* Section heading */}
                        <div className="text-center pt-10 pb-2">
                            <ClipReveal>
                                <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-3">── Traveller Stories</p>
                            </ClipReveal>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                                <SplitTextReveal>What Our Trekkers Say</SplitTextReveal>
                            </h2>
                        </div>

                        {/* Testimonial component driven by scroll */}
                        <AnimatedTestimonials
                            testimonials={testimonials}
                            activeIndex={activeTestimonial}
                            showControls={false}
                        />

                        {/* Scroll progress dots */}
                        <div className="flex justify-center gap-2 pb-8">
                            {testimonials.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        width: i === activeTestimonial ? 24 : 8,
                                        backgroundColor: i === activeTestimonial
                                            ? "hsl(38 75% 55%)"
                                            : "hsl(38 75% 55% / 0.25)",
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="h-2 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── CTA / Contact ── */}
                <section id="contact" className="py-24 px-4 bg-primary relative overflow-hidden">
                    <FloatingParticles count={15} />
                    <div className="max-w-2xl mx-auto text-center relative">
                        <ClipReveal>
                            <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">── Book Your Trek</p>
                        </ClipReveal>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                            <SplitTextReveal>Ready to Meet the Gorillas?</SplitTextReveal>
                        </h2>
                        <ClipReveal delay={0.3}>
                            <p className="text-primary-foreground/50 font-body text-base mb-10 leading-relaxed">
                                Gorilla permits are limited. Contact us today to secure yours and start planning the adventure of a lifetime.
                            </p>
                        </ClipReveal>
                        <motion.a
                            href="mailto:info@freshtracksafrica.com"
                            className="group relative inline-flex items-center gap-3 px-12 py-5 overflow-hidden"
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                        >
                            <span className="absolute inset-0 bg-secondary animate-pulse-glow" />
                            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative text-secondary-foreground group-hover:text-primary font-body font-bold uppercase tracking-widest text-sm transition-colors duration-500">
                                Contact Us Now
                            </span>
                        </motion.a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default GorillaTrekkingPage;
