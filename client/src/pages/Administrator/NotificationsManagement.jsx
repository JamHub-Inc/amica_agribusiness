import React, { useState } from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Plus, Send, Megaphone, CloudRain, AlertTriangle, Info, CheckCircle, Users, Eye } from 'lucide-react';

const mockNotifications = [
  { id: 1, title: 'Maize Prices Update', message: 'Maize prices have increased by 5.2% in Nairobi market. Farmers should consider selling.', type: 'Market Alert', audience: 'All Farmers', sent: '2025-03-10', read: '78%' },
  { id: 2, title: 'Heavy Rainfall Advisory', message: 'Kenya Met Dept warns of heavy rainfall in Central and Rift Valley regions for the next 5 days.', type: 'Weather Warning', audience: 'Central / Rift Valley', sent: '2025-03-09', read: '92%' },
  { id: 3, title: 'Subsidized Fertilizer Program', message: 'Government subsidy program for fertilizer now open. Apply through your SACCO.', type: 'Government Policy', audience: 'All Users', sent: '2025-03-07', read: '65%' },
  { id: 4, title: 'System Maintenance Window', message: 'Platform will be under maintenance on March 15, 2025 from 2:00 AM to 5:00 AM EAT.', type: 'System', audience: 'All Users', sent: '2025-03-06', read: '54%' },
  { id: 5, title: 'Loan Repayment Reminder', message: 'Monthly loan repayment cycle closes on March 15. Ensure payments are up to date.', type: 'Financial', audience: 'Loan Holders', sent: '2025-03-05', read: '85%' },
];

const typeIcons = {
  'Market Alert': Megaphone,
  'Weather Warning': CloudRain,
  'Government Policy': Info,
  'System': AlertTriangle,
  'Financial': CheckCircle,
};

const typeColors = {
  'Market Alert': 'bg-amber-100 text-amber-600',
  'Weather Warning': 'bg-blue-100 text-blue-600',
  'Government Policy': 'bg-violet-100 text-violet-600',
  'System': 'bg-rose-100 text-rose-600',
  'Financial': 'bg-emerald-100 text-emerald-600',
};

export default function NotificationsManagement() {
  const [showCompose, setShowCompose] = useState(false);

  return (
    <AdminDashboardLayout title="Notifications & Announcements">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif flex items-center gap-2"><Bell className="h-6 w-6 text-primary" /> Notifications & Announcements</h1>
            <p className="text-sm text-muted-foreground mt-1">Broadcast alerts and announcements to platform users.</p>
          </div>
          <Button className="bg-primary text-white rounded-xl font-medium gap-2 shadow-md h-11" onClick={() => setShowCompose(!showCompose)}>
            <Plus className="h-4 w-4" /> New Announcement
          </Button>
        </div>

        {/* Compose Form */}
        {showCompose && (
          <Card className="border-none shadow-md rounded-2xl border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Compose Announcement</CardTitle>
              <CardDescription>Create and send a notification to platform users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Title</Label>
                  <Input placeholder="Notification title..." className="h-10 rounded-xl bg-muted/30 border-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Type</Label>
                  <select className="w-full h-10 rounded-xl bg-muted/30 border-none px-3 text-sm outline-none">
                    <option>Market Alert</option>
                    <option>Weather Warning</option>
                    <option>Government Policy</option>
                    <option>System</option>
                    <option>Financial</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Message</Label>
                <textarea className="w-full h-24 rounded-xl bg-muted/30 border-none p-3 text-sm outline-none resize-none" placeholder="Write your announcement message..." />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Target Audience</Label>
                <select className="w-full h-10 rounded-xl bg-muted/30 border-none px-3 text-sm outline-none">
                  <option>All Users</option>
                  <option>All Farmers</option>
                  <option>All Supervisors</option>
                  <option>Loan Holders</option>
                  <option>Specific SACCO</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="rounded-xl" onClick={() => setShowCompose(false)}>Cancel</Button>
                <Button className="bg-primary text-white rounded-xl font-medium gap-2">
                  <Send className="h-4 w-4" /> Send Notification
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sent Notifications */}
        <div className="space-y-3">
          {mockNotifications.map(item => {
            const TypeIcon = typeIcons[item.type] || Bell;
            return (
              <Card key={item.id} className="border-none shadow-sm rounded-2xl hover:shadow-md transition-all group">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${typeColors[item.type]}`}>
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold">{item.title}</h3>
                        <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">{item.message}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{new Date(item.sent).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${typeColors[item.type]}`}>{item.type}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{item.audience}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.read} read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
