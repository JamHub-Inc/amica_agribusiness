import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../../context/AuthContext';
import { Shield, Activity, ArrowRight } from 'lucide-react';

export default function AdminWelcomeBlock() {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/85 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
      <div className="absolute top-4 right-6">
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
          <Activity className="h-3 w-3 text-success animate-pulse" />
          <span className="text-[10px] uppercase font-medium tracking-widest text-white/90">System Operational</span>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-accent" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">Administrator Console</span>
        </div>
        <h2 className="text-3xl font-serif mb-1 tracking-tight">Welcome back, {user?.name?.split(' ')[0] || 'Admin'}!</h2>
        <div className="flex gap-3 mt-6">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-medium gap-2 group">
            View Reports <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-medium">
            Manage Users
          </Button>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-30%] left-[-5%] w-56 h-56 bg-accent/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-4 right-8 opacity-[0.03]">
        <Shield className="h-40 w-40" />
      </div>
    </div>
  );
}
