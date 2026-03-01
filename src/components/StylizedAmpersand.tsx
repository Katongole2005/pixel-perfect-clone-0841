interface StylizedAmpersandProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "text-[1em]",
  md: "text-[1.15em]",
  lg: "text-[1.3em]",
  xl: "text-[1.5em]",
};

/**
 * A decorative serif italic ampersand using the Playfair Display font.
 * Renders inline so it can be placed inside text naturally.
 */
const StylizedAmpersand = ({ className = "", size = "md" }: StylizedAmpersandProps) => (
  <span
    className={`inline font-display italic font-bold ${sizeMap[size]} leading-none ${className}`}
    aria-hidden="true"
  >
    &amp;
  </span>
);

export default StylizedAmpersand;
