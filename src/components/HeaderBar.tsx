import { Phone, Mail } from "lucide-react";
import logoFallback from "@/assets/brand-logo";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const HeaderBar = () => {
  const { settings } = useSiteSettings();
  const { contact, images } = settings;

  return (
    <div className="bg-card py-3 px-4 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src={images.logo_main || logoFallback}
            alt="Fresh Tracks Africa Tours & Travel Ltd. — Uganda & Rwanda safari tour operator"
            className="h-16 sm:h-20 lg:h-24 w-auto object-contain bg-transparent"
            width="120"
            height="96"
            decoding="async"
            fetchPriority="high"
          />
        </a>

        {/* Contact info */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-body font-semibold">Call Us</p>
              <p className="text-sm font-bold text-foreground font-body">{contact.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-body font-semibold">Email Us</p>
              <p className="text-sm font-bold text-foreground font-body">{contact.email}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href="/plan-your-trip"
          className="bg-secondary text-secondary-foreground px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-body font-bold tracking-wide hover:bg-brand-brown transition-colors"
        >
          Plan Your Trip!
        </a>
      </div>
    </div>
  );
};

export default HeaderBar;

