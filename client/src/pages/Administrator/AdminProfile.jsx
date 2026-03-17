import React from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserIcon, MapPin, Mail, Phone, Shield, Camera, Save, Key, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminProfile() {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (!user) return 'A';
    const nameParts = user.name ? user.name.split(' ') : [];
    if (nameParts.length >= 2) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    if (user.name) return user.name.substring(0, 2).toUpperCase();
    return 'A';
  };

  return (
    <AdminDashboardLayout title="Admin Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="relative h-64 rounded-3xl overflow-visible bg-gradient-to-r from-primary via-primary/90 to-primary/75 shadow-lg">
          <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[-20%] left-[-5%] w-48 h-48 bg-accent/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 right-6">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
              <Shield className="h-3 w-3 text-accent" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/90">System Admin</span>
            </div>
          </div>

          <div className="absolute bottom-[-40px] left-8 flex items-end gap-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-3xl bg-background p-1.5 shadow-xl">
                <div className="h-full w-full rounded-[18px] bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-black text-4xl shadow-inner">
                  {getUserInitials()}
                </div>
              </div>
              <Button className="absolute bottom-2 right-2 h-10 w-10 p-0 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-md border-2 border-background">
                <Camera className="h-5 w-5" />
              </Button>
            </div>
            <div className="pb-4 space-y-1">
              <h2 className="text-3xl font-serif text-white drop-shadow-sm">{user?.name || 'Admin User'}</h2>
              <div className="flex items-center gap-3 text-white/80 font-medium text-sm">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {user?.location || 'Nairobi, Kenya'}</span>
                <span className="h-1 w-1 bg-white/50 rounded-full"></span>
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {user?.email || 'admin@Amica.co.ke'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="text-xl font-serif flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-primary" /> Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest ml-1">Full Name</Label>
                    <Input defaultValue={user?.name} className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest ml-1">Email Address</Label>
                    <Input defaultValue={user?.email} className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest ml-1">Phone Number</Label>
                    <Input defaultValue="+254 700 000 000" className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest ml-1">Location</Label>
                    <Input defaultValue={user?.location || 'Nairobi'} className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button className="h-12 px-8 rounded-xl bg-primary text-white font-medium gap-2 shadow-lg shadow-primary/20">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-serif flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" /> Security Settings
                </CardTitle>
                <CardDescription>Update your password and security preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest ml-1">Current Password</Label>
                    <Input type="password" className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest ml-1">New Password</Label>
                    <Input type="password" className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest ml-1">Confirm Password</Label>
                    <Input type="password" className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button className="h-12 px-8 rounded-xl bg-primary text-white font-medium gap-2 shadow-lg shadow-primary/20">
                    <Key className="h-4 w-4" /> Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="pt-8 flex flex-col items-center text-center space-y-6">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center p-4">
                  <Shield className="h-full w-full text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif">System Administrator</h3>
                  <p className="text-xs font-medium text-muted-foreground">Full platform access and control</p>
                </div>
                <div className="w-full flex justify-around py-4 border-y border-border/30">
                  <div>
                    <p className="text-xl font-serif">365</p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Days Active</p>
                  </div>
                  <div className="w-px bg-border/30 h-8 mt-1"></div>
                  <div>
                    <p className="text-xl font-serif">1.2K</p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Actions</p>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between bg-muted/30 p-3 rounded-xl">
                    <span className="text-xs text-muted-foreground">Last Login</span>
                    <span className="text-xs font-medium">Today, 8:15 PM</span>
                  </div>
                  <div className="flex items-center justify-between bg-muted/30 p-3 rounded-xl">
                    <span className="text-xs text-muted-foreground">IP Address</span>
                    <span className="text-xs font-medium font-mono">41.89.xxx.xxx</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
