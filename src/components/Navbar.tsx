import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Facebook, Instagram, Twitter, Menu, X, Mail, BookOpen, Info, HelpCircle, Map } from "lucide-react";

/* ── Nav structure ── */
type DropdownItem = { label: string; href: string; icon?: React.ElementType; description?: string };
type NavItem = { label: string; href: string; dropdown?: DropdownItem[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Travel Topics", href: "/travel-topics" },
  { label: "National Parks", href: "/national-parks" },
  { label: "Gorilla Trekking", href: "/gorilla-trekking" },
  {
    label: "Tips & Info",
    href: "#",
    dropdown: [
      {
        label: "Travel Tips",
        href: "#",
        icon: BookOpen,
        description: "Packing lists, visa info & health advice",
      },
      {
        label: "Trekking Info",
        href: "#",
        icon: Map,
        description: "What to expect on a gorilla or chimp trek",
      },
      {
        label: "FAQ",
        href: "/faq",
        icon: HelpCircle,
        description: "Common questions answered",
      },
      {
        label: "About Us",
        href: "/about",
        icon: Info,
        description: "Our story, team and mission",
      },
      {
        label: "Contact Us",
        href: "/contact",
        icon: Mail,
        description: "Get in touch with our team",
      },
    ],
  },
  { label: "Reviews", href: "/reviews" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
    if (latest > 50) setOpenDropdown(null);
  });

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  const baseLink =
    "group relative flex items-center gap-1 px-5 py-3 text-[13px] font-body font-bold uppercase tracking-wider text-primary-foreground/85 hover:text-secondary transition-all overflow-hidden";

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-primary/90 backdrop-blur-xl shadow-2xl shadow-black/20"
        : "bg-primary shadow-lg"
        }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Main navigation"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
        {/* Mobile left: social */}
        <div className="flex lg:hidden items-center gap-3">
          <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors"><Instagram className="w-4 h-4" /></a>
          <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors"><Twitter className="w-4 h-4" /></a>
        </div>

        {/* Mobile right: menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button className="p-2 text-primary-foreground/80"><Search className="w-4 h-4" /></button>
          <span className="text-primary-foreground/80 text-xs font-body font-bold tracking-widest">MENU</span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-primary-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ── Desktop nav ── */}
        <div className="hidden lg:flex items-center gap-0">
          {navItems.map((item) => {
            const hasDropdown = !!item.dropdown?.length;
            const isOpen = openDropdown === item.label;

            const triggerContent = (
              <>
                {item.label}
                {hasDropdown && (
                  <ChevronDown
                    className={`w-3 h-3 opacity-60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
                <span className="absolute bottom-1 left-5 right-5 h-[2px] bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </>
            );

            if (hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                >
                  <button className={baseLink}>{triggerContent}</button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-1 w-64 bg-card border border-border shadow-xl shadow-black/20 rounded-sm overflow-hidden z-50"
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.dropdown!.map((sub) => {
                          const Icon = sub.icon;
                          const isInternal = sub.href.startsWith("/");
                          const itemClass =
                            "flex items-start gap-3 px-4 py-3 hover:bg-secondary/10 transition-colors group/sub border-b border-border last:border-0";
                          const content = (
                            <>
                              {Icon && (
                                <div className="mt-0.5 w-8 h-8 rounded-md bg-secondary/10 flex items-center justify-center shrink-0 group-hover/sub:bg-secondary/20 transition-colors">
                                  <Icon className="w-4 h-4 text-secondary" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-body font-bold text-foreground group-hover/sub:text-secondary transition-colors">
                                  {sub.label}
                                </p>
                                {sub.description && (
                                  <p className="text-xs text-muted-foreground font-body leading-snug mt-0.5">
                                    {sub.description}
                                  </p>
                                )}
                              </div>
                            </>
                          );

                          return isInternal ? (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              className={itemClass}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {content}
                            </Link>
                          ) : (
                            <a key={sub.label} href={sub.href} className={itemClass}>
                              {content}
                            </a>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // Plain link (no dropdown)
            return item.href.startsWith("/") ? (
              <Link key={item.label} to={item.href} className={baseLink}>
                {triggerContent}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={baseLink}>
                {triggerContent}
              </a>
            );
          })}

          <button className="group p-3 hover:bg-primary-foreground/5 transition-colors ml-2 relative overflow-hidden">
            <Search className="w-4 h-4 text-primary-foreground/80 group-hover:text-secondary transition-colors duration-300" />
          </button>
        </div>

        {/* Desktop social */}
        <div className="hidden lg:flex items-center gap-4">
          {[Facebook, Instagram, Twitter].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              className="text-primary-foreground/50 hover:text-secondary transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-primary border-t border-primary-foreground/10 overflow-hidden"
          >
            <div className="px-4 pb-4">
              {navItems.map((item, i) => (
                <div key={item.label}>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between py-3.5 text-sm font-body font-bold uppercase tracking-wider text-primary-foreground/85 border-b border-primary-foreground/10 cursor-pointer"
                    onClick={() => item.dropdown ? toggleDropdown(item.label) : setMobileOpen(false)}
                  >
                    {item.href.startsWith("/") && !item.dropdown ? (
                      <Link to={item.href} className="flex-1" onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </Link>
                    ) : (
                      <span className="flex-1">{item.label}</span>
                    )}
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-4 h-4 opacity-60 transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </motion.div>

                  {/* Mobile sub-items */}
                  <AnimatePresence>
                    {item.dropdown && openDropdown === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-primary-foreground/5 rounded-sm mb-1"
                      >
                        {item.dropdown.map((sub) => {
                          const Icon = sub.icon;
                          const isInternal = sub.href.startsWith("/");
                          const subClass = "flex items-center gap-3 px-4 py-3 text-sm font-body text-primary-foreground/75 hover:text-secondary transition-colors border-b border-primary-foreground/5 last:border-0";
                          const content = (
                            <>
                              {Icon && <Icon className="w-4 h-4 text-secondary/70 shrink-0" />}
                              {sub.label}
                            </>
                          );
                          return isInternal ? (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              className={subClass}
                              onClick={() => { setMobileOpen(false); setOpenDropdown(null); }}
                            >
                              {content}
                            </Link>
                          ) : (
                            <a key={sub.label} href={sub.href} className={subClass}>
                              {content}
                            </a>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
