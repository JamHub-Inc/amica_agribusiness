import React, { useState, useEffect } from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, ShieldCheck, ArrowRight, Loader2, Info, CheckCircle2 } from 'lucide-react';
import { saccoService } from '../../services/saccoService';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export default function SACCOAffiliation() {
  const { user, setUser } = useAuth();
  const [saccos, setSaccos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    loadSaccos();
  }, []);

  const loadSaccos = async () => {
    try {
      setLoading(true);
      const response = await saccoService.listSaccos();
      setSaccos(response.data || []);
    } catch (error) {
      console.error('Failed to load SACCOs:', error);
      toast.error('Failed to load available SACCO networks');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (saccoId) => {
    try {
      setJoiningId(saccoId);
      const response = await authService.joinSacco(saccoId);
      toast.success('Successfully affiliated with the SACCO');
      // Update local storage and context
      const updatedUser = { ...user, saccoId: saccoId, sacco: response.user.sacco };
      setUser(updatedUser);
      localStorage.setItem('Amica_user', JSON.stringify(updatedUser));
    } catch (error) {
      toast.error(error.message || 'Affiliation failed');
    } finally {
      setJoiningId(null);
    }
  };

  const currentSacco = saccos.find(s => s.id === user?.saccoId) || user?.sacco;

  return (
    <FarmerDashboardLayout title="SACCO Affiliation">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-normal font-serif text-foreground">Corporative Network</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-70">
              {user?.saccoId ? 'Your active agricultural affiliation' : 'Connect with a SACCO to unlock financial & market power'}
            </p>
          </div>
        </div>

        {user?.saccoId && currentSacco ? (
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-primary text-primary-foreground relative p-1">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Building2 className="h-48 w-48" />
            </div>
            <CardContent className="p-10 relative z-10 flex flex-col md:flex-row gap-10 items-center">
               <div className="h-32 w-32 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0">
                  <CheckCircle2 className="h-16 w-16 text-white" />
               </div>
               <div className="space-y-4 flex-1">
                  <Badge className="bg-white/20 text-white border-none px-4 py-1 uppercase font-black text-[10px] tracking-[0.2em]">Active Membership</Badge>
                  <h2 className="text-4xl font-serif">{currentSacco.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                     <div className="flex items-center gap-3 text-white/80">
                        <MapPin className="h-5 w-5" />
                        <span className="font-bold text-sm uppercase tracking-widest">{currentSacco.location}</span>
                     </div>
                     <div className="flex items-center gap-3 text-white/80">
                        <Users className="h-5 w-5" />
                        <span className="font-bold text-sm uppercase tracking-widest">{currentSacco._count?.members || '...'} Members Affiliated</span>
                     </div>
                  </div>
               </div>
               <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
                  <Button className="h-14 px-8 rounded-2xl bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest text-xs shadow-xl">Manage Membership</Button>
                  <Button variant="ghost" className="h-14 px-8 rounded-2xl text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs">Member Directory</Button>
               </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-card rounded-[2.5rem] bg-card p-10 flex flex-col items-center text-center space-y-6">
             <div className="h-20 w-20 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary">
                <Info className="h-10 w-10" />
             </div>
             <div className="max-w-md">
                <h3 className="text-2xl font-serif mb-2">Join the Infrastructure</h3>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                   Find a SACCO near your base of operations to access credit facilities and collective marketing power.
                </p>
             </div>
          </Card>
        )}

        <div className="space-y-6">
           <h3 className="text-xl font-normal font-serif border-l-4 border-primary pl-4">Available Networks</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                [1,2,3].map(i => <div key={i} className="h-64 rounded-[2.5rem] bg-muted animate-pulse border-none"></div>)
              ) : saccos.filter(s => s.id !== user?.saccoId).length === 0 ? (
                <div className="col-span-full py-20 text-center opacity-30 italic font-serif text-lg">
                   No other SACCO branches found in your vicinity.
                </div>
              ) : (
                saccos.filter(s => s.id !== user?.saccoId).map(sacco => (
                  <Card key={sacco.id} className="border-none shadow-card rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-card">
                    <CardHeader className="p-8 pb-4">
                      <div className="flex justify-between items-start">
                         <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                            <Building2 className="h-7 w-7" />
                         </div>
                         <Badge className="bg-success/10 text-success border-none px-3 py-1 uppercase font-black text-[9px] tracking-widest">Recruiting</Badge>
                      </div>
                      <div className="mt-6">
                         <CardTitle className="text-xl font-serif">{sacco.name}</CardTitle>
                         <CardDescription className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 opacity-60">
                            <MapPin className="h-3 w-3 text-primary" /> {sacco.location}
                         </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-4 space-y-6">
                       <div className="bg-muted/30 p-4 rounded-2xl border border-border/5 flex items-center justify-between">
                          <div>
                             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Affiliation Size</p>
                             <p className="text-lg font-serif">{(sacco._count?.members || 0).toLocaleString()}</p>
                          </div>
                          <Users className="h-5 w-5 text-muted-foreground opacity-30" />
                       </div>
                       <Button 
                        className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 transition-all gap-3"
                        onClick={() => handleJoin(sacco.id)}
                        disabled={joiningId !== null}
                       >
                          {joiningId === sacco.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                          {joiningId === sacco.id ? 'Establishing Connect...' : 'Join Network'}
                       </Button>
                    </CardContent>
                  </Card>
                ))
              )}
           </div>
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
