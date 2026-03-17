import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { authService } from "../../../services/authService";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, ArrowRight, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const email = location.state?.email || localStorage.getItem("Amica_pending_email") || user?.email;

  useEffect(() => {
    if (!email && !user) {
      navigate("/login");
    }
  }, [email, user, navigate]);

  // Countdown for resend
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const onVerify = async (e) => {
    e.preventDefault();
    if (code.length !== 6) return setError("Please enter the 6-digit code");

    setSubmitting(true);
    setError("");
    try {
      await authService.verifyEmail({ code });
      setSuccess("Email verified! Redirecting to login...");
      
      // Clear current "unverified" session so they can perform a fresh login
      setTimeout(async () => {
        await logout();
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Invalid or expired code");
      setSubmitting(false);
    }
  };

  const onResend = async () => {
    setResending(true);
    setError("");
    setSuccess("");
    try {
      // Find userId: either from auth user or we might need to send email to backend to find it
      // For simplicity, if user is logged in (but not verified), we have the id.
      // If they just registered, we might need to handle the "userId" from the login redirect error.
      const userId = user?.id; 
      await authService.resendVerification({ userId });
      setSuccess("A new code has been sent to your email.");
      setTimeLeft(60); // Wait 1 minute before next resend
    } catch (err) {
      setError(err.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-primary/10 p-4 rounded-2xl mb-6">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Verify your email</h1>
          <p className="text-muted-foreground mt-2">
            We've sent a 6-digit verification code to <br />
            <span className="text-foreground font-bold">{email || "your email"}</span>
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl mb-6 font-medium"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-success/10 border border-success/20 text-success text-sm p-4 rounded-xl mb-6 font-medium"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={onVerify} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70 pl-1 text-center block">
              Enter 6-digit code
            </label>
            <div className="flex justify-center">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0,6))}
                placeholder="000000"
                className="h-16 text-3xl font-black text-center tracking-[0.5em] rounded-2xl bg-muted/30 border-2 focus:border-primary border-transparent transition-all"
                disabled={submitting}
                autoFocus
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting || code.length !== 6}
            className="w-full h-14 rounded-2xl font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            {submitting ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Verify Account <ArrowRight className="h-5 w-5" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              onClick={onResend}
              disabled={resending || timeLeft > 0}
              className="text-primary font-bold hover:underline disabled:opacity-50 disabled:no-underline"
            >
              {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend Code"}
            </button>
          </p>
          
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
