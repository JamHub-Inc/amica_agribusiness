import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";

const ROLE_ROUTES = {
  SYSTEM_ADMIN: "/super-admin-dashboard",
  FARMER: "/farmers-dashboard",
  SUPERVISOR: "/supervisors-dashboard",
  VENDOR: "/vendor/dashboard",
  BUYER: "/vendor/dashboard",
  WHOLESALER: "/vendor/dashboard",
  SALES: "/vendor/dashboard",
};

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/* Background image: aerial farm view */
const BG_IMAGE =
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&auto=format&fit=crop&q=80";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const from = location.state?.from || null;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    setServerError("");
    try {
      const data = await login(values);

      // Check verification
      if (data.verificationRequired) {
        navigate("/verify-email", { state: { email: values.email } });
        return;
      }

      // Role-based redirect
      const destination = from || data.redirectTo || ROLE_ROUTES[data.role] || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setServerError(err.message || "Invalid email or password.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* ── Left: form panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-[45%] flex flex-col justify-center px-6 md:px-14 lg:px-20 py-12"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Back */}
          <div className="mb-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground gap-2 px-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <img
              src="https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772099480/AmicaLogo-removebg-preview_y4gzdc.png"
              alt="Amica Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-2xl font-black text-primary tracking-tight">Amica</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">
              Welcome back 👋
            </h1>
            <p className="text-muted-foreground">
              Sign in to your Amica Agribusiness account.
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-foreground/80">
                      Email Address
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="font-semibold text-foreground/80">Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-primary font-semibold hover:underline underline-offset-4"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPw ? "text" : "password"}
                          placeholder="••••••••"
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
                    Signing In…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          {/* Register link */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline underline-offset-4">
              Get Started — it's free
            </Link>
          </p>
        </div>
      </motion.div>

      {/* ── Right: visual panel ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/40 to-transparent z-10" />
        <img
          src={BG_IMAGE}
          alt="Agricultural landscape"
          className="w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Stats row */}
            <div className="flex gap-6">
              {[
                { value: "12K+", label: "Farmers" },
                { value: "450+", label: "Vendors" },
                { value: "45", label: "Counties" },
              ].map((s) => (
                <div key={s.label} className="bg-black/30 backdrop-blur-sm rounded-2xl px-5 py-3 text-white">
                  <div className="text-2xl font-black text-accent">{s.value}</div>
                  <div className="text-xs font-medium opacity-80">{s.label}</div>
                </div>
              ))}
            </div>

            <blockquote className="text-white text-2xl font-bold leading-snug max-w-lg">
              "Amica connects the agricultural value chain — from farm to fork — with technology built for Africa."
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center font-black text-accent-foreground">
                A
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Amica Agribusiness</p>
                <p className="text-white/60 text-xs">Nairobi, Kenya</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
