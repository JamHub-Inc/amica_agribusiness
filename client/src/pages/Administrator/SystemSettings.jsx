import React from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Leaf, Shield, Key, Database, Globe, Save } from 'lucide-react';

export default function SystemSettings() {
  return (
    <AdminDashboardLayout title="System Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif flex items-center gap-2"><Settings className="h-6 w-6 text-primary" /> System Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure platform parameters, role permissions, and integrations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crop Categories */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><Leaf className="h-5 w-5 text-primary" /> Crop Categories</CardTitle>
              <CardDescription>Manage the list of crop categories available on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Cereals', 'Legumes', 'Tubers', 'Vegetables', 'Fruits', 'Cash Crops'].map((cat, i) => (
                <div key={i} className="flex items-center justify-between bg-muted/30 p-3 rounded-xl">
                  <span className="text-sm font-medium">{cat}</span>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Edit</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-xl mt-2 border-dashed text-muted-foreground">+ Add Category</Button>
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Role Permissions</CardTitle>
              <CardDescription>Manage access levels for each user role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { role: 'Farmer', permissions: 'View own data, submit produce, apply for loans' },
                { role: 'Supervisor', permissions: 'Approve loans, verify produce, manage SACCO members' },
                { role: 'System Admin', permissions: 'Full access to all platform features' },
              ].map((item, i) => (
                <div key={i} className="bg-muted/30 p-4 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{item.role}</span>
                    <Button variant="ghost" size="sm" className="text-xs text-primary">Configure</Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{item.permissions}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><Key className="h-5 w-5 text-primary" /> API Settings</CardTitle>
              <CardDescription>Manage external API keys and integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Weather API Key</Label>
                <Input type="password" defaultValue="sk-xxx-xxxxx" className="h-10 rounded-xl bg-muted/30 border-none font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">OpenAI API Key</Label>
                <Input type="password" defaultValue="sk-xxx-xxxxx" className="h-10 rounded-xl bg-muted/30 border-none font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">SMS Gateway API</Label>
                <Input type="password" defaultValue="at-xxx-xxxxx" className="h-10 rounded-xl bg-muted/30 border-none font-mono text-xs" />
              </div>
              <Button className="bg-primary text-white rounded-xl font-medium gap-2 w-full"><Save className="h-4 w-4" /> Save API Keys</Button>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><Database className="h-5 w-5 text-primary" /> Backup & Data</CardTitle>
              <CardDescription>Configure system backup and data retention settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last Backup</span>
                  <span className="text-xs text-muted-foreground">March 10, 2025 at 03:00 AM</span>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Backup Frequency</span>
                  <span className="text-xs text-muted-foreground">Every 24 hours</span>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Retention</span>
                  <span className="text-xs text-muted-foreground">365 days</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl flex-1 font-medium gap-2"><Database className="h-4 w-4" /> Manual Backup</Button>
                <Button variant="outline" className="rounded-xl flex-1 font-medium gap-2 border-primary/20 text-primary"><Globe className="h-4 w-4" /> Export Data</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
