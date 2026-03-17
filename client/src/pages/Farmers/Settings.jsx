import React from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Shield, Moon, Globe, Trash2, Keyboard, Eye, HelpCircle, ChevronRight, Info } from 'lucide-react';

export default function Settings() {
  const sections = [
    {
      title: 'Notifications',
      description: 'Configure how you receive alerts and updates',
      icon: Bell,
      items: [
        { label: 'Push Notifications', desc: 'Real-time alerts on your device', enabled: true },
        { label: 'Email Reports', desc: 'Weekly harvest and market summaries', enabled: true },
        { label: 'AI Advice Alerts', desc: 'Notifications for new strategic insights', enabled: false },
      ]
    },
    {
      title: 'Privacy & Security',
      description: 'Manage your account security settings',
      icon: Shield,
      items: [
        { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', enabled: false },
        { label: 'Share Data with Cooperatives', desc: 'Allow regional data sharing for better insights', enabled: true },
      ]
    },
    {
      title: 'Display & Language',
      description: 'Customize your interface preferences',
      icon: Globe,
      items: [
        { label: 'Dark Mode', desc: 'Switch between light and dark themes', enabled: false },
        { label: 'Preferred Language', desc: 'Current: English (Kenya)', type: 'link' },
      ]
    }
  ];

  return (
    <FarmerDashboardLayout title="App Settings">
      <div className="space-y-6 pb-12">
        {/* Settings Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-border/40">
           <div>
              <h2 className="text-xl font-serif text-foreground tracking-tight">Configuration Center</h2>
              <p className="text-sm font-normal text-muted-foreground">Manage your Amica Experience and preferences</p>
           </div>
           <div className="flex gap-2">
              <Button variant="ghost" className="rounded-xl font-medium h-11 px-6 hover:bg-muted">Discard</Button>
              <Button className="rounded-xl font-medium h-11 px-6 bg-primary text-white shadow-lg shadow-primary/20">Apply Changes</Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Sidebar Links */}
           <div className="lg:col-span-3 space-y-2">
              {[
                { label: 'General', icon: Info, active: true },
                { label: 'Notifications', icon: Bell },
                { label: 'Security', icon: Shield },
                { label: 'Appearance', icon: Eye },
                { label: 'Support', icon: HelpCircle }
              ].map((item, i) => (
                <button 
                   key={i} 
                   className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 font-medium text-sm ${
                     item.active ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105 z-10' : 'text-muted-foreground hover:bg-white hover:text-foreground'
                   }`}
                >
                   <span className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" /> {item.label}
                   </span>
                   {item.active && <ChevronRight className="h-4 w-4" />}
                </button>
              ))}
           </div>

           {/* Settings Content */}
           <div className="lg:col-span-9 space-y-6">
              {sections.map((section, idx) => (
                <Card key={idx} className="border-none shadow-xl rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                  <CardHeader className="bg-muted/30 border-b border-border/50">
                     <CardTitle className="text-lg flex items-center gap-2">
                        <section.icon className="h-5 w-5 text-primary" /> {section.title}
                     </CardTitle>
                     <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="divide-y divide-border/30 px-0">
                     {section.items.map((item, i) => (
                       <div key={i} className="flex justify-between items-center px-6 py-5 hover:bg-muted/10 transition-colors">
                          <div className="space-y-0.5">
                             <Label className="text-sm font-medium text-foreground">{item.label}</Label>
                             <p className="text-xs font-normal text-muted-foreground">{item.desc}</p>
                          </div>
                          {item.type === 'link' ? (
                            <Button variant="ghost" size="sm" className="rounded-full text-primary font-medium uppercase text-[10px] tracking-widest gap-2">
                               Change <ChevronRight className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Switch checked={item.enabled} className="data-[state=checked]:bg-primary" />
                          )}
                       </div>
                     ))}
                  </CardContent>
                </Card>
              ))}

              {/* Danger Zone */}
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-destructive/5 border border-destructive/20">
                 <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                       <h3 className="text-lg font-serif text-destructive tracking-tight">Deactivate Account</h3>
                       <p className="text-sm font-normal text-muted-foreground">Permanently delete your data and remove access to Amica services.</p>
                    </div>
                    <Button variant="destructive" className="rounded-xl h-12 px-8 font-medium gap-2 transition-transform hover:scale-105">
                       <Trash2 className="h-5 w-5" /> Delete Account
                    </Button>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
