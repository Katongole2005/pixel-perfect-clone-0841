import LanguageSelector from "./LanguageSelector";

const TopBar = () => (
  <div className="bg-primary py-2 px-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <p className="text-primary-foreground/70 text-xs font-body tracking-wide hidden sm:block">
        Trusted Tour Operator — Uganda & Rwanda
      </p>
      <div className="flex items-center gap-4 sm:gap-6 mx-auto sm:mx-0">
        <a
          href="/trip-search"
          className="text-primary-foreground text-xs font-body font-semibold tracking-wider hover:text-secondary transition-colors"
        >
          View All Travel Dates →
        </a>
        <div className="w-px h-4 bg-primary-foreground/20 hidden sm:block" />
        <LanguageSelector />
      </div>
    </div>
  </div>
);

export default TopBar;
