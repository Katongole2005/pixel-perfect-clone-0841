import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Clock, DollarSign, Star, ArrowLeft, Search, SlidersHorizontal, X, Compass, Calendar } from "lucide-react";
import { trips, type Trip } from "@/data/trips";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const destinations = [
  { value: "akagera", label: "Akagera National Park" },
  { value: "bwindi", label: "Bwindi Impenetrable National Park" },
  { value: "kibale", label: "Kibale Forest National Park" },
  { value: "lake-mburo", label: "Lake Mburo National Park" },
  { value: "mgahinga", label: "Mgahinga National Park" },
  { value: "murchison", label: "Murchison Falls National Park" },
  { value: "nyungwe", label: "Nyungwe Forest National Park" },
  { value: "queen-elizabeth", label: "Queen Elizabeth National Park" },
  { value: "rwenzori", label: "Rwenzori Mountains National Park" },
  { value: "volcanoes", label: "Volcanoes National Park" },
];

const themes = [
  { value: "bike-tours", label: "Bike & Mountain Bike Tours" },
  { value: "active-travel", label: "Active Travel" },
  { value: "fly-in-safari", label: "Fly-in Safari" },
  { value: "gorilla-trekking", label: "Gorilla Trekking" },
  { value: "safari-tours", label: "Safari Tours" },
  { value: "trekking-hiking", label: "Trekking & Hiking" },
];

const travelMonths = [
  { value: "2026-03", label: "March 2026" },
  { value: "2026-06", label: "June 2026" },
  { value: "2026-07", label: "July 2026" },
  { value: "2026-08", label: "August 2026" },
  { value: "2026-09", label: "September 2026" },
  { value: "2026-10", label: "October 2026" },
  { value: "2026-11", label: "November 2026" },
  { value: "2026-12", label: "December 2026" },
  { value: "2027-01", label: "January 2027" },
  { value: "2027-02", label: "February 2027" },
  { value: "2027-03", label: "March 2027" },
  { value: "2027-06", label: "June 2027" },
  { value: "2027-07", label: "July 2027" },
  { value: "2027-08", label: "August 2027" },
];

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "duration-asc", label: "Duration: Short to Long" },
  { value: "duration-desc", label: "Duration: Long to Short" },
  { value: "rating", label: "Highest Rated" },
];

