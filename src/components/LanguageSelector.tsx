import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const SUPPORTED_CODES = ["en", "ar", "nl", "fr", "de", "it", "pt", "ru", "es"] as const;
type SupportedCode = (typeof SUPPORTED_CODES)[number];

const STORAGE_KEY = "fta-preferred-lang";

const LANGUAGES: Array<{ code: SupportedCode; label: string; flag: string }> = [
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

function isSupportedLanguage(code: string): code is SupportedCode {
  return SUPPORTED_CODES.includes(code as SupportedCode);
}

function getSavedLanguage(): SupportedCode | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && isSupportedLanguage(saved)) return saved;
  return null;
}

function detectBrowserLanguage(): SupportedCode {
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.split("-")[0].toLowerCase();
    if (isSupportedLanguage(code)) return code;
  }
  return "en";
}

function getCookieDomains(hostname: string): string[] {
  const domains = new Set<string>([hostname, `.${hostname}`]);

  const parts = hostname.split(".");
  for (let i = 1; i < parts.length - 1; i++) {
    domains.add(`.${parts.slice(i).join(".")}`);
  }

  if (hostname.endsWith("lovable.app")) {
    domains.add(".lovable.app");
  }

  return Array.from(domains);
}

function setGoogTransCookie(code: SupportedCode) {
  const value = `/en/${code}`;
  const maxAge = 60 * 60 * 24 * 365; // 1 year

  document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;

  for (const domain of getCookieDomains(window.location.hostname)) {
    document.cookie = `googtrans=${value}; path=/; domain=${domain}; max-age=${maxAge}; SameSite=Lax`;
  }
}

function clearGoogTransCookie() {
  document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

  for (const domain of getCookieDomains(window.location.hostname)) {
    document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  }
}

function applyGoogleLanguage(code: SupportedCode) {
  if (code === "en") {
    clearGoogTransCookie();
  } else {
    setGoogTransCookie(code);
  }

  let attempts = 0;
  const maxAttempts = 20;

  const tryApply = () => {
    const selectEl = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (selectEl) {
      selectEl.value = code === "en" ? "" : code;
      selectEl.dispatchEvent(new Event("change", { bubbles: true }));

      if (code === "en") {
        document.documentElement.classList.remove("translated-ltr", "translated-rtl");
        document.body.classList.remove("translated-ltr", "translated-rtl");
      }
      return;
    }

    attempts += 1;
    if (attempts < maxAttempts) {
      setTimeout(tryApply, 120);
    }
  };

  tryApply();
}

declare global {
  interface Window {
    google?: {
      translate?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        TranslateElement: any;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const savedLangRef = useRef<SupportedCode | null>(getSavedLanguage());
  const initialLangRef = useRef<SupportedCode>(savedLangRef.current ?? detectBrowserLanguage());
  const [current, setCurrent] = useState<SupportedCode>(initialLangRef.current);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initial = initialLangRef.current;

    // English must clear cookie (not /en/en) to avoid wrong-language fallback.
    if (initial === "en") {
      clearGoogTransCookie();
    } else {
      setGoogTransCookie(initial);
    }

    window.googleTranslateElementInit = () => {
      new window.google!.translate!.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar,nl,fr,de,it,pt,ru,es",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      applyGoogleLanguage(initial);
    };

    if (document.getElementById("google-translate-script")) {
      applyGoogleLanguage(initial);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLanguage = (code: SupportedCode) => {
    setCurrent(code);
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, code);
    applyGoogleLanguage(code);
  };

  const activeLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative notranslate" translate="no">
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
              className={`w-full text-left px-3 py-2 text-sm font-body flex items-center gap-2.5 transition-colors hover:bg-muted ${current === lang.code
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
