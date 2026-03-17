import React from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Building2, MapPin, Percent, DollarSign, Bell, Shield, Save, HandHelping } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

import { useAuth } from '../../context/AuthContext';

export default function SaccoSettings() {
  const { user } = useAuth();
  return (
    <SupervisorDashboardLayout title="SACCO Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif flex items-center gap-2"><Settings className="h-6 w-6 text-primary" /> SACCO Settings</h1>
          <p className="text-sm text-muted-foreground mt-1 text-balance">Configure branch-specific parameters, loan policies, and communication preferences for {user?.managedSacco?.name || 'your'} SACCO.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branch Details */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Branch Information</CardTitle>
              <CardDescription>Basic details for your SACCO branch identification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-clip">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Branch Name</Label>
                <Input defaultValue={`${user?.managedSacco?.name || 'SACCO'} HQ`} className="h-10 rounded-xl bg-muted/30 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Physical Location</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue={user?.managedSacco?.location || "Main Street, Section B"} className="pl-10 h-10 rounded-xl bg-muted/30 border-none font-bold" />
                </div>
              </div>
              <div className="pt-2">
                <Button className="w-full rounded-xl h-11 bg-primary text-white font-bold gap-2">
                  <Save className="h-4 w-4" /> Save Branch Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loan Policy Settings */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
                <CardTitle className="text-lg font-serif flex items-center gap-2"><HandHelping className="h-5 w-5 text-primary" /> Loan Policy</CardTitle>
                <CardDescription>Configure loan limits and interest rates for your branch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Max Loan Amount</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">KES</span>
                            <Input defaultValue="500000" className="pl-10 h-10 rounded-xl bg-muted/30 border-none font-bold" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Interest Rate (%)</Label>
                        <div className="relative">
                            <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                            <Input defaultValue="6.5" className="h-10 rounded-xl bg-muted/30 border-none font-bold pr-10" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="space-y-0.5">
                        <p className="text-sm font-bold">Auto-approve Small Loans</p>
                        <p className="text-[11px] text-muted-foreground underline underline-offset-2">For loans under KES 10,000</p>
                    </div>
                    <Switch />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="space-y-0.5">
                        <p className="text-sm font-bold">Require Collateral</p>
                        <p className="text-[11px] text-muted-foreground underline underline-offset-2">For all development loans</p>
                    </div>
                    <Switch defaultChecked />
                </div>
            </CardContent>
          </Card>

          {/* Member Notifications */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Member Notifications</CardTitle>
              <CardDescription>Manage how you communicate with your SACCO members.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Market Price Alerts', description: 'SMS members when prices change by > 5%', checked: true },
                { label: 'Payment Reminders', description: 'Auto-send reminders 3 days before due date', checked: true },
                { label: 'Weekly Reports', description: 'Email weekly SACCO performance summary', checked: false },
                { label: 'System Announcements', description: 'Broadcast global admin updates', checked: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="space-y-0.5">
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[200px]">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security & Access */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><Shield className="h-5 w-5 text-emerald-500" /> Security Controls</CardTitle>
              <CardDescription>Manage branch-level access and verification policies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="space-y-0.5">
                        <p className="text-sm font-bold">In-person Verification</p>
                        <p className="text-[11px] text-muted-foreground">Require physical check for large produce</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="space-y-0.5">
                        <p className="text-sm font-bold">Daily Transaction Limit</p>
                        <p className="text-[11px] text-muted-foreground">Limit branch-wide daily disbursements</p>
                    </div>
                    <span className="text-[11px] font-black text-primary bg-primary/10 px-2 py-1 rounded">KES 2M</span>
                </div>
                <Button variant="outline" className="w-full rounded-xl mt-2 border-primary/20 text-primary font-bold">
                    View Access Logs
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SupervisorDashboardLayout>
  );
}
