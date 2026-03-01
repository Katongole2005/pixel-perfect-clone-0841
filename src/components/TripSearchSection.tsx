import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Compass, Clock, DollarSign, Calendar, Search } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

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

const TripSearchSection = () => {
  const { convert, symbol } = useCurrency();
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [theme, setTheme] = useState("");
  const [duration, setDuration] = useState([3, 15]);
  const [budget, setBudget] = useState([500, 8500]);
  const [travelMonth, setTravelMonth] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (theme) params.set("theme", theme);
    if (travelMonth) params.set("month", travelMonth);
    params.set("minDuration", String(duration[0]));
    params.set("maxDuration", String(duration[1]));
    params.set("minBudget", String(budget[0]));
    params.set("maxBudget", String(budget[1]));
    navigate(`/trip-search?${params.toString()}`);
  };

  return (
    <section className="relative z-10 -mt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-xl p-6 md:p-8">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6 text-center">
            Search for a Trip
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {/* Destination */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-secondary" />
                Destination
              </label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {destinations.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Travel Theme */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
                <Compass className="w-4 h-4 text-secondary" />
                Travel Theme
              </label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {themes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Travel Month */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-secondary" />
                Travel Date
              </label>
              <Select value={travelMonth} onValueChange={setTravelMonth}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {travelMonths.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration Slider */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
                <Clock className="w-4 h-4 text-secondary" />
                Duration
              </label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={1}
                max={21}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs font-body text-muted-foreground">
                <span>{duration[0]} days</span>
                <span>{duration[1]} days</span>
              </div>
            </div>

            {/* Budget Slider */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-secondary" />
                Budget
              </label>
              <Slider
                value={budget}
                onValueChange={setBudget}
                min={500}
                max={10000}
                step={100}
                className="mt-2"
              />
              <div className="flex justify-between text-xs font-body text-muted-foreground">
                <span>{symbol}{convert(budget[0])}</span>
                <span>{symbol}{convert(budget[1])}</span>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-bold uppercase tracking-wider h-10"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Trips
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripSearchSection;
