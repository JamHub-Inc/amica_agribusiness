import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../../context/AuthContext';
import { useOnlineStatus } from '../../../hooks/useOnlineStatus';
import { Wifi, WifiOff } from 'lucide-react';

export default function WelcomeBlock() {
  const { user } = useAuth();
  const isOnline = useOnlineStatus();

  return (
    <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
      <div className="absolute top-6 right-8">
        {isOnline ? (
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-medium tracking-widest text-white/90">Online</span>
            <Wifi size={12} className="text-white/70" />
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-destructive/20 px-3 py-1 rounded-full backdrop-blur-md border border-destructive/30">
            <div className="w-2 h-2 bg-destructive rounded-full"></div>
            <span className="text-[10px] uppercase font-medium tracking-widest text-white/90">Offline Mode</span>
            <WifiOff size={12} className="text-white/70" />
          </div>
        )}
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-serif mb-2 tracking-tight">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 🌱</h2>
        <div className="flex gap-4 mt-6">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-medium">
            View Reports
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-medium">
            Manage Crops
          </Button>
        </div>
      </div>
      {/* Decorative background circles */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-secondary rounded-full opacity-10 blur-2xl"></div>
    </div>
  );
}