const TripCard = ({ trip, index }: { trip: Trip; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="group bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={trip.image}
        alt={trip.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-body font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
        {trip.themeLabel}
      </div>
      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-sm font-body font-bold px-3 py-1 rounded-sm">
        ${trip.price.toLocaleString()}
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-secondary transition-colors">
        {trip.title}
      </h3>
      <p className="text-sm font-body text-muted-foreground mb-3 line-clamp-2">
        {trip.description}
      </p>
      <div className="flex items-center gap-4 text-xs font-body text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-secondary" />
          {trip.destinationLabel.split(" ")[0]}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-secondary" />
          {trip.duration} days
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
          {trip.rating} ({trip.reviewCount})
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {trip.highlights.slice(0, 3).map((h) => (
          <span key={h} className="text-xs font-body bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">
            {h}
          </span>
        ))}
      </div>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-body font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors"
      >
        Enquire Now
      </Link>
    </div>
  </motion.div>
);

const TripSearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const destination = searchParams.get("destination") || "";
  const theme = searchParams.get("theme") || "";
  const minDuration = Number(searchParams.get("minDuration") || 1);
  const maxDuration = Number(searchParams.get("maxDuration") || 21);
  const minBudget = Number(searchParams.get("minBudget") || 500);
  const maxBudget = Number(searchParams.get("maxBudget") || 10000);
  const month = searchParams.get("month") || "";
  const sort = searchParams.get("sort") || "rating";

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  const updateSlider = (key: string, values: number[]) => {
    const next = new URLSearchParams(searchParams);
    next.set(`min${key}`, String(values[0]));
    next.set(`max${key}`, String(values[1]));
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = destination || theme || month || minDuration > 1 || maxDuration < 21 || minBudget > 500 || maxBudget < 10000;

  const filtered = useMemo(() => {
    let result = [...trips];

    if (destination) result = result.filter((t) => t.destination === destination);
    if (theme) result = result.filter((t) => t.theme === theme);
    if (month) result = result.filter((t) => t.availableMonths.includes(month));
    result = result.filter((t) => t.duration >= minDuration && t.duration <= maxDuration);
    result = result.filter((t) => t.price >= minBudget && t.price <= maxBudget);

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "duration-asc": result.sort((a, b) => a.duration - b.duration); break;
      case "duration-desc": result.sort((a, b) => b.duration - a.duration); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [destination, theme, month, minDuration, maxDuration, minBudget, maxBudget, sort]);

  const filterPanel = (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-secondary" /> Destination
        </label>
        <Select value={destination || "all"} onValueChange={(v) => updateFilter("destination", v)}>
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="All destinations" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border z-50">
            <SelectItem value="all">All Destinations</SelectItem>
            {destinations.map((d) => (
              <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
          <Compass className="w-4 h-4 text-secondary" /> Theme
        </label>
        <Select value={theme || "all"} onValueChange={(v) => updateFilter("theme", v)}>
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="All themes" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border z-50">
            <SelectItem value="all">All Themes</SelectItem>
            {themes.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-secondary" /> Travel Date
        </label>
        <Select value={month || "all"} onValueChange={(v) => updateFilter("month", v)}>
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Any month" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border z-50">
            <SelectItem value="all">Any Month</SelectItem>
            {travelMonths.map((m) => (
              <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
          <Clock className="w-4 h-4 text-secondary" /> Duration
        </label>
        <Slider value={[minDuration, maxDuration]} onValueChange={(v) => updateSlider("Duration", v)} min={1} max={21} step={1} />
        <div className="flex justify-between text-xs font-body text-muted-foreground">
          <span>{minDuration} days</span>
          <span>{maxDuration} days</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
          <DollarSign className="w-4 h-4 text-secondary" /> Budget
        </label>
        <Slider value={[minBudget, maxBudget]} onValueChange={(v) => updateSlider("Budget", v)} min={500} max={10000} step={100} />
        <div className="flex justify-between text-xs font-body text-muted-foreground">
          <span>${minBudget.toLocaleString()}</span>
          <span>${maxBudget.toLocaleString()}</span>
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full border-border text-muted-foreground">
          <X className="w-4 h-4 mr-2" /> Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Trip Search Results | Fresh Tracks Africa</title>
        <meta name="description" content="Find the best safari packages and gorilla trekking tours." />
      </Helmet>
      <div className="bg-background pt-8 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-foreground">
                Trip Search Results
              </h1>
              <p className="font-body text-muted-foreground mt-1">
                {filtered.length} trip{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="lg:hidden border-border"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
              </Button>
              <Select value={sort} onValueChange={(v) => updateFilter("sort", v)}>
                <SelectTrigger className="w-[200px] bg-background border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {sortOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar filters — desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-card border border-border rounded-lg p-5 sticky top-24">
                <h3 className="font-display text-lg text-foreground mb-4">Refine Search</h3>
                {filterPanel}
              </div>
            </aside>

            {/* Mobile filter drawer */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 lg:hidden"
                >
                  <div className="absolute inset-0 bg-foreground/40" onClick={() => setShowFilters(false)} />
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-card border-r border-border p-6 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-lg text-foreground">Filters</h3>
                      <button onClick={() => setShowFilters(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    {filterPanel}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results grid */}
            <div className="flex-1 min-w-0">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.map((trip, i) => (
                    <TripCard key={trip.id} trip={trip} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-2">No trips found</h3>
                  <p className="font-body text-muted-foreground mb-6">
                    Try adjusting your filters to see more results.
                  </p>
                  <Button onClick={clearFilters} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-bold uppercase tracking-wider">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripSearchResults;
