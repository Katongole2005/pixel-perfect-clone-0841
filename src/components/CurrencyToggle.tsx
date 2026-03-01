import { useCurrency, Currency } from "@/contexts/CurrencyContext";
import { motion } from "framer-motion";

const currencies: Currency[] = ["USD", "EUR", "GBP"];

const CurrencyToggle = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="inline-flex items-center bg-muted rounded-full p-0.5 text-xs font-body">
      {currencies.map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className="relative px-3 py-1 rounded-full transition-colors duration-200"
        >
          {currency === c && (
            <motion.span
              layoutId="currency-pill"
              className="absolute inset-0 bg-secondary rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 font-bold ${currency === c ? "text-secondary-foreground" : "text-muted-foreground"}`}>
            {c}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CurrencyToggle;
