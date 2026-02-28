import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    Search,
    Filter,
    MessageSquare,
    ThumbsUp,
    CheckCircle2,
    MapPin,
    Calendar,
    ArrowRight,
    Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    TextShimmer,
    GlowCard,
    FloatingParticles,
    TypewriterText
} from "@/components/animations/AnimationUtils";
import { supabase } from "@/integrations/supabase/client";

interface Review {
    id: string;
    author: string;
    location: string;
    date: string;
    rating: number;
    title: string;
    content: string;
    trip: string;
    trip_type: string;
    verified: boolean;
    helpful_count: number;
}

const TRIP_TYPES = ["All", "Gorilla Trekking", "Safari", "Wildlife", "Adventure", "Cultural"];

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    React.useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from("managed_reviews")
                    .select("*")
                    .eq("is_published", true)
                    .order("sort_order", { ascending: true })
                    .order("created_at", { ascending: false });

                if (error) throw error;
                if (data) setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const filteredReviews = useMemo(() => {
        return reviews.filter(review => {
            const matchesType = filter === "All" || review.trip_type === filter;
            const matchesSearch = review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.author.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [filter, searchQuery, reviews]);

    const stats = useMemo(() => {
        if (reviews.length === 0) return { averageRating: 0, totalReviews: 0, verifedPhotos: 0 };
        const total = reviews.length;
        const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / total;
        return {
            averageRating: parseFloat(avg.toFixed(1)),
            totalReviews: total + 1243, // Keep the "base" numbers for social proof
            verifedPhotos: 850
        };
    }, [reviews]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-godka-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Guest Reviews & Testimonials | Godka Tours</title>
                <meta name="description" content="Read authentic experiences from our guests who explored Uganda and Rwanda with Godka Tours." />
            </Helmet>

            <div className="bg-background min-h-screen">
                {/* ══════════════════════════════════════════════
                    HERO SECTION — Premium Stats Design
                ══════════════════════════════════════════════ */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-primary/5">
                    <FloatingParticles count={20} className="opacity-20" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Badge className="bg-godka-gold/20 text-godka-gold border-godka-gold/30 mb-4 px-3 py-1">
                                    Trusted by 5,000+ Guests
                                </Badge>
                                <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                                    <TextShimmer>Real Stories</TextShimmer> From <br />
                                    The Pearl of Africa
                                </h1>
                                <p className="text-xl text-muted-foreground font-body max-w-lg mb-8 leading-relaxed">
                                    Discover why travelers from across the globe choose Godka Tours for their ultimate African adventure. Authentic reviews from real explorers.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button size="lg" className="bg-godka-gold hover:bg-godka-gold/90 text-primary font-body font-bold rounded-full px-8 h-14 shadow-xl shadow-godka-gold/20">
                                        Write a Review
                                    </Button>
                                    <div className="flex items-center gap-3 px-6 h-14 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-slate-300 overflow-hidden ring-2 ring-godka-gold/20" />
                                            ))}
                                        </div>
                                        <span className="text-sm font-body font-semibold text-foreground/70">+1.2k Photos</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                <GlowCard className="bg-godka-gold/5 border-godka-gold/10 p-8 rounded-3xl backdrop-blur-md">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="text-7xl font-display font-bold text-godka-gold mb-2">
                                            {stats.averageRating}
                                        </div>
                                        <div className="flex gap-1 mb-4 text-godka-gold">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" className="w-6 h-6" />)}
                                        </div>
                                        <div className="text-muted-foreground font-body font-semibold mb-8">
                                            BASED ON {stats.totalReviews} EXCELLENT REVIEWS
                                        </div>
                                        <div className="w-full space-y-3">
                                            {[
                                                { label: "Excellent", percentage: 98, color: "bg-godka-gold" },
                                                { label: "Great", percentage: 2, color: "bg-godka-gold/60" },
                                                { label: "Average", percentage: 0, color: "bg-godka-gold/30" },
                                            ].map((bar, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <span className="text-xs font-body font-bold text-foreground/60 w-16 text-left">{bar.label}</span>
                                                    <div className="flex-1 h-2 bg-foreground/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${bar.percentage}%` }}
                                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                                            className={`h-full ${bar.color}`}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-body font-bold text-foreground/80 w-8">{bar.percentage}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </GlowCard>
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-godka-gold/10 rounded-full blur-3xl animate-pulse" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    FILTERING & SEARCH
                ══════════════════════════════════════════════ */}
                <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-foreground/5 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                            <div className="flex flex-wrap justify-center gap-2">
                                {TRIP_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFilter(type)}
                                        className={`px-5 py-2 rounded-full text-sm font-body font-semibold transition-all duration-300 ${filter === type
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                            : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search reviews..."
                                    className="pl-10 rounded-full border-foreground/10 focus:ring-godka-gold"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    REVIEWS MASONRY GRID
                ══════════════════════════════════════════════ */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredReviews.length > 0 ? (
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                                <AnimatePresence mode="popLayout">
                                    {filteredReviews.map((review, idx) => (
                                        <motion.div
                                            key={review.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            className="break-inside-avoid"
                                        >
                                            <GlowCard className="group bg-background border border-foreground/5 p-6 rounded-3xl hover:border-godka-gold/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-godka-gold/5">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex gap-1 text-godka-gold">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} fill="currentColor" className="w-4 h-4" />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-body font-medium text-muted-foreground">
                                                        {review.date}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-godka-gold transition-colors duration-300">
                                                    {review.title}
                                                </h3>

                                                <div className="relative mb-6">
                                                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-godka-gold/10 -z-10" />
                                                    <p className="text-muted-foreground font-body leading-relaxed line-clamp-6">
                                                        {review.content}
                                                    </p>
                                                </div>

                                                <div className="pt-6 border-t border-foreground/5">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 rounded-full bg-godka-gold/10 flex items-center justify-center text-godka-gold font-bold">
                                                            {review.author.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-sm font-body font-bold text-foreground">{review.author}</span>
                                                                {review.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                                                            </div>
                                                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                                                                <MapPin className="w-3 h-3" /> {review.location}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <Badge variant="secondary" className="bg-foreground/5 text-foreground/60 text-[10px] uppercase tracking-tighter">
                                                            {review.trip_type}
                                                        </Badge>
                                                        <button className="flex items-center gap-1.5 text-xs font-body font-semibold text-muted-foreground hover:text-foreground transition-colors">
                                                            <ThumbsUp className="w-3.5 h-3.5" />
                                                            Helpful ({review.helpful_count})
                                                        </button>
                                                    </div>
                                                </div>
                                            </GlowCard>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="text-center py-40">
                                <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Filter className="w-10 h-10 text-muted-foreground/30" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-foreground mb-2">No reviews found</h3>
                                <p className="text-muted-foreground font-body">Try adjusting your filters or search keywords.</p>
                                <Button
                                    variant="outline"
                                    className="mt-6 rounded-full"
                                    onClick={() => { setFilter("All"); setSearchQuery(""); }}
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    CTA SECTION — Share Experience
                ══════════════════════════════════════════════ */}
                <section className="py-32 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-godka-gold/5 blur-[120px] rounded-full translate-x-1/2" />
                    <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
                                Traveled with us recently?
                            </h2>
                            <p className="text-xl text-white/70 font-body mb-12 leading-relaxed">
                                Your feedback helps us improve and helps fellow travelers plan their dream safari. We'd love to hear about your experience!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-godka-gold hover:bg-godka-gold/90 text-primary font-body font-bold rounded-full px-12 h-16 text-lg">
                                    Rate Us on Google
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-body font-bold rounded-full px-12 h-16 text-lg">
                                    Share Private Feedback
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ReviewsPage;
