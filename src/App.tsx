import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Loader2 } from "lucide-react";
import PublicLayout from "./components/layout/PublicLayout";

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

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
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
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
