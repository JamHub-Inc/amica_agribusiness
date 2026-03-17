import React from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserIcon, MapPin, Mail, Phone, Shield, Camera, Edit3, Save, Sprout, Map, Warehouse } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  
  const getUserInitials = () => {
    if (!user) return 'U';
    const nameParts = user.name ? user.name.split(' ') : [];
    if (nameParts.length >= 2) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    if (user.name) return user.name.substring(0, 2).toUpperCase();
    return 'U';
  };

  return (
    <FarmerDashboardLayout title="My Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="relative h-64 rounded-3xl overflow-visible bg-gradient-to-r from-primary to-primary/80 shadow-lg">
           <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
           <div className="absolute top-[-20%] left-[-5%] w-48 h-48 bg-accent/20 rounded-full blur-2xl"></div>
           
           <div className="absolute bottom-[-40px] left-8 flex items-end gap-6">
              <div className="relative">
                 <div className="h-32 w-32 rounded-3xl bg-background p-1.5 shadow-xl">
                    <div className="h-full w-full rounded-[18px] bg-primary flex items-center justify-center text-white font-black text-4xl shadow-inner">
                       {getUserInitials()}
                    </div>
                 </div>
                 <Button className="absolute bottom-2 right-2 h-10 w-10 p-0 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-md border-2 border-background">
                    <Camera className="h-5 w-5" />
                 </Button>
              </div>
              <div className="pb-4 space-y-1">
                 <h2 className="text-3xl font-black text-white drop-shadow-sm">{user?.name || 'User Name'}</h2>
                 <div className="flex items-center gap-3 text-white/80 font-bold text-sm">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {user?.location || 'Nairobi, Kenya'}</span>
                    <span className="h-1 w-1 bg-white/50 rounded-full"></span>
                    <span className="flex items-center gap-1 uppercase tracking-widest text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{user?.role || 'Farmer'}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Form Section */}
           <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                 <CardHeader className="border-b border-border/50">
                    <div className="flex justify-between items-center">
                       <CardTitle className="text-xl flex items-center gap-2">
                          <UserIcon className="h-5 w-5 text-primary" /> Personal Information
                       </CardTitle>
                       <Button variant="ghost" className="rounded-xl text-primary font-bold gap-2">
                          <Edit3 className="h-4 w-4" /> Edit Profile
                       </Button>
                    </div>
                 </CardHeader>
                 <CardContent className="pt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                          <Input defaultValue={user?.name} className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold" />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                          <Input defaultValue={user?.email} className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold" />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                          <Input defaultValue="+254 700 000 000" className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold" />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
                          <Input defaultValue={user?.location || 'Nairobi'} className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold" />
                       </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                       <Button className="h-12 px-8 rounded-xl bg-primary text-white font-bold gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                          <Save className="h-4 w-4" /> Save Changes
                       </Button>
                    </div>
                 </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                 <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                       <Warehouse className="h-5 w-5 text-primary" /> Farm Details
                    </CardTitle>
                    <CardDescription>Configure your registered agricultural assets</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {[
                         { label: 'Farm Size', value: '15 Acres', icon: Map },
                         { label: 'Soil Type', value: 'Volcanic Red', icon: Sprout },
                         { label: 'Irrigation', value: 'Borehole / Drip', icon: MapPin }
                       ].map((item, i) => (
                         <div key={i} className="bg-background p-4 rounded-2xl border border-border/50 shadow-sm flex flex-col gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                               <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.label}</p>
                               <p className="text-sm font-black text-foreground">{item.value}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
           </div>

           {/* Stats/Badge Section */}
           <div className="space-y-6">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
                 <CardContent className="pt-8 flex flex-col items-center text-center space-y-6">
                    <div className="h-24 w-24 rounded-full bg-success/10 flex items-center justify-center p-4">
                       <Shield className="h-full w-full text-success" />
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-xl font-black tracking-tight">Verified Farmer</h3>
                       <p className="text-xs font-bold text-muted-foreground">Certified Amica Member since 2024</p>
                    </div>
                    <div className="w-full flex justify-around py-4 border-y border-border/30">
                       <div>
                          <p className="text-xl font-black">12</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Crops</p>
                       </div>
                       <div className="w-px bg-border/30 h-8 mt-1"></div>
                       <div>
                          <p className="text-xl font-black">8</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Awards</p>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full h-12 rounded-xl text-primary font-bold border-primary/20 hover:bg-primary/5 transition-colors">
                       View Digital Certificates
                    </Button>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
