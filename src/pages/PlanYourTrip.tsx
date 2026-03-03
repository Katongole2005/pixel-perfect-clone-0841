import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Users, Compass, User, Send, ChevronRight, ChevronLeft, Check, MapPin, Heart, Globe } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const STEPS = [
  { number: 1, title: "Trip Details", icon: CalendarIcon, description: "Dates & logistics" },
  { number: 2, title: "Preferences", icon: Heart, description: "Your dream trip" },
  { number: 3, title: "Contact Info", icon: Send, description: "Let's connect" },
];

const TRAVEL_TYPES = [
  { label: "Gorilla Trekking", icon: "🦍" },
  { label: "Mountain Bike Safari", icon: "🚵" },
  { label: "Nature Walk", icon: "🌿" },
  { label: "Safari", icon: "🦁" },
  { label: "Trekking", icon: "🏔️" },
  { label: "Cultural Tour", icon: "🎭" },
  { label: "Bird Watching", icon: "🦅" },
];

const ANIMALS = [
  { label: "Gorillas", icon: "🦍" },
  { label: "Chimpanzees", icon: "🐒" },
  { label: "Elephants", icon: "🐘" },
  { label: "Lions", icon: "🦁" },
  { label: "Rhinos", icon: "🦏" },
  { label: "Giraffes", icon: "🦒" },
  { label: "Hippos", icon: "🦛" },
  { label: "Leopards", icon: "🐆" },
];

const EXPERIENCES = [
  { label: "Off the Beaten Track", icon: "🗺️" },
  { label: "Relaxation", icon: "🧘" },
  { label: "Guided Tour", icon: "🧭" },
  { label: "Luxury Travel", icon: "✨" },
  { label: "Budget Friendly", icon: "💰" },
  { label: "Adventure", icon: "⛰️" },
];

const OTHER_DESTINATIONS = [
  { label: "Rwanda", icon: "🇷🇼" },
  { label: "Tanzania", icon: "🇹🇿" },
  { label: "Kenya", icon: "🇰🇪" },
  { label: "DR Congo", icon: "🇨🇩" },
];

