import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "fta-cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 relative">
            <button
              onClick={decline}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-sm mb-1">We value your privacy 🍪</h3>
                <p className="text-xs font-body text-muted-foreground leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={accept}
                    size="sm"
                    className="bg-secondary text-white hover:bg-secondary/90 font-body font-semibold text-xs h-8 px-5 rounded-lg"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={decline}
                    variant="outline"
                    size="sm"
                    className="font-body font-semibold text-xs h-8 px-5 rounded-lg border-border"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
