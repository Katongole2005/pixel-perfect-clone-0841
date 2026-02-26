import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, MapPin, Compass, User, Send, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TopBar from "@/components/TopBar";
import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const STEPS = [
  { number: 1, title: "Trip Details", icon: Calendar },
  { number: 2, title: "Preferences", icon: Compass },
  { number: 3, title: "Contact Info", icon: User },
];

const TRAVEL_TYPES = ["Gorilla Trekking", "Mountain Bike Safari", "Nature Walk", "Safari", "Trekking", "Cultural Tour", "Bird Watching"];
const ANIMALS = ["Gorillas", "Chimpanzees", "Elephants", "Lions", "Rhinos", "Giraffes", "Hippos", "Leopards"];
const EXPERIENCES = ["Off the Beaten Track", "Relaxation", "Guided Tour", "Luxury Travel", "Budget Friendly", "Adventure"];
const OTHER_DESTINATIONS = ["Rwanda", "Tanzania", "Kenya", "DR Congo"];

const PlanYourTrip = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Step 1
  const [earliestArrival, setEarliestArrival] = useState("");
  const [latestArrival, setLatestArrival] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [guideLanguage, setGuideLanguage] = useState("English");
  const [numAdults, setNumAdults] = useState("1");
  const [numChildren, setNumChildren] = useState("0");

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
    const { error } = await supabase.from("trip_requests").insert({
      earliest_arrival: earliestArrival,
      latest_arrival: latestArrival,
      duration_days: parseInt(duration),
      budget_per_person: parseFloat(budget),
      guide_language: guideLanguage,
      num_adults: parseInt(numAdults),
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
    });
    setSubmitting(false);

    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <header><TopBar /><HeaderBar /><Navbar /></header>
        <main className="max-w-2xl mx-auto py-20 px-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-muted-foreground font-body text-lg mb-8">
              Your individual trip request has been submitted successfully. Our team of safari experts will review your preferences and get back to you within 24 hours with a customized itinerary.
            </p>
            <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold">
              Back to Home
            </Button>
          </motion.div>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header><TopBar /><HeaderBar /><Navbar /></header>
      <main>
        {/* Hero banner */}
        <div className="bg-primary py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-3"
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            >
              Plan Your Dream Safari
            </motion.h1>
            <p className="text-primary-foreground/70 font-body text-lg">
              Tell us about your ideal trip and our experts will craft a personalized itinerary just for you.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Step indicators */}
          <div className="flex items-center justify-center mb-10">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = step === s.number;
              const isDone = step > s.number;
              return (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive ? "bg-primary text-primary-foreground shadow-lg" :
                      isDone ? "bg-primary/20 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs font-body font-bold mt-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {s.title}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-colors duration-300 ${step > s.number ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-foreground mb-1">The Most Important Details</h2>
                    <p className="text-sm text-muted-foreground font-body">Tell us about your dream trip to Uganda & East Africa!</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body font-semibold">Earliest Arrival *</Label>
                      <Input type="date" value={earliestArrival} onChange={(e) => setEarliestArrival(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body font-semibold">Latest Arrival *</Label>
                      <Input type="date" value={latestArrival} onChange={(e) => setLatestArrival(e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body font-semibold">Duration (days) *</Label>
                      <Input type="number" min={1} placeholder="e.g. 10" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body font-semibold">Budget per Person (USD, excl. flights) *</Label>
                      <Input type="number" min={1} placeholder="e.g. 3000" value={budget} onChange={(e) => setBudget(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body font-semibold">Preferred Guide Language *</Label>
                    <Select value={guideLanguage} onValueChange={setGuideLanguage}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="No preference">No Preference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body font-semibold">Number of Adults *</Label>
                      <Input type="number" min={1} value={numAdults} onChange={(e) => setNumAdults(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body font-semibold">Number of Children (up to 12 yrs)</Label>
                      <Input type="number" min={0} value={numChildren} onChange={(e) => setNumChildren(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-foreground mb-1">How Do You Envision Your Trip?</h2>
                    <p className="text-sm text-muted-foreground font-body">Select everything that appeals to you — the more we know, the better!</p>
                  </div>

                  <CheckboxGroup label="Which type of travel appeals to you most?" items={TRAVEL_TYPES} selected={travelTypes} onToggle={(v) => toggleArray(travelTypes, v, setTravelTypes)} />
                  <CheckboxGroup label="Which animals would you like to see?" items={ANIMALS} selected={animals} onToggle={(v) => toggleArray(animals, v, setAnimals)} />
                  <CheckboxGroup label="What kind of travel experience?" items={EXPERIENCES} selected={experiences} onToggle={(v) => toggleArray(experiences, v, setExperiences)} />
                  <CheckboxGroup label="Other destinations besides Uganda?" items={OTHER_DESTINATIONS} selected={otherDestinations} onToggle={(v) => toggleArray(otherDestinations, v, setOtherDestinations)} />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-foreground mb-1">How Can We Reach You?</h2>
                    <p className="text-sm text-muted-foreground font-body">We'll use this to send you a personalized trip proposal.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body font-semibold">Full Name *</Label>
                    <Input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body font-semibold">Email *</Label>
                    <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body font-semibold">Phone Number *</Label>
                    <Input type="tel" placeholder="+1 234 567 8901" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body font-semibold">Your Message to Our Experts</Label>
                    <Textarea placeholder="Share your individual wishes for your dream trip..." value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox id="privacy" checked={privacyAccepted} onCheckedChange={(v) => setPrivacyAccepted(v === true)} />
                    <label htmlFor="privacy" className="text-sm font-body text-muted-foreground cursor-pointer leading-snug">
                      I agree that my information will be collected and stored electronically to answer this request. I have read the privacy policy. *
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
              className="font-body font-bold gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>

            {step < 3 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-bold gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canNext() || submitting}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-bold gap-2"
              >
                {submitting ? "Submitting..." : <>Submit Request <Send className="w-4 h-4" /></>}
              </Button>
            )}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

/* Reusable checkbox group */
const CheckboxGroup = ({
  label, items, selected, onToggle,
}: { label: string; items: string[]; selected: string[]; onToggle: (v: string) => void }) => (
  <div className="space-y-3">
    <Label className="font-body font-semibold text-foreground">{label}</Label>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onToggle(item)}
          className={`px-3 py-2.5 rounded-md text-sm font-body font-medium border transition-all text-left ${
            selected.includes(item)
              ? "bg-primary/10 border-primary text-primary"
              : "bg-card border-border text-muted-foreground hover:border-primary/40"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

export default PlanYourTrip;
