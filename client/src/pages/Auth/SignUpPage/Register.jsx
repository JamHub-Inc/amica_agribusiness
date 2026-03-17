import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Lock, Mail, User, Phone, MapPin,
  ArrowLeft, ArrowRight, CheckCircle2, Leaf, Shield, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

/* ─── Background slides (Unsplash agriculture) ─── */
const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80",
    quote: "Connecting farmers to markets, buyers, and opportunities across Africa.",
    stat: "12,000+ Farmers",
  },
  {
    url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&auto=format&fit=crop&q=80",
    quote: "Modern agribusiness tools that grow with your land and your ambitions.",
    stat: "98% Satisfaction",
  },
  {
    url: "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=1200&auto=format&fit=crop&q=80",
    quote: "From seedling to sale — Amica supports every step of your journey.",
    stat: "45 Counties Covered",
  },
];

/* ─── Validation schema ─── */
const schema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(9, "Enter a valid phone number").optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[a-zA-Z]/, "Must contain at least one letter"),
  terms: z.boolean().refine((v) => v === true, { message: "You must accept the terms" }),
});

/* ─── Strength meter ─── */
function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Letter", ok: /[a-zA-Z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ["bg-destructive", "bg-warning", "bg-success"];
  const labels = ["Weak", "Fair", "Strong"];

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : "bg-border"}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map((c) => (
            <span key={c.label} className={`flex items-center gap-1 text-xs ${c.ok ? "text-success" : "text-muted-foreground"}`}>
              <CheckCircle2 className={`h-3 w-3 ${c.ok ? "text-success" : "text-border"}`} />
              {c.label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span className={`text-xs font-bold ${score === 3 ? "text-success" : score === 2 ? "text-warning" : "text-destructive"}`}>
            {labels[score - 1]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [slide, setSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", location: "", password: "", terms: false },
    mode: "onChange",
  });

  const password = form.watch("password");

  const onSubmit = async (values) => {
    setSubmitting(true);
    setServerError("");
    try {
      const { terms, ...payload } = values;
      const data = await register(payload);

      if (data.verificationRequired) {
        localStorage.setItem("Amica_pending_email", values.email);
        navigate("/verify-email", { state: { email: values.email } });
      } else {
        navigate(data.redirectTo || "/farmers-dashboard");
      }
    } catch (err) {
      setServerError(err.message || "Registration failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      {/* ── Left: Slideshow panel ── */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-[45%] p-5 bg-primary/5"
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          {/* Slide images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-10" />
              <img
                src={SLIDES[slide].url}
                alt="Agribusiness"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Logo top-left */}
          <div className="absolute top-8 left-8 z-20">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772099480/AmicaLogo-removebg-preview_y4gzdc.png"
                alt="Amica Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <span className="text-white font-black text-xl tracking-tight">Amica</span>
            </Link>
          </div>

          {/* Stat badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`stat-${slide}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-8 right-8 z-20 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold"
            >
              {SLIDES[slide].stat}
            </motion.div>
          </AnimatePresence>

          {/* Bottom content */}
          <div className="absolute bottom-10 left-8 right-8 z-20">
            {/* Trust badges */}
            <div className="flex gap-3 mb-6">
              {[
                { icon: <Shield className="h-4 w-4" />, label: "Secure" },
                { icon: <Users className="h-4 w-4" />, label: "Community" },
                { icon: <Leaf className="h-4 w-4" />, label: "Sustainable" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-semibold">
                  {b.icon} {b.label}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={`quote-${slide}`}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white text-xl font-bold leading-snug mb-6"
              >
                "{SLIDES[slide].quote}"
              </motion.p>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-accent" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Right: Registration form ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-[55%] flex flex-col items-center overflow-y-auto py-12 px-6 md:px-12 lg:px-16"
      >
        <div className="w-full max-w-md">
          {/* Back button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground gap-2 px-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="mb-8">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-5 lg:hidden">
              <img
                src="https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772099480/AmicaLogo-removebg-preview_y4gzdc.png"
                alt="Amica Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="text-xl font-black text-primary tracking-tight">Amica</span>
            </div>
            <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">
              Join Amica
            </h1>
            <p className="text-muted-foreground">
              Create your free account and connect with farmers, buyers, and supervisors.
            </p>
          </div>

          {/* Server error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium"
              >
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-foreground/80">
                      Full Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g. John Kamau"
                          className="pl-10 h-12 rounded-xl bg-muted/30 border-border focus:border-primary"
                          {...field}
                          disabled={submitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-foreground/80">
                      Email Address <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10 h-12 rounded-xl bg-muted/30 border-border focus:border-primary"
                          {...field}
                          disabled={submitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone & Location side by side */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground/80">Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder="+254 700 000 000"
                            className="pl-10 h-12 rounded-xl bg-muted/30 border-border focus:border-primary"
                            {...field}
                            disabled={submitting}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground/80">Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="e.g. Nakuru"
                            className="pl-10 h-12 rounded-xl bg-muted/30 border-border focus:border-primary"
                            {...field}
                            disabled={submitting}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-foreground/80">
                      Password <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPw ? "text" : "password"}
                          placeholder="At least 8 characters"
                          className="pl-10 pr-12 h-12 rounded-xl bg-muted/30 border-border focus:border-primary"
                          {...field}
                          disabled={submitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw(!showPw)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <PasswordStrength password={password} />
                  </FormItem>
                )}
              />

              {/* Terms */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0 pt-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 border-primary/50 data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-muted-foreground leading-tight font-normal">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary font-semibold hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link to="/privacy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting || !form.formState.isValid}
                className="w-full h-12 rounded-xl font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 mt-2"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Creating Account…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          {/* Sign in link */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>

          {/* Role info note */}
          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              🌱 New accounts are registered as <span className="text-primary font-semibold">Farmers</span> by default.
              Your account administrator can upgrade your role to Supervisor, Vendor, or Admin.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