const PlanYourTrip = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Step 1
  const [earliestArrival, setEarliestArrival] = useState<Date | undefined>();
  const [latestArrival, setLatestArrival] = useState<Date | undefined>();
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [guideLanguage, setGuideLanguage] = useState("English");
  const [numAdults, setNumAdults] = useState("1");
  const [numChildren, setNumChildren] = useState("0");
  const [pickupTime, setPickupTime] = useState("");
  const [accommodationPreference, setAccommodationPreference] = useState("");
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);
  const [specialOccasion, setSpecialOccasion] = useState("");

  // Step 2
  const [travelTypes, setTravelTypes] = useState<string[]>([]);
  const [animals, setAnimals] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [otherDestinations, setOtherDestinations] = useState<string[]>([]);

  // Step 3
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const canNext = () => {
    if (step === 1) return earliestArrival && latestArrival && duration && budget && numAdults;
    if (step === 2) return true;
    if (step === 3) return name && email && phone && privacyAccepted;
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Validate dates to prevent Supabase constraint errors
      const eArrival = earliestArrival ? format(earliestArrival, "yyyy-MM-dd") : new Date().toISOString().split('T')[0];
      const lArrival = latestArrival ? format(latestArrival, "yyyy-MM-dd") : new Date().toISOString().split('T')[0];

      const { error } = await supabase.from("trip_requests").insert({
        earliest_arrival: eArrival,
        latest_arrival: lArrival,
        duration_days: parseInt(duration) || 1,
        budget_per_person: parseFloat(budget) || 0,
        guide_language: guideLanguage || "English",
        num_adults: parseInt(numAdults) || 1,
        num_children: parseInt(numChildren || "0"),
        travel_types: travelTypes,
        animals,
        travel_experience: experiences,
        other_destinations: otherDestinations,
        name,
        email,
        phone,
        message,
        privacy_accepted: privacyAccepted,
        pickup_time: pickupTime || null,
        accommodation_preference: accommodationPreference || null,
        dietary_requirements: dietaryRequirements,
        special_occasion: specialOccasion || null,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        toast({ title: "Error", description: `Submission failed: ${error.message || "Please try again"}`, variant: "destructive" });
      } else {
        setSubmitted(true);
        toast({ title: "Success", description: "Your trip request has been submitted!" }); // Feedback for user
      }
    } catch (err) {
      console.error("Unexpected submission error:", err);
      toast({ title: "Error", description: "An unexpected error occurred. Please try again later.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="w-24 h-24 rounded-full bg-brand-earth/20 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
            <Check className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Thank You!</h1>
          <p className="text-muted-foreground font-body text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Your trip request has been submitted. Our safari experts will craft a personalized itinerary and get back to you within <strong className="text-foreground">24 hours</strong>.
          </p>
          <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold px-8 h-12 text-base">
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <>
      <Helmet>
        <title>Plan Your Trip | Fresh Tracks Africa</title>
        <meta name="description" content="Plan your dream safari in Uganda & Rwanda. Tell us your preferences and we'll craft a personalized itinerary." />
        <link rel="canonical" href="https://pixel-perfect-clone-0841.lovable.app/plan-your-trip" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pixel-perfect-clone-0841.lovable.app/plan-your-trip" />
        <meta property="og:title" content="Plan Your Trip | Fresh Tracks Africa" />
        <meta property="og:description" content="Tell us your preferences and we'll craft a personalized safari itinerary for Uganda & Rwanda." />
        <meta property="og:site_name" content="Fresh Tracks Africa Tours & Travel" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <div className="bg-background">
        {/* Hero */}
        <div className="relative overflow-hidden bg-primary py-16 md:py-20 px-4">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-secondary blur-3xl" />
            <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-secondary blur-3xl" />
          </div>
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 bg-secondary/25 text-secondary font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-5">
                <Compass className="w-4 h-4" /> Individual Trip Request
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Plan Your Dream Safari
              </h1>
              <p className="text-white/75 font-body text-lg max-w-lg mx-auto">
                Share your vision and our experts will craft a bespoke itinerary tailored just for you.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10 pb-16">
          {/* Step progress bar */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = step === s.number;
                const isDone = step > s.number;
                return (
                  <button
                    key={s.number}
                    onClick={() => { if (isDone) setStep(s.number); }}
                    className={`flex items-center gap-3 transition-all duration-300 ${isDone ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${isActive ? "bg-secondary text-white shadow-md scale-110" :
                      isDone ? "bg-secondary/20 text-secondary" :
                        "bg-muted text-muted-foreground"
                      }`}>
                      {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className={`text-sm font-body font-bold leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {s.title}
                      </p>
                      <p className="text-xs font-body text-muted-foreground">{s.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Form steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-xl"
            >
              {step === 1 && <StepOne {...{ earliestArrival, setEarliestArrival, latestArrival, setLatestArrival, duration, setDuration, budget, setBudget, guideLanguage, setGuideLanguage, numAdults, setNumAdults, numChildren, setNumChildren, pickupTime, setPickupTime, accommodationPreference, setAccommodationPreference }} />}
              {step === 2 && <StepTwo {...{ travelTypes, setTravelTypes, animals, setAnimals, experiences, setExperiences, otherDestinations, setOtherDestinations, toggleArray, dietaryRequirements, setDietaryRequirements, specialOccasion, setSpecialOccasion }} />}
              {step === 3 && <StepThree {...{ name, setName, email, setEmail, phone, setPhone, message, setMessage, privacyAccepted, setPrivacyAccepted }} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
              className="font-body font-semibold gap-2 h-12 px-6 rounded-xl border-border"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>

            {step < 3 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="bg-secondary text-white hover:bg-secondary/90 font-body font-semibold gap-2 h-12 px-8 rounded-xl shadow-md"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canNext() || submitting}
                className="bg-secondary text-white hover:bg-secondary/90 font-body font-semibold gap-2 h-12 px-8 rounded-xl shadow-md"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <>Submit Request <Send className="w-4 h-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Step 1: Trip Details ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepOne = ({ earliestArrival, setEarliestArrival, latestArrival, setLatestArrival, duration, setDuration, budget, setBudget, guideLanguage, setGuideLanguage, numAdults, setNumAdults, numChildren, setNumChildren, pickupTime, setPickupTime, accommodationPreference, setAccommodationPreference }: any) => (
  <div className="space-y-7">
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">The Most Important Details</h2>
      </div>
      <p className="text-sm text-muted-foreground font-body ml-11">Tell us about your dream trip to Uganda &amp; East Africa!</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <FieldWrapper label="Earliest Arrival" required>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 rounded-xl bg-background border-border font-body justify-start text-left",
                !earliestArrival && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-secondary" />
              {earliestArrival ? format(earliestArrival, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={earliestArrival}
              onSelect={setEarliestArrival}
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </FieldWrapper>
      <FieldWrapper label="Latest Arrival" required>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 rounded-xl bg-background border-border font-body justify-start text-left",
                !latestArrival && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-secondary" />
              {latestArrival ? format(latestArrival, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={latestArrival}
              onSelect={setLatestArrival}
              disabled={(date) => date < (earliestArrival || new Date())}
            />
          </PopoverContent>
        </Popover>
      </FieldWrapper>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <FieldWrapper label="Duration (days)" required>
        <Input type="number" min={1} placeholder="e.g. 10" value={duration} onChange={(e) => setDuration(e.target.value)} className="h-12 rounded-xl bg-background border-border font-body" />
      </FieldWrapper>
      <FieldWrapper label="Budget per Person (USD, excl. flights)" required>
        <Input type="number" min={1} placeholder="e.g. 3000" value={budget} onChange={(e) => setBudget(e.target.value)} className="h-12 rounded-xl bg-background border-border font-body" />
      </FieldWrapper>
    </div>

    <FieldWrapper label="Preferred Guide Language" required>
      <Select value={guideLanguage} onValueChange={setGuideLanguage}>
        <SelectTrigger className="h-12 rounded-xl bg-background border-border font-body"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="German">German</SelectItem>
          <SelectItem value="French">French</SelectItem>
          <SelectItem value="No preference">No Preference</SelectItem>
        </SelectContent>
      </Select>
    </FieldWrapper>

    <FieldWrapper label="Preferred Pick-up Time (optional)">
      <Input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="h-12 rounded-xl bg-background border-border font-body" />
    </FieldWrapper>

    <FieldWrapper label="Accommodation Preference (optional)">
      <Select value={accommodationPreference} onValueChange={setAccommodationPreference}>
        <SelectTrigger className="h-12 rounded-xl bg-background border-border font-body"><SelectValue placeholder="Select preference" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Budget camping">🏕️ Budget Camping</SelectItem>
          <SelectItem value="Mid-range lodge">🏡 Mid-range Lodge</SelectItem>
          <SelectItem value="Luxury lodge">✨ Luxury Lodge</SelectItem>
          <SelectItem value="Mix of both">🔀 Mix of Both</SelectItem>
          <SelectItem value="No preference">🤷 No Preference</SelectItem>
        </SelectContent>
      </Select>
    </FieldWrapper>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <FieldWrapper label="Number of Adults" required>
        <Input type="number" min={1} value={numAdults} onChange={(e) => setNumAdults(e.target.value)} className="h-12 rounded-xl bg-background border-border font-body" />
      </FieldWrapper>
      <FieldWrapper label="Number of Children (up to 12 yrs)">
        <Input type="number" min={0} value={numChildren} onChange={(e) => setNumChildren(e.target.value)} className="h-12 rounded-xl bg-background border-border font-body" />
      </FieldWrapper>
    </div>
  </div>
);

/* ─── Step 2: Preferences ─── */
const DIETARY_OPTIONS = [
  { label: "Vegetarian", icon: "🥗" },
  { label: "Vegan", icon: "🌱" },
  { label: "Halal", icon: "🍖" },
  { label: "Gluten-free", icon: "🌾" },
  { label: "Lactose-free", icon: "🥛" },
  { label: "No restrictions", icon: "✅" },
];

const SPECIAL_OCCASIONS = [
  { value: "Honeymoon", label: "🥂 Honeymoon" },
  { value: "Anniversary", label: "💍 Anniversary" },
  { value: "Birthday", label: "🎂 Birthday" },
  { value: "Family reunion", label: "👨‍👩‍👧‍👦 Family Reunion" },
  { value: "None", label: "— None" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepTwo = ({ travelTypes, setTravelTypes, animals, setAnimals, experiences, setExperiences, otherDestinations, setOtherDestinations, toggleArray, dietaryRequirements, setDietaryRequirements, specialOccasion, setSpecialOccasion }: any) => (
  <div className="space-y-8">
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
          <Heart className="w-4 h-4 text-secondary" />
        </div>
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">How Do You Envision Your Trip?</h2>
      </div>
      <p className="text-sm text-muted-foreground font-body ml-11">Select everything that appeals to you — the more we know, the better!</p>
    </div>

    <PillGroup label="Which type of travel appeals to you most?" items={TRAVEL_TYPES} selected={travelTypes} onToggle={(v: string) => toggleArray(travelTypes, v, setTravelTypes)} />
    <PillGroup label="Which animals would you like to see?" items={ANIMALS} selected={animals} onToggle={(v: string) => toggleArray(animals, v, setAnimals)} />
    <PillGroup label="What kind of travel experience?" items={EXPERIENCES} selected={experiences} onToggle={(v: string) => toggleArray(experiences, v, setExperiences)} />
    <PillGroup label="Other destinations besides Uganda?" items={OTHER_DESTINATIONS} selected={otherDestinations} onToggle={(v: string) => toggleArray(otherDestinations, v, setOtherDestinations)} />

    <PillGroup label="Any dietary requirements?" items={DIETARY_OPTIONS} selected={dietaryRequirements} onToggle={(v: string) => toggleArray(dietaryRequirements, v, setDietaryRequirements)} />

    <FieldWrapper label="Celebrating a special occasion? (optional)">
      <Select value={specialOccasion} onValueChange={setSpecialOccasion}>
        <SelectTrigger className="h-12 rounded-xl bg-background border-border font-body"><SelectValue placeholder="Select occasion" /></SelectTrigger>
        <SelectContent>
          {SPECIAL_OCCASIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldWrapper>
  </div>
);

/* ─── Step 3: Contact Info ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepThree = ({ name, setName, email, setEmail, phone, setPhone, message, setMessage, privacyAccepted, setPrivacyAccepted }: any) => (
  <div className="space-y-6">
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-brand-sage/10 flex items-center justify-center">
          <User className="w-4 h-4 text-brand-sage" />
        </div>
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">How Can We Reach You?</h2>
      </div>
      <p className="text-sm text-muted-foreground font-body ml-11">We'll use this to send you a personalized trip proposal.</p>
    </div>

    <FieldWrapper label="Full Name" required>
      <Input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl bg-background border-border font-body" />
    </FieldWrapper>
    <FieldWrapper label="Email" required>
      <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl bg-background border-border font-body" />
    </FieldWrapper>
    <FieldWrapper label="Phone Number" required>
      <Input type="tel" placeholder="+1 234 567 8901" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-xl bg-background border-border font-body" />
    </FieldWrapper>
    <FieldWrapper label="Your Message to Our Experts">
      <Textarea placeholder="Share your individual wishes for your dream trip..." value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="rounded-xl bg-background border-border font-body resize-none" />
    </FieldWrapper>

    <div className="flex items-start gap-3 pt-2 p-4 rounded-xl bg-muted/50 border border-border">
      <Checkbox id="privacy" checked={privacyAccepted} onCheckedChange={(v) => setPrivacyAccepted(v === true)} className="mt-0.5" />
      <label htmlFor="privacy" className="text-sm font-body text-muted-foreground cursor-pointer leading-relaxed">
        I agree that my information will be collected and stored electronically to answer this request. I have read the <span className="text-primary font-semibold underline underline-offset-2">privacy policy</span>. *
      </label>
    </div>
  </div>
);

/* ─── Reusable Field Wrapper ─── */
const FieldWrapper = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="font-body font-semibold text-foreground text-[13px] tracking-wide uppercase">
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    {children}
  </div>
);

/* ─── Pill selection group with icons ─── */
const PillGroup = ({
  label, items, selected, onToggle,
}: { label: string; items: { label: string; icon: string }[]; selected: string[]; onToggle: (v: string) => void }) => (
  <div className="space-y-3">
    <Label className="font-body font-semibold text-foreground text-[13px] tracking-wide uppercase">{label}</Label>
    <div className="flex flex-wrap gap-2.5">
      {items.map((item) => {
        const isSelected = selected.includes(item.label);
        return (
          <motion.button
            key={item.label}
            type="button"
            onClick={() => onToggle(item.label)}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-body font-medium border-2 transition-all duration-300 ${isSelected
              ? "bg-secondary/15 border-secondary text-foreground shadow-sm"
              : "bg-muted/50 border-transparent text-muted-foreground hover:border-secondary/30 hover:text-foreground hover:bg-muted"
              }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
            {isSelected && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-0.5">
                <Check className="w-3.5 h-3.5" />
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  </div>
);

export default PlanYourTrip;
