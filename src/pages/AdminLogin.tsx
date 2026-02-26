import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setIsLoading(true);
    const { error } = await signIn(email.trim(), password);
    setIsLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0a0a1a] to-[#0a1a0a] opacity-80" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Radial glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl" />

      {/* Animated glow spots */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-600/8 blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-teal-500/8 blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D Card */}
      <div style={{ perspective: "1200px" }} className="z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          {/* Traveling light beam border */}
          <div className="absolute -inset-[1px] rounded-2xl overflow-hidden z-0">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              {/* Beams */}
              <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent blur-sm" />
              <div className="absolute top-1/4 right-0 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-teal-400/40 to-transparent blur-sm" />
              <div className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent blur-sm" />
              <div className="absolute top-1/4 left-0 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-teal-400/30 to-transparent blur-sm" />
            </motion.div>

            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />
          </div>

          {/* Glass card */}
          <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06] p-8 z-10">
            {/* Inner pattern */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            </div>

            {/* Logo and header */}
            <div className="relative text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center mb-5 overflow-hidden"
              >
                <img src={logo} alt="Godka Tours" className="w-10 h-10 object-contain" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-2xl" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white tracking-tight"
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/40 text-sm mt-1.5"
              >
                Sign in to manage Godka Tours
              </motion.p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative space-y-4">
              {/* Email */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                <label className="text-xs font-medium text-white/50 mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 z-10" />
                  <input
                    type="email"
                    placeholder="admin@godkatours.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full bg-white/[0.05] border border-transparent focus:border-white/20 text-white placeholder:text-white/25 h-11 rounded-lg transition-all duration-300 pl-10 pr-3 text-sm focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                    required
                  />
                  {focusedInput === "email" && (
                    <motion.div
                      layoutId="inputHighlight"
                      className="absolute inset-0 rounded-lg border border-emerald-500/30 pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Password */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
                <label className="text-xs font-medium text-white/50 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 z-10" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full bg-white/[0.05] border border-transparent focus:border-white/20 text-white placeholder:text-white/25 h-11 rounded-lg transition-all duration-300 pl-10 pr-10 text-sm focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {focusedInput === "password" && (
                    <motion.div
                      layoutId="inputHighlight"
                      className="absolute inset-0 rounded-lg border border-emerald-500/30 pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Sign in button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="pt-2"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 via-teal-500/30 to-emerald-600/30 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full h-11 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-sm flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <span className="relative z-10 flex items-center gap-2">
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
