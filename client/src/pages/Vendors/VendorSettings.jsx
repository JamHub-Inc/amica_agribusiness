import React from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Shield, Moon, Globe, Trash2, Keyboard, Eye, HelpCircle, ChevronRight, Info, User, ShoppingBag, TrendingUp, Laptop, Lock } from 'lucide-react';

export default function VendorSettings() {
  const sections = [
    {
      title: 'Market Notifications',
      description: 'Configure alerts for price changes and listing updates',
      icon: Bell,
      items: [
        { label: 'Real-time Price Alerts', desc: 'Get notified when commodity prices fluctuate.', enabled: true },
        { label: 'Farmer Harvest Alerts', desc: 'Alerts when your favorited farmers post new yields.', enabled: true },
        { label: 'Purchase Request Status', desc: 'Instant updates on negotiation outcomes.', enabled: true },
        { label: 'Marketing Promotions', desc: 'Receive platform newsletters and market reports.', enabled: false },
      ]
    },
    {
      title: 'Privacy & Security',
      description: 'Manage account visibility and trading security',
      icon: Shield,
      items: [
        { label: 'Public Profile Visibility', desc: 'Farmers can view your profile and reputation.', enabled: true },
        { label: 'Secure Purchase Confirmation', desc: 'Require 2FA for all confirmed orders.', enabled: false },
        { label: 'Regional Data Sharing', desc: 'Share aggregate data to receive market insights.', enabled: true },
      ]
    },
    {
      title: 'Marketplace Interface',
      description: 'Customize your vendor experience',
      icon: Laptop,
      items: [
        { label: 'Expert Mode (Bulk View)', desc: 'Display marketplace as a dense, real-time list.', enabled: false },
        { label: 'Preferred Market Region', desc: 'Filter default view to Central Rift.', type: 'link' },
        { label: 'Primary Trading Language', desc: 'English (KE)', type: 'link' },
      ]
    }
  ];

  return (
    <VendorDashboardLayout title="System & Account Settings">
      <div className="space-y-8 pb-20">
        {/* Settings Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-primary rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl font-normal tracking-tight text-white font-serif lowercase first-letter:uppercase">Configuration Center</h2>
              <p className="text-sm font-bold text-white/70 mt-1">Manage your platform preferences and trading parameters</p>
           </div>
           <div className="flex gap-3 relative z-10">
              <Button variant="ghost" className="rounded-2xl font-bold h-14 px-8 text-white hover:bg-white/10 uppercase tracking-widest text-xs border border-white/20 transition-all">Discard Changes</Button>
              <Button className="rounded-2xl font-bold h-14 px-10 bg-background text-foreground hover:bg-muted shadow-md uppercase tracking-widest text-xs transform active:scale-95 transition-all border-none">Persist Settings</Button>
           </div>
           
           <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           {/* Sidebar Links - Desktop */}
           <div className="lg:col-span-3 space-y-3 sticky top-24">
              {[
                { label: 'General', icon: Info, active: true },
                { label: 'Market Feed', icon: TrendingUp },
                { label: 'Notifications', icon: Bell },
                { label: 'Procurement', icon: ShoppingBag },
                { label: 'Security', icon: Lock },
                { label: 'Account Delete', icon: Trash2, danger: true }
              ].map((item, i) => (
                <button 
                   key={i} 
                   className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.8rem] transition-all duration-500 group relative overflow-hidden ${
                     item.active ? 'bg-primary text-primary-foreground shadow-lg scale-105 z-10' : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent hover:border-border/50'
                   } ${item.danger && !item.active ? 'hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20' : ''}`}
                >
                   <span className="flex items-center gap-4 relative z-10">
                      <item.icon className={`h-5 w-5 ${item.active ? 'text-primary-foreground' : item.danger ? 'text-destructive group-hover:text-destructive' : 'text-muted-foreground group-hover:text-primary'} transition-colors`} /> 
                      <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                   </span>
                   {item.active && <ChevronRight className="h-5 w-5 relative z-10" />}
                </button>
              ))}
           </div>

           {/* Settings Content Panels */}
           <div className="lg:col-span-9 space-y-8">
              {sections.map((section, idx) => (
                <Card key={idx} className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                   <CardHeader className="bg-muted/30 p-8 border-b border-border/10 relative overflow-hidden">
                      <div className="flex items-center gap-4 relative z-10">
                         <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                             <section.icon className="h-6 w-6" /> 
                         </div>
                         <div>
                            <CardTitle className="text-2xl font-normal tracking-tight text-foreground font-serif">{section.title}</CardTitle>
                            <CardDescription className="text-sm font-bold text-muted-foreground mt-1">{section.description}</CardDescription>
                         </div>
                      </div>
                   </CardHeader>
                   <CardContent className="p-0">
                      <div className="divide-y divide-border/10">
                         {section.items.map((item, i) => (
                           <div key={i} className="flex justify-between items-center p-8 hover:bg-muted/20 transition-all duration-300">
                              <div className="space-y-1.5 max-w-xl">
                                 <Label className="text-base font-bold tracking-tight text-foreground">{item.label}</Label>
                                 <p className="text-sm font-medium text-muted-foreground leading-relaxed">{item.desc}</p>
                              </div>
                              {item.type === 'link' ? (
                                <Button variant="ghost" className="h-12 px-6 rounded-2xl bg-primary/10 text-primary font-black uppercase tracking-widest text-[10px] shadow-sm transform active:scale-95 transition-all gap-2 border-none">
                                   Modify <ChevronRight className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Switch 
                                   checked={item.enabled} 
                                   className="data-[state=checked]:bg-primary scale-125"
                                />
                              )}
                           </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>
              ))}

              {/* Advanced Security Block */}
              <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-success/5 border border-success/20 flex items-center p-8 gap-8 group hover:bg-success/10 transition-colors">
                 <div className="h-20 w-20 rounded-[1.8rem] bg-success flex items-center justify-center text-success-foreground shadow-md group-hover:rotate-6 transition-transform">
                    <Shield className="h-10 w-10" />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-2xl font-normal tracking-tight text-success leading-none mb-2 font-serif">Trade Verification</h3>
                    <p className="text-[10px] font-black text-muted-foreground leading-relaxed uppercase tracking-widest">Global Status: Certified Amica Elite Vendor</p>
                 </div>
                 <Button className="h-14 px-10 rounded-2xl bg-success hover:bg-success/90 text-success-foreground font-black uppercase tracking-widest text-xs shadow-md border-none">
                    Verify Identity
                 </Button>
              </Card>

              {/* Danger Zone */}
              <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-destructive/5 border border-destructive/10">
                 <CardContent className="p-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-center md:text-left">
                       <h3 className="text-2xl font-normal tracking-tight text-destructive uppercase tracking-widest mb-2 leading-none font-serif">Termination Zone</h3>
                       <p className="text-sm font-bold text-muted-foreground leading-relaxed">Permanently deactivate your vendor credentials and purge business historical data from the Amica Global Network.</p>
                    </div>
                    <Button variant="destructive" className="rounded-[1.5rem] h-14 px-10 font-bold flex items-center gap-3 uppercase tracking-widest text-xs shadow-md transition-all hover:scale-105 active:scale-95 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                       <Trash2 className="h-5 w-5" /> Deactivate Account
                    </Button>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
