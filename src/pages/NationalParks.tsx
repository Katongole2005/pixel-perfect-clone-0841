import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, ChevronDown, Trees, Mountain, Waves, Bird, Star, Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { ShaderBackground } from "@/components/ui/background-paper-shaders";
import {
    FloatingParticles,
} from "@/components/animations/AnimationUtils";

/* ─── Data ─── */
interface Park {
    id: string;
    name: string;
    country: "Uganda" | "Rwanda";
    flag: string;
    tagline: string;
    description: string;
    highlights: string[];
    image: string;
    icon: React.ElementType;
    featured?: boolean;
    acreage?: string;
}

const parks: Park[] = [
    {
        id: "bwindi",
        name: "Bwindi Impenetrable Forest",
        country: "Uganda",
        flag: "🇺🇬",
        tagline: "Home of the Mountain Gorilla",
        description: "A UNESCO World Heritage Site sheltering almost half the world's remaining mountain gorillas. Beyond gorilla trekking, Batwa cultural encounters, ancient forest birding and hidden waterfalls await.",
        highlights: ["Gorilla Trekking", "Batwa Culture", "Birding", "Waterfalls"],
        image: "https://images.unsplash.com/photo-1605552689397-4f77da9c6ca2?q=80&w=1600&auto=format&fit=crop",
        icon: Trees,
        acreage: "331 km²",
        featured: true,
    },
    {
        id: "queen-elizabeth",
        name: "Queen Elizabeth NP",
        country: "Uganda",
        flag: "🇺🇬",
        tagline: "Lions in the Fig Trees",
        description: "Uganda's most diverse park. The only place on earth where lions pride-rest in fig trees. Add Kazinga Channel boat safaris, crater lake drives and vast hippo pools.",
        highlights: ["Tree-Climbing Lions", "Boat Safaris", "Crater Lakes", "Hippos"],
        image: "https://images.unsplash.com/photo-1535913397952-7b5af097f7c4?q=80&w=1600&auto=format&fit=crop",
        icon: Star,
        acreage: "1,978 km²",
        featured: true,
    },
    {
        id: "kibale",
        name: "Kibale Forest NP",
        country: "Uganda",
        flag: "🇺🇬",
        tagline: "Primate Capital of the World",
        description: "13 primate species, the world's highest density. Habituated chimpanzees, guided night walks and 375 bird species in a lush equatorial rainforest.",
        highlights: ["Chimp Trekking", "Night Walks", "13 Primate Species", "Birding"],
        image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1600&auto=format&fit=crop",
        icon: Trees,
        acreage: "766 km²",
    },
    {
        id: "murchison-falls",
        name: "Murchison Falls NP",
        country: "Uganda",
        flag: "🇺🇬",
        tagline: "Where the Nile Explodes Through Rock",
        description: "Uganda's largest protected area. The Nile squeezes through a 7-metre gorge in a thunderous spectacle. Vast elephant herds, Rothschild giraffes and the elusive shoebill stork.",
        highlights: ["Murchison Falls", "Nile Cruises", "Elephants", "Shoebill Stork"],
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1600&auto=format&fit=crop",
        icon: Waves,
        acreage: "3,840 km²",
    },
    {
        id: "lake-mburo",
        name: "Lake Mburo NP",
        country: "Uganda",
        flag: "🇺🇬",
        tagline: "Uganda's Only Zebra Park",
        description: "Closest park to Kampala. Zebras and impala roam freely. Bush walks, horseback safaris and boat trips offer rare, intimate wildlife encounters without the crowds.",
        highlights: ["Zebras & Impala", "Horseback Safaris", "Bush Walks", "Boat Trips"],
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop",
        icon: Mountain,
        acreage: "370 km²",
    },
    {
        id: "mgahinga",
        name: "Mgahinga Gorilla NP",
        country: "Uganda",
        flag: "🇺🇬",
        tagline: "Gorillas & Virunga Volcanoes",
        description: "At the tri-border of Uganda, Rwanda and DRC. Gorilla trekking, golden monkey tracking and volcano hikes in the spectacular Virunga range.",
        highlights: ["Gorilla Trekking", "Golden Monkeys", "Volcano Hikes", "Batwa Trail"],
        image: "https://images.unsplash.com/photo-1504618223053-559bdef9ad5b?q=80&w=1600&auto=format&fit=crop",
        icon: Mountain,
        acreage: "33.7 km²",
    },
    {
        id: "rwenzori",
        name: "Rwenzori Mountains NP",
        country: "Uganda",
        flag: "🇺🇬",
        tagline: "The Mountains of the Moon",
        description: "Africa's highest range after Kilimanjaro. Snow-capped equatorial peaks, glaciers and unique afro-alpine flora — giant lobelias and heathers draped in mist.",
        highlights: ["Snow-Capped Peaks", "Glaciers", "Alpine Flora", "Multi-Day Treks"],
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1600&auto=format&fit=crop",
        icon: Mountain,
        acreage: "996 km²",
    },
    {
        id: "volcanoes",
        name: "Volcanoes NP",
        country: "Rwanda",
        flag: "🇷🇼",
        tagline: "The Legacy of Dian Fossey",
        description: "Rwanda's iconic gorilla trekking destination. Where Dian Fossey gave her life for the gorillas. Add golden monkey tracking and the dramatic Virunga backdrop.",
        highlights: ["Gorilla Trekking", "Dian Fossey Tomb", "Golden Monkeys", "Twin Lakes"],
        image: "https://images.unsplash.com/photo-1518169206888-6d80c545f9e2?q=80&w=1600&auto=format&fit=crop",
        icon: Mountain,
        acreage: "160 km²",
        featured: true,
    },
    {
        id: "akagera",
        name: "Akagera NP",
        country: "Rwanda",
        flag: "🇷🇼",
        tagline: "Rwanda's Big Five Safari",
        description: "Rwanda's only savannah park. Reintroduced lions and rhinos complete the Big Five. Classic East Africa safari set against lakes, papyrus swamps and rolling savannah.",
        highlights: ["Big Five", "Lions & Rhinos", "Lake Safaris", "Birding"],
        image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1600&auto=format&fit=crop",
        icon: Star,
        acreage: "1,122 km²",
    },
    {
        id: "nyungwe",
        name: "Nyungwe Forest NP",
        country: "Rwanda",
        flag: "🇷🇼",
        tagline: "Africa's Water Tower",
        description: "One of Africa's oldest montane rainforests and source of the Nile's most remote headwaters. Famous canopy walk, chimpanzees and 13 primate species.",
        highlights: ["Canopy Walk", "Chimp Tracking", "Source of the Nile", "13 Primates"],
        image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=1600&auto=format&fit=crop",
        icon: Bird,
        acreage: "1,019 km²",
    },
];

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, step);
        return () => clearInterval(timer);
    }, [inView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ park, onClick }: { park: Park; onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
        >
            <img
                src={park.image}
                alt={park.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-white via-transparent to-transparent" />

            {/* Country pill */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-white text-xs font-body font-semibold" style={{ transform: "translateZ(20px)" }}>
                <span>{park.flag}</span>
                <span>{park.country}</span>
            </div>
            {park.featured && (
                <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-[10px] font-body font-bold uppercase tracking-wider" style={{ transform: "translateZ(20px)" }}>
                    Featured
                </div>
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5" style={{ transform: "translateZ(30px)" }}>
                <p className="text-secondary text-[10px] font-body font-bold uppercase tracking-[0.2em] mb-1">{park.tagline}</p>
                <h3 className="text-white font-display font-bold text-lg leading-tight mb-2">{park.name}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {park.highlights.slice(0, 3).map((h) => (
                        <span key={h} className="text-[10px] bg-white/15 backdrop-blur-sm border border-white/20 text-white rounded-full px-2.5 py-0.5 font-body">
                            {h}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs font-body flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{park.acreage}
                    </span>
                    <span className="text-secondary text-xs font-body font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Park Detail Modal ─── */
function ParkModal({ park, onClose }: { park: Park | null; onClose: () => void }) {
    return (
        <AnimatePresence>
            {park && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <motion.div
                        className="relative bg-card rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
                        initial={{ y: 80, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 80, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img src={park.image} alt={park.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                ✕
                            </button>
                            <div className="absolute bottom-4 left-5">
                                <span className="text-2xl">{park.flag}</span>
                                <h2 className="text-white font-display font-bold text-2xl mt-1">{park.name}</h2>
                                <p className="text-secondary text-xs font-body font-bold uppercase tracking-wider">{park.tagline}</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5">{park.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {park.highlights.map((h) => (
                                    <span key={h} className="bg-secondary/15 text-secondary border border-secondary/30 rounded-full px-3 py-1 text-xs font-body font-semibold">{h}</span>
                                ))}
                            </div>
                            <Link to="/contact" className="group flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground font-body font-bold rounded-xl hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300">
                                Plan My Trip to {park.name.split(" ")[0]}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ─── Marquee Ticker ─── */
function ParkMarquee() {
    const items = parks.flatMap((p) => [`${p.flag} ${p.name}`, "·"]);
    return (
        <div className="overflow-hidden py-4 bg-secondary/10 border-y border-secondary/20">
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                {[...items, ...items].map((item, i) => (
                    <span key={i} className={`text-sm font-body font-bold shrink-0 ${item === "·" ? "text-secondary" : "text-foreground/60"}`}>
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

/* ─── Main Page ─── */
const NationalParksPage = () => {
    const [filter, setFilter] = useState<"All" | "Uganda" | "Rwanda">("All");
    const [selectedPark, setSelectedPark] = useState<Park | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    const filtered = filter === "All" ? parks : parks.filter((p) => p.country === filter);

    const stats = [
        { value: 10, suffix: "", label: "National Parks" },
        { value: 2, suffix: "", label: "Countries" },
        { value: 1000, suffix: "+", label: "Wildlife Species" },
        { value: 50, suffix: "%", label: "World's Gorillas" },
    ];

    return (
        <>
            <Helmet>
                <title>National Parks & Attractions | Godka Tours</title>
                <meta name="description" content="Discover the magnificent national parks and attractions of Uganda and Rwanda." />
            </Helmet>
            <div className="bg-background">
                <ParkModal park={selectedPark} onClose={() => setSelectedPark(null)} />
                {/* ══════════════════════════════════════════════
            HERO — Full-screen parallax with live shader
        ══════════════════════════════════════════════ */}
                <div ref={heroRef} className="relative h-screen min-h-[680px] overflow-hidden">
                    {/* Parallax image */}
                    <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
                        <img
                            src="https://images.unsplash.com/photo-1551085254-e96b210db58a?q=80&w=2000&auto=format&fit=crop"
                            alt="Uganda National Parks"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Gradient layers */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                    <FloatingParticles count={14} />

                    {/* Hero text */}
                    <motion.div
                        className="absolute inset-0 flex flex-col justify-end pb-20 px-6 md:px-16 max-w-7xl"
                        style={{ opacity: heroOpacity }}
                    >
                        <motion.p
                            className="text-secondary text-xs font-body font-bold uppercase tracking-[0.5em] mb-5"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            ── Uganda & Rwanda · 10 Parks
                        </motion.p>

                        <div className="overflow-hidden mb-4">
                            <motion.h1
                                className="font-display font-bold text-white leading-none"
                                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                            >
                                National Parks
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden mb-8">
                            <motion.h2
                                className="font-display font-bold text-secondary leading-none"
                                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                            >
                                of East Africa.
                            </motion.h2>
                        </div>

                        <motion.p
                            className="text-white/60 font-body text-base md:text-lg max-w-lg leading-relaxed mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            Gorillas, lions, Nile cruises, snow-capped peaks at the equator — Africa's wildest
                            corners, curated for once-in-a-lifetime adventures.
                        </motion.p>

                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                        >
                            <Link
                                to="/contact"
                                className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-body font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 text-sm"
                            >
                                Plan My Safari
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={() => document.getElementById("parks-grid")?.scrollIntoView({ behavior: "smooth" })}
                                className="inline-flex items-center gap-2 text-white/70 font-body font-semibold text-sm hover:text-white transition-colors"
                            >
                                View All Parks
                                <ChevronDown className="w-4 h-4 animate-bounce" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <span className="text-[10px] font-body uppercase tracking-widest rotate-90 origin-center mb-6">Scroll</span>
                        <div className="w-px h-16 bg-white/20 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-white"
                                animate={{ y: ["0%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                style={{ height: "40%" }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* ══════════ MARQUEE TICKER ══════════ */}
                <ParkMarquee />

                {/* ══════════════════════════════════════
            STATS — Animated counters
        ══════════════════════════════════════ */}
                <section className="py-16 px-6 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <ShaderBackground colors={["#0d1a30", "#1a2a4a", "#c26820", "#d4922e"]} speed={0.3} />
                    </div>
                    <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map(({ value, suffix, label }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                            >
                                <p className="text-4xl md:text-5xl font-display font-bold text-secondary tabular-nums">
                                    <AnimatedCounter target={value} suffix={suffix} />
                                </p>
                                <p className="text-primary-foreground/50 font-body text-xs uppercase tracking-widest mt-2">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
            FEATURED — Magazine-style asymmetric layout
        ══════════════════════════════════════════════════ */}
                <section className="py-24 px-6 bg-background">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="flex items-end justify-between mb-14 gap-4 flex-wrap"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div>
                                <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-3">── Editor's Picks</p>
                                <h2 className="font-display font-bold text-foreground text-4xl md:text-5xl leading-tight">
                                    Unmissable<br />Experiences
                                </h2>
                            </div>
                            <p className="text-muted-foreground font-body text-sm max-w-xs leading-relaxed">
                                Hand-picked by our safari experts as the defining experiences of East African wildlife.
                            </p>
                        </motion.div>

                        {/* Asymmetric 3-column magazine layout */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                            {/* Large left card */}
                            {parks.filter((p) => p.featured)[0] && (
                                <motion.div
                                    className="md:col-span-7 group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => setSelectedPark(parks.filter((p) => p.featured)[0])}
                                >
                                    <img
                                        src={parks.filter((p) => p.featured)[0].image}
                                        alt={parks.filter((p) => p.featured)[0].name}
                                        className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <span className="inline-block bg-secondary text-secondary-foreground text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                                            🇺🇬 Uganda · Featured
                                        </span>
                                        <h3 className="text-white font-display font-bold text-3xl md:text-4xl mb-2">
                                            {parks.filter((p) => p.featured)[0].name}
                                        </h3>
                                        <p className="text-secondary text-sm font-body font-bold uppercase tracking-widest mb-3">
                                            {parks.filter((p) => p.featured)[0].tagline}
                                        </p>
                                        <p className="text-white/60 font-body text-sm leading-relaxed line-clamp-2">
                                            {parks.filter((p) => p.featured)[0].description}
                                        </p>
                                        <div className="mt-4 flex items-center gap-3">
                                            <span className="text-white/40 text-xs font-body">Click to explore →</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Right column — 2 stacked */}
                            <div className="md:col-span-5 flex flex-col gap-5">
                                {parks.filter((p) => p.featured).slice(1, 3).map((park, i) => (
                                    <motion.div
                                        key={park.id}
                                        className="group relative flex-1 min-h-[230px] rounded-3xl overflow-hidden cursor-pointer"
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedPark(park)}
                                    >
                                        <img
                                            src={park.image}
                                            alt={park.name}
                                            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-5 left-5 right-5">
                                            <p className="text-secondary text-[10px] font-body font-bold uppercase tracking-wider mb-1">
                                                {park.flag} {park.country} · {park.tagline}
                                            </p>
                                            <h3 className="text-white font-display font-bold text-xl">{park.name}</h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
            PARKS GRID — Filter tabs + 3D tilt cards
        ══════════════════════════════════════════════ */}
                <section id="parks-grid" className="py-24 px-6 bg-muted">
                    <div className="max-w-6xl mx-auto">
                        {/* Header + filters */}
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-3">── All Parks</p>
                                <h2 className="font-display font-bold text-foreground text-4xl md:text-5xl">
                                    Every Wild Corner
                                </h2>
                            </motion.div>

                            {/* Filter tabs */}
                            <motion.div
                                className="flex items-center bg-background rounded-full p-1 border border-border shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {(["All", "Uganda", "Rwanda"] as const).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className="relative px-5 py-2 text-sm font-body font-bold rounded-full transition-colors duration-200"
                                    >
                                        {filter === f && (
                                            <motion.div
                                                layoutId="filter-pill"
                                                className="absolute inset-0 bg-primary rounded-full"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className={`relative z-10 transition-colors ${filter === f ? "text-primary-foreground" : "text-muted-foreground"}`}>
                                            {f === "Uganda" ? "🇺🇬 " : f === "Rwanda" ? "🇷🇼 " : "🌍 "}{f}
                                        </span>
                                    </button>
                                ))}
                            </motion.div>
                        </div>

                        {/* Grid */}
                        <motion.div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                            layout
                        >
                            <AnimatePresence mode="popLayout">
                                {filtered.map((park, i) => (
                                    <motion.div
                                        key={park.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                    >
                                        <TiltCard park={park} onClick={() => setSelectedPark(park)} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Count */}
                        <motion.p
                            className="text-center text-muted-foreground font-body text-sm mt-8"
                            animate={{ opacity: 1 }}
                        >
                            Showing <span className="font-bold text-foreground">{filtered.length}</span> of{" "}
                            <span className="font-bold text-foreground">{parks.length}</span> parks
                        </motion.p>
                    </div>
                </section>

                {/* ══════════════════════════════════════
            COUNTRIES SPOTLIGHT
        ══════════════════════════════════════ */}
                <section className="py-24 px-6 bg-background">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="text-center mb-14"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-3">── Where We Operate</p>
                            <h2 className="font-display font-bold text-foreground text-4xl md:text-5xl">Two Countries. One Adventure.</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    country: "Uganda", flag: "🇺🇬",
                                    subtitle: "The Pearl of Africa",
                                    desc: "7 national parks spanning ancient primate forests, roaring waterfalls, crater lakes and the legendary Rwenzori snow peaks. Uganda is Africa's most concentrated wildlife destination.",
                                    count: "7 Parks",
                                    parks: ["Bwindi", "Queen Elizabeth", "Kibale", "Murchison Falls", "Lake Mburo", "Mgahinga", "Rwenzori"],
                                    image: "https://images.unsplash.com/photo-1605552689397-4f77da9c6ca2?q=80&w=1600&auto=format&fit=crop",
                                    color: "from-yellow-900/80",
                                },
                                {
                                    country: "Rwanda", flag: "🇷🇼",
                                    subtitle: "The Land of a Thousand Hills",
                                    desc: "3 exceptional parks that punch far above their size. Gorilla trekking in the Virunga volcanoes, Africa's cleanest Big Five safari, and the source of the Nile in misty Nyungwe.",
                                    count: "3 Parks",
                                    parks: ["Volcanoes", "Akagera", "Nyungwe Forest"],
                                    image: "https://images.unsplash.com/photo-1518169206888-6d80c545f9e2?q=80&w=1600&auto=format&fit=crop",
                                    color: "from-blue-900/80",
                                },
                            ].map((c, i) => (
                                <motion.div
                                    key={c.country}
                                    className="group relative rounded-3xl overflow-hidden h-96 cursor-pointer"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.15 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setFilter(c.country as "Uganda" | "Rwanda")}
                                >
                                    <img src={c.image} alt={c.country} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${c.color} via-black/40 to-transparent`} />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <p className="text-white/50 text-xs font-body uppercase tracking-widest mb-1">{c.subtitle}</p>
                                        <h3 className="text-white font-display font-bold text-3xl mb-2">{c.flag} {c.country}</h3>
                                        <p className="text-white/70 font-body text-sm leading-relaxed mb-4 line-clamp-2">{c.desc}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {c.parks.map((p) => (
                                                <span key={p} className="text-[10px] bg-white/15 backdrop-blur-sm border border-white/20 text-white rounded-full px-2.5 py-0.5 font-body">{p}</span>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 text-secondary font-body font-bold text-sm">
                                            <Globe className="w-4 h-4" />
                                            {c.count} · Click to filter
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
            CTA — Shader background
        ══════════════════════════════════════ */}
                <section className="relative py-28 px-6 overflow-hidden">
                    <ShaderBackground colors={["#0d1a30", "#1a2a4a", "#c26820", "#d4922e"]} speed={0.6} />
                    <div className="absolute inset-0 bg-black/40" />
                    <FloatingParticles count={16} />

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <motion.p
                            className="text-secondary text-xs font-body font-bold uppercase tracking-[0.5em] mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            ── Let's Build Your Safari
                        </motion.p>
                        <motion.h2
                            className="font-display font-bold text-white text-4xl md:text-6xl leading-tight mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Which Park<br />
                            <span className="text-secondary">Calls Your Name?</span>
                        </motion.h2>
                        <motion.p
                            className="text-white/60 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Our experts combine multiple parks into seamless itineraries — from gorilla trekking at dawn to lion-spotting at sunset. Tell us your dream trip.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link
                                to="/contact"
                                className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-body font-bold px-10 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 text-sm shadow-lg shadow-secondary/30"
                            >
                                Start Planning
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/faq"
                                className="inline-flex items-center gap-2 text-white/70 font-body font-semibold text-sm border border-white/20 px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
                            >
                                Read our FAQ
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default NationalParksPage;
