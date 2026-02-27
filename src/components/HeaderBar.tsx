import { Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const HeaderBar = () => (
  <div className="bg-card py-3 px-4 border-b border-border">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      {/* Logo */}
      <a href="/" className="flex-shrink-0">
        <img
          src={logo}
          alt="Godka Tours and Travels Ltd. — Uganda & Rwanda safari tour operator"
          className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
          width="120"
          height="96"
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
            <p className="text-sm font-bold text-foreground font-body">+256 753 171457</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-body font-semibold">Email Us</p>
            <p className="text-sm font-bold text-foreground font-body">info@godkatours.com</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <a
        href="/plan-your-trip"
        className="bg-secondary text-secondary-foreground px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-body font-bold tracking-wide hover:bg-godka-amber transition-colors"
      >
        Plan Your Trip!
      </a>
    </div>
  </div>
);

export default HeaderBar;
