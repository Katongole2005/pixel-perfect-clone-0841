import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { FloatingPaths } from "./background-paths";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
                className
            )}
            {...props}
        />
    )
}

interface SignInCardProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
    logoUrl?: string;
}

export function SignInCard({ onSubmit, isLoading, logoUrl }: SignInCardProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    // For 3D card effect - increased rotation range for more pronounced 3D effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (email && password) {
            await onSubmit(email, password);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0 text-slate-950">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-sm relative z-10 p-4"
                style={{ perspective: 1500 }}
            >
                <motion.div
                    className="relative"
                    style={{ rotateX, rotateY }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ z: 10 }}
                >
                    <div className="relative group">
                        {/* Card glow effect - reduced intensity */}
                        <motion.div
                            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                            animate={{
                                boxShadow: [
                                    "0 0 10px 2px rgba(255,255,255,0.03)",
                                    "0 0 15px 5px rgba(255,255,255,0.05)",
                                    "0 0 10px 2px rgba(255,255,255,0.03)"
                                ],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "mirror"
                            }}
                        />

                        {/* Traveling light beam effect - reduced opacity */}
                        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
                            {/* Top light beam - enhanced glow */}
                            <motion.div
                                className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
                                initial={{ filter: "blur(2px)" }}
                                animate={{
                                    left: ["-50%", "100%"],
                                    opacity: [0.3, 0.7, 0.3],
                                    filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"]
                                }}
                                transition={{
                                    left: {
                                        duration: 2.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    },
                                    opacity: {
                                        duration: 1.2,
                                        repeat: Infinity,
                                        repeatType: "mirror"
                                    },
                                    filter: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "mirror"
                                    }
                                }}
                            />

                            {/* Right light beam - enhanced glow */}
                            <motion.div
                                className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
                                initial={{ filter: "blur(2px)" }}
                                animate={{
                                    top: ["-50%", "100%"],
                                    opacity: [0.3, 0.7, 0.3],
                                    filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"]
                                }}
                                transition={{
                                    top: {
                                        duration: 2.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                        delay: 0.6
                                    },
                                    opacity: {
                                        duration: 1.2,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: 0.6
                                    },
                                    filter: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: 0.6
                                    }
                                }}
                            />

                            {/* Bottom light beam - enhanced glow */}
                            <motion.div
                                className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
                                initial={{ filter: "blur(2px)" }}
                                animate={{
                                    right: ["-50%", "100%"],
                                    opacity: [0.3, 0.7, 0.3],
                                    filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"]
                                }}
                                transition={{
                                    right: {
                                        duration: 2.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                        delay: 1.2
                                    },
                                    opacity: {
                                        duration: 1.2,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: 1.2
                                    },
                                    filter: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: 1.2
                                    }
                                }}
                            />

                            {/* Left light beam - enhanced glow */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
                                initial={{ filter: "blur(2px)" }}
                                animate={{
                                    bottom: ["-50%", "100%"],
                                    opacity: [0.3, 0.7, 0.3],
                                    filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"]
                                }}
                                transition={{
                                    bottom: {
                                        duration: 2.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                        delay: 1.8
                                    },
                                    opacity: {
                                        duration: 1.2,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: 1.8
                                    },
                                    filter: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: 1.8
                                    }
                                }}
                            />

                            {/* Subtle corner glow spots - reduced opacity */}
                            <motion.div
                                className="absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-white/40 blur-[1px]"
                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                            />
                            <motion.div
                                className="absolute top-0 right-0 h-[8px] w-[8px] rounded-full bg-white/60 blur-[2px]"
                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 2.4, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute bottom-0 right-0 h-[8px] w-[8px] rounded-full bg-white/60 blur-[2px]"
                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 2.2, repeat: Infinity, repeatType: "mirror", delay: 1 }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 h-[5px] w-[5px] rounded-full bg-white/40 blur-[1px]"
                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 2.3, repeat: Infinity, repeatType: "mirror", delay: 1.5 }}
                            />
                        </div>

                        {/* Card border glow - reduced opacity */}
                        <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-white/3 via-white/7 to-white/3 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                        {/* Glass card background */}
                        <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] shadow-2xl overflow-hidden">
                            {/* Subtle card inner patterns */}
                            <div className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                                    backgroundSize: '30px 30px'
                                }}
                            />

                            {/* Logo and header */}
                            <div className="text-center space-y-1 mb-5">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", duration: 0.8 }}
                                    className="mx-auto flex items-center justify-center mb-4"
                                >
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Logo" className="w-auto h-20 object-contain relative z-10 drop-shadow-lg" />
                                    ) : (
                                        <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">A</span>
                                    )}
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                                >
                                    Welcome Back
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-white/70 text-xs"
                                >
                                    Sign in to access the admin dashboard
                                </motion.p>
                            </div>

                            {/* Login form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <motion.div className="space-y-3">
                                    {/* Email input */}
                                    <motion.div
                                        className={`relative ${focusedInput === "email" ? 'z-10' : ''}`}
                                        whileFocus={{ scale: 1.02 }}
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                        <div className="relative flex items-center overflow-hidden rounded-lg">
                                            <Mail className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "email" ? 'text-white' : 'text-white/40'
                                                }`} />

                                            <Input
                                                type="email"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setFocusedInput("email")}
                                                onBlur={() => setFocusedInput(null)}
                                                className="w-full bg-white/10 border-white/10 focus:border-white/30 text-white placeholder:text-white/50 h-10 transition-all duration-300 pl-10 pr-3 focus:bg-white/15"
                                                required
                                            />

                                            {/* Input highlight effect */}
                                            {focusedInput === "email" && (
                                                <motion.div
                                                    layoutId="inputLib-highlight"
                                                    className="absolute inset-0 bg-white/5 -z-10"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Password input */}
                                    <motion.div
                                        className={`relative ${focusedInput === "password" ? 'z-10' : ''}`}
                                        whileFocus={{ scale: 1.02 }}
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                        <div className="relative flex items-center overflow-hidden rounded-lg">
                                            <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "password" ? 'text-white' : 'text-white/40'
                                                }`} />

                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onFocus={() => setFocusedInput("password")}
                                                onBlur={() => setFocusedInput(null)}
                                                className="w-full bg-white/10 border-white/10 focus:border-white/30 text-white placeholder:text-white/50 h-10 transition-all duration-300 pl-10 pr-10 focus:bg-white/15"
                                                required
                                            />

                                            {/* Toggle password visibility */}
                                            <div
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 cursor-pointer p-1"
                                            >
                                                {showPassword ? (
                                                    <Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                                                ) : (
                                                    <EyeClosed className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                                                )}
                                            </div>

                                            {/* Input highlight effect */}
                                            {focusedInput === "password" && (
                                                <motion.div
                                                    layoutId="inputLib-highlight"
                                                    className="absolute inset-0 bg-white/5 -z-10"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Remember me & Forgot password */}
                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="relative">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={() => setRememberMe(!rememberMe)}
                                                className="appearance-none h-4 w-4 rounded border border-white/20 bg-white/5 checked:bg-white checked:border-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
                                            />
                                            {rememberMe && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="absolute inset-0 flex items-center justify-center text-black pointer-events-none"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </div>
                                        <label htmlFor="remember-me" className="text-xs text-white/60 hover:text-white/80 transition-colors duration-200 cursor-pointer">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                {/* Sign in button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full relative group/button mt-5"
                                >
                                    {/* Button glow effect - reduced intensity */}
                                    <div className="absolute inset-0 bg-white/10 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" />

                                    <div className="relative overflow-hidden bg-white text-black font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                                        {/* Button background animation */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -z-10"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                                            style={{ opacity: isLoading ? 1 : 0, transition: 'opacity 0.3s ease' }}
                                        />

                                        <AnimatePresence mode="wait">
                                            {isLoading ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <div className="w-4 h-4 border-2 border-black/70 border-t-transparent rounded-full animate-spin" />
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="button-text"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center gap-1 text-sm font-medium"
                                                >
                                                    Sign In
                                                    <ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
