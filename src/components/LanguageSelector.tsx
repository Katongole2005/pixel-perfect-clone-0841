import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const SUPPORTED_CODES = ["en", "ar", "nl", "fr", "de", "it", "pt", "ru", "es"];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const STORAGE_KEY = "fta-preferred-lang";

/** Get the language to use: user's saved choice > browser detection */
function getInitialLanguage(): string {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_CODES.includes(saved)) return saved;
  // First visit: detect from browser
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.split("-")[0].toLowerCase();
    if (SUPPORTED_CODES.includes(code)) return code;
  }
  return "en";
}

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: any;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

/**
 * Compact language selector that triggers Google Translate.
 * The native Google Translate widget is hidden via CSS;
 * we drive it programmatically from our own dropdown.
 */
const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const initialLang = useRef(getInitialLanguage());
  const [current, setCurrent] = useState(initialLang.current);
  const ref = useRef<HTMLDivElement>(null);
  const autoTriggered = useRef(false);

  /* ── Load Google Translate script once ── */
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      new window.google!.translate!.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar,nl,fr,de,it,pt,ru,es",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Auto-translate on first visit if browser lang differs from English
      if (initialLang.current !== "en" && !autoTriggered.current) {
        autoTriggered.current = true;
        setTimeout(() => {
          const code = initialLang.current;
          document.cookie = `googtrans=/en/${code}; path=/;`;
          document.cookie = `googtrans=/en/${code}; path=/; domain=.${window.location.hostname}`;
          const selectEl = document.querySelector<HTMLSelectElement>(".goog-te-combo");
          if (selectEl) {
            selectEl.value = code;
            selectEl.dispatchEvent(new Event("change"));
          }
        }, 500);
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Trigger Google Translate language change ── */
  const selectLanguage = (code: string) => {
    setCurrent(code);
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, code);
    if (code === "en") {
      // Reset to original
      const frame = document.querySelector<HTMLIFrameElement>(
        ".goog-te-banner-frame"
      );
      if (frame) {
        const innerDoc = frame.contentDocument || frame.contentWindow?.document;
        const restoreBtn = innerDoc?.querySelector<HTMLButtonElement>(
          "button.goog-te-banner-frame-close"
        );
        if (restoreBtn) restoreBtn.click();
      }
      // Also try cookie reset
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." +
        window.location.hostname;
      window.location.reload();
      return;
    }

    // Set cookie and trigger
    document.cookie = `googtrans=/en/${code}; path=/;`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=.${window.location.hostname}`;

    // Try to trigger the select element Google Translate creates
    const selectEl = document.querySelector<HTMLSelectElement>(
      ".goog-te-combo"
    );
    if (selectEl) {
      selectEl.value = code;
      selectEl.dispatchEvent(new Event("change"));
    } else {
      // If widget hasn't loaded yet, reload
      window.location.reload();
    }
  };

  const activeLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      {/* Hidden Google Translate container */}
      <div id="google_translate_element" className="hidden" />

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-xs font-body"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{activeLang.flag} {activeLang.label}</span>
        <span className="sm:hidden">{activeLang.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-lg shadow-xl z-[9999] py-1 animate-fade-in-up">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm font-body flex items-center gap-2.5 transition-colors hover:bg-muted ${
                current === lang.code
                  ? "text-foreground font-semibold bg-muted/50"
                  : "text-muted-foreground"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
