import {
    Dribbble,
    Facebook,
    Github,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logoFallback from "@/assets/brand-logo";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Footer4Col() {
    const { settings } = useSiteSettings();
    const { contact, images, about } = settings;

    const data = {
        facebookLink: 'https://facebook.com/freshtracksafrica',
        instaLink: 'https://instagram.com/freshtracksafrica',
        twitterLink: 'https://twitter.com/freshtracksafrica',
        githubLink: 'https://github.com/freshtracksafrica',
        dribbbleLink: 'https://dribbble.com/freshtracksafrica',
        services: {
            gorilla: '/gorilla-trekking',
            national_parks: '/national-parks',
            cultural: '/cultural-tours',
            adventure: '/adventure-safaris',
        },
        about: {
            history: '/about',
            team: '/about#team',
            reviews: '/reviews',
            careers: '/careers',
        },
        help: {
            faqs: '/faq',
            support: '/contact',
            booking: '/plan-your-trip',
        },
        contact: {
            email: contact.email || 'info@freshtracksafrica.com',
            phone: contact.phone || '+256 753 171457',
            address: contact.address || 'Kampala, Uganda',
        },
        company: {
            name: 'Fresh Tracks Africa',
            description:
                'Your trusted partner for unforgettable East African adventures since 2015. We specialize in gorilla trekking, wildlife safaris, and cultural tours across Uganda and Rwanda.',
            logo: images.logo_footer || images.logo_main || logoFallback,
        },
    };

    const socialLinks = [
        { icon: Facebook, label: 'Facebook', href: data.facebookLink },
        { icon: Instagram, label: 'Instagram', href: data.instaLink },
        { icon: Twitter, label: 'Twitter', href: data.twitterLink },
        { icon: Github, label: 'GitHub', href: data.githubLink },
        { icon: Dribbble, label: 'Dribbble', href: data.dribbbleLink },
    ];

    const aboutLinks = [
        { text: 'Company History', href: data.about.history },
        { text: 'Meet the Team', href: data.about.team },
        { text: 'Customer Reviews', href: data.about.reviews },
        { text: 'Careers', href: data.about.careers },
    ];

    const serviceLinks = [
        { text: 'Gorilla Trekking', href: data.services.gorilla },
        { text: 'National Parks', href: data.services.national_parks },
        { text: 'Cultural Tours', href: data.services.cultural },
        { text: 'Adventure Safaris', href: data.services.adventure },
    ];

    const helpfulLinks = [
        { text: 'FAQs', href: data.help.faqs },
        { text: 'Contact Support', href: data.help.support },
        { text: 'Plan Your Trip', href: data.help.booking, hasIndicator: true },
    ];

    const contactInfo = [
        { icon: Mail, text: data.contact.email },
        { icon: Phone, text: data.contact.phone },
        { icon: MapPin, text: data.contact.address, isAddress: true },
    ];

    return (
        <footer className="bg-secondary/10 dark:bg-secondary/20 mt-16 w-full place-self-end rounded-t-xl" aria-label="Site footer — Fresh Tracks Africa Tours & Travel">
            <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="flex justify-center sm:justify-start">
                            <img
                                src={data.company.logo}
                                alt="Fresh Tracks Africa Tours & Travel Ltd. logo"
                                className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        <p className="text-foreground/70 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
                            {data.company.description}
                        </p>

                        <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                            {socialLinks.map(({ icon: Icon, label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-secondary hover:text-secondary/80 transition"
                                    >
                                        <span className="sr-only">{label}</span>
                                        <Icon className="size-6" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2" aria-label="Footer navigation">
                        <div className="text-center sm:text-left">
                            <h4 className="text-lg font-medium">About Us</h4>
                            <ul className="mt-8 space-y-4 text-sm">
                                {aboutLinks.map(({ text, href }) => (
                                    <li key={text}>
                                        <Link
                                            className="text-foreground/70 transition hover:text-secondary"
                                            to={href}
                                        >
                                            {text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center sm:text-left">
                            <h4 className="text-lg font-medium">Our Services</h4>
                            <ul className="mt-8 space-y-4 text-sm">
                                {serviceLinks.map(({ text, href }) => (
                                    <li key={text}>
                                        <Link
                                            className="text-foreground/70 transition hover:text-secondary"
                                            to={href}
                                        >
                                            {text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center sm:text-left">
                            <h4 className="text-lg font-medium">Helpful Links</h4>
                            <ul className="mt-8 space-y-4 text-sm">
                                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                                    <li key={text}>
                                        <Link
                                            to={href}
                                            className={
                                                hasIndicator
                                                    ? 'group flex justify-center items-center gap-1.5 sm:justify-start text-foreground/70 transition hover:text-secondary'
                                                    : 'text-foreground/70 transition hover:text-secondary'
                                            }
                                        >
                                            <span>{text}</span>
                                            {hasIndicator && (
                                                <span className="relative flex size-2 ml-1">
                                                    <span className="bg-secondary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                                                    <span className="bg-secondary relative inline-flex size-2 rounded-full" />
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center sm:text-left">
                            <h4 className="text-lg font-medium">Contact Us</h4>
                            <ul className="mt-8 space-y-4 text-sm">
                                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                                    <li key={text}>
                                        <div className="flex items-center justify-center gap-2 sm:justify-start">
                                            <Icon className="text-secondary size-5 shrink-0 shadow-sm" />
                                            {isAddress ? (
                                                <address className="text-foreground/70 -mt-0.5 flex-1 not-italic transition ext-sm">
                                                    {text}
                                                </address>
                                            ) : (
                                                <span className="text-foreground/70 flex-1 transition text-sm">
                                                    {text}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="mt-12 border-t border-secondary/20 pt-6 pb-2">
                    <div className="text-center sm:flex sm:justify-between sm:text-left items-center">
                        <p className="text-foreground/70 mt-4 text-sm transition sm:order-first sm:mt-0">
                            &copy; 2026 {data.company.name}
                        </p>

                        <p className="text-sm text-foreground/70">
                            <span className="block sm:inline">All rights reserved.</span>
                        </p>
                    </div>
                    <div className="text-center mt-4">
                        <Link
                            to="/admin/login"
                            className="text-foreground/30 hover:text-foreground/60 text-xs transition-colors"
                            aria-label="Admin login"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

