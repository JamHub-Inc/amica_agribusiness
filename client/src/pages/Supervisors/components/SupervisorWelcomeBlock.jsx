import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../../context/AuthContext';
import { Building2, Activity, ArrowRight, UserPlus, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { saccoService } from '../../../services/saccoService';

export default function SupervisorWelcomeBlock() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    saccoService.getStats()
      .then(res => setStats(res.data))
      .catch(err => console.error('Failed to load sacco stats:', err));
  }, []);

  return (
    <div className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary/85 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
      <div className="absolute top-4 right-6">
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
          <Activity className="h-3 w-3 text-success animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/90">Branch Active</span>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-5 w-5 text-accent" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/70">Cooperative Supervisor</span>
        </div>
        <h2 className="text-3xl font-serif mb-1 tracking-tight">Hi, Supervisor {user?.name?.split(' ')[0] || ''}!</h2>
        <p className="text-sm text-white/70 font-normal max-w-lg mb-6">
          You are currently managing the {stats?.saccoName || 'Cooperative'} Branch. You have {stats?.pendingLoans || 0} pending loan requests and {stats?.pendingProduce || 0} produce entries awaiting your verification.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/supervisor/produce')} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold gap-2 group shadow-lg shadow-black/10">
            <FileCheck className="h-4 w-4" /> Verify Produce
          </Button>
          <Button onClick={() => navigate('/supervisor/members')} variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-bold gap-2">
            <UserPlus className="h-4 w-4" /> Manage Members
          </Button>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-30%] left-[-5%] w-56 h-56 bg-accent/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-4 right-8 opacity-[0.05]">
        <Building2 className="h-40 w-40" />
      </div>
    </div>
  );
}
