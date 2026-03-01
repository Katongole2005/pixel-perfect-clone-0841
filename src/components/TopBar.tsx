import StylizedAmpersand from "./StylizedAmpersand";

const TopBar = () => (
  <div className="bg-primary py-2 px-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <p className="text-primary-foreground/70 text-xs font-body tracking-wide hidden sm:block">
        Trusted Tour Operator — Uganda <StylizedAmpersand size="sm" /> Rwanda
      </p>
      <a
        href="#"
        className="text-primary-foreground text-xs font-body font-semibold tracking-wider hover:text-secondary transition-colors mx-auto sm:mx-0"
      >
        View All Travel Dates →
      </a>
    </div>
  </div>
);

export default TopBar;
