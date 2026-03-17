import React from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, MapPin, Mail, Phone, Shield, Camera, Edit3, Save, TrendingUp, ShoppingBag, Package, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function VendorProfile() {
  const { user } = useAuth();
  
  const getUserInitials = () => {
    if (!user) return 'V';
    const nameParts = user.name ? user.name.split(' ') : [];
    if (nameParts.length >= 2) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    if (user.name) return user.name.substring(0, 2).toUpperCase();
    return 'V';
  };

  return (
    <VendorDashboardLayout title="Sales Personnel Profile">
      <div className="space-y-8">
        {/* Profile Header Block */}
        <div className="relative h-80 rounded-[3rem] overflow-hidden bg-primary shadow-2xl">
           <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay mx-auto" 
              alt="Profile cover"
           />
           <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/40 to-transparent"></div>
           
           <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-white/10 rounded-full blur-[120px]"></div>
           
           <div className="absolute bottom-10 left-10 flex flex-col md:flex-row items-end gap-10">
              <div className="relative group">
                 <div className="h-40 w-40 rounded-[2.5rem] bg-background p-2 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <div className="h-full w-full rounded-[2rem] bg-primary flex items-center justify-center text-primary-foreground font-normal text-5xl shadow-inner font-serif">
                       {getUserInitials()}
                    </div>
                 </div>
                 <Button className="absolute bottom-2 right-2 h-12 w-12 p-0 rounded-2xl bg-background text-foreground hover:bg-primary hover:text-primary-foreground shadow-xl transform group-hover:scale-110 active:scale-95 transition-all border-none">
                    <Camera className="h-6 w-6" />
                 </Button>
              </div>
              <div className="pb-4 space-y-2">
                 <div className="flex items-center gap-3">
                    <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tight drop-shadow-md font-serif">{user?.name || 'Sales Representative'}</h2>
                    <div className="bg-success text-success-foreground px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Shield className="h-3 w-3" /> Verified Vendor
                    </div>
                 </div>
                 <div className="flex items-center gap-4 text-white/80 font-bold text-sm">
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Nairobi, Central Business Dist.</span>
                    <span className="h-1.5 w-1.5 bg-white/20 rounded-full"></span>
                    <span className="flex items-center gap-2 uppercase tracking-widest text-[11px] font-black text-accent">Amica Member since 2024</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Detailed Information Section */}
           <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card">
                 <CardHeader className="p-10 border-b border-border/10">
                    <div className="flex justify-between items-center">
                       <div>
                          <CardTitle className="text-2xl font-normal tracking-tight text-foreground flex items-center gap-3 lowercase first-letter:uppercase font-serif">
                             <User className="h-6 w-6 text-primary" /> Personal Details
                          </CardTitle>
                          <CardDescription className="text-sm font-bold text-muted-foreground mt-1">Manage your identity and public information</CardDescription>
                       </div>
                       <Button variant="ghost" className="h-12 px-6 rounded-2xl text-primary font-bold gap-2 hover:bg-primary/10 transition-colors uppercase tracking-widest text-xs">
                          <Edit3 className="h-4 w-4" /> Edit Profile
                       </Button>
                    </div>
                 </CardHeader>
                 <CardContent className="p-10 pt-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2.5">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Legal Full Name</Label>
                          <Input defaultValue={user?.name} className="h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold text-foreground shadow-inner px-6 text-base" />
                       </div>
                       <div className="space-y-2.5">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Connection</Label>
                          <Input defaultValue={user?.email} className="h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold text-foreground shadow-inner px-6 text-base" />
                       </div>
                       <div className="space-y-2.5">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Primary Phone</Label>
                          <Input defaultValue="+254 712 345 678" className="h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold text-foreground shadow-inner px-6 text-base" />
                       </div>
                       <div className="space-y-2.5">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Operational Location</Label>
                          <Input defaultValue={user?.location || 'Nairobi City'} className="h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold text-foreground shadow-inner px-6 text-base" />
                       </div>
                    </div>
                    <div className="pt-6 border-t border-border/10 flex justify-end">
                       <Button className="h-14 px-12 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm uppercase tracking-widest gap-3 shadow-md transform active:scale-95 transition-all border-none">
                          <Save className="h-5 w-5" /> Persist Changes
                       </Button>
                    </div>
                 </CardContent>
              </Card>

              {/* Business Stats Grid for Vendor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { label: 'Buying License', value: 'AMICA-V-2401', icon: Shield, color: 'text-secondary', desc: 'Active & Verified' },
                   { label: 'Trading Terms', value: 'Prepayment / 50%', icon: Package, color: 'text-primary', desc: 'Standard Policy' },
                 ].map((box, i) => (
                    <Card key={i} className="border-none shadow-card rounded-[2.2rem] bg-card group hover:translate-y-[-4px] transition-transform">
                       <CardContent className="p-8 flex items-center gap-6">
                          <div className={`h-16 w-16 rounded-[1.2rem] ${box.color.replace('text', 'bg')}/10 flex items-center justify-center ${box.color} shadow-inner transition-transform group-hover:rotate-12`}>
                             <box.icon className="h-7 w-7" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">{box.label}</p>
                             <h4 className="text-xl font-normal tracking-tight text-foreground leading-tight font-serif">{box.value}</h4>
                             <p className="text-[11px] font-bold text-muted-foreground">{box.desc}</p>
                          </div>
                       </CardContent>
                    </Card>
                 ))}
              </div>
           </div>

           {/* Metrics & Badges Area */}
           <div className="space-y-8">
              <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-foreground text-background relative">
                 <img 
                   src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600" 
                   className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none mx-auto" 
                   alt="Pattern"
                 />
                 <CardContent className="p-10 pt-12 flex flex-col items-center text-center space-y-8 relative z-10">
                    <div className="h-32 w-32 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center p-6 relative group border-none">
                       <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
                       <TrendingUp className="h-full w-full text-primary relative z-10 animate-bounce transition-all duration-1000" />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-3xl font-normal tracking-tight uppercase tracking-[0.05em] font-serif">Prime Vendor</h3>
                       <p className="text-xs font-bold text-primary/80 uppercase tracking-widest border border-primary/30 px-4 py-1.5 rounded-full inline-block">Top 10% in Logistics</p>
                    </div>
                    
                    <div className="w-full flex justify-around py-8 border-y border-background/5 bg-background/5 rounded-[2rem] px-4 backdrop-blur-sm">
                       <div>
                          <p className="text-3xl font-normal tracking-tight text-primary font-serif">4.9</p>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Rating</p>
                       </div>
                       <div className="w-px bg-background/5 h-10 mt-2"></div>
                       <div>
                          <p className="text-3xl font-normal tracking-tight text-primary font-serif">124</p>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Orders</p>
                       </div>
                       <div className="w-px bg-background/5 h-10 mt-2"></div>
                       <div>
                          <p className="text-3xl font-normal tracking-tight text-primary font-serif">18</p>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Awards</p>
                       </div>
                    </div>

                    <div className="w-full space-y-4 pt-4">
                       <Button className="w-full h-14 rounded-2xl bg-background text-foreground font-bold hover:bg-muted uppercase tracking-widest shadow-md transition-all border-none">
                          Expert Trade Status
                       </Button>
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Your profile is visible to all registered farmers.</p>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
