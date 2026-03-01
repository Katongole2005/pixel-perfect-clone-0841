import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy, useState, useCallback } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import PublicLayout from "./components/layout/PublicLayout";
import Preloader from "./components/Preloader";

const Index = lazy(() => import("./pages/Index"));
const GorillaTrekkingPage = lazy(() => import("./pages/GorillaTrekking"));
const ContactPage = lazy(() => import("./pages/Contact"));
const AboutPage = lazy(() => import("./pages/About"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const NationalParksPage = lazy(() => import("./pages/NationalParks"));
const TripSearchResults = lazy(() => import("./pages/TripSearchResults"));
const PlanYourTrip = lazy(() => import("./pages/PlanYourTrip"));
const ReviewsPage = lazy(() => import("./pages/Reviews"));
const TravelTopicsPage = lazy(() => import("./pages/TravelTopics"));
const CulturalToursPage = lazy(() => import("./pages/CulturalTours"));
const AdventureSafarisPage = lazy(() => import("./pages/AdventureSafaris"));
const TravelTipsPage = lazy(() => import("./pages/TravelTips"));
const TrekkingInfoPage = lazy(() => import("./pages/TrekkingInfo"));
const CareersPage = lazy(() => import("./pages/Careers"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminTrips = lazy(() => import("./pages/admin/AdminTrips"));
const AdminNews = lazy(() => import("./pages/admin/AdminNews"));
const AdminPartners = lazy(() => import("./pages/admin/AdminPartners"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminTripRequests = lazy(() => import("./pages/admin/AdminTripRequests"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminReviews = lazy(() => import("./pages/admin/AdminReviews"));
const AdminTravelTopics = lazy(() => import("./pages/admin/AdminTravelTopics"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);

  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <CurrencyProvider>
              <Toaster />
              <Sonner />

              <AnimatePresence mode="wait">
                {!loaded && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
              </AnimatePresence>

              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public routes wrapped in PublicLayout */}
                    <Route element={<PublicLayout />}>
                      <Route path="/" element={<Index />} />
                      <Route path="/gorilla-trekking" element={<GorillaTrekkingPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/national-parks" element={<NationalParksPage />} />
                      <Route path="/trip-search" element={<TripSearchResults />} />
                      <Route path="/plan-your-trip" element={<PlanYourTrip />} />
                      <Route path="/reviews" element={<ReviewsPage />} />
                      <Route path="/travel-topics" element={<TravelTopicsPage />} />
                      <Route path="/cultural-tours" element={<CulturalToursPage />} />
                      <Route path="/adventure-safaris" element={<AdventureSafarisPage />} />
                      <Route path="/travel-tips" element={<TravelTipsPage />} />
                      <Route path="/trekking-info" element={<TrekkingInfoPage />} />
                      <Route path="/careers" element={<CareersPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/blog/:slug" element={<BlogPostPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Admin routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="trips" element={<AdminTrips />} />
                      <Route path="news" element={<AdminNews />} />
                      <Route path="partners" element={<AdminPartners />} />
                      <Route path="testimonials" element={<AdminTestimonials />} />
                      <Route path="reviews" element={<AdminReviews />} />
                      <Route path="travel-topics" element={<AdminTravelTopics />} />
                      <Route path="trip-requests" element={<AdminTripRequests />} />
                      <Route path="messages" element={<AdminMessages />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="blog" element={<AdminBlog />} />
                    </Route>
                  </Routes>
                </Suspense>
              </BrowserRouter>
              </CurrencyProvider>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
