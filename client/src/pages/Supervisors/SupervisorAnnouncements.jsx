import React, { useState } from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, Plus, Send, Search, Megaphone, Trash2, Calendar, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockAnnouncements = [
  { id: 1, title: 'Maize Seed Distribution', message: 'We have received subsidized maize seeds at the branch office. Visit with your member ID.', type: 'General', target: 'Maize Farmers', date: '2025-03-08', reads: 142 },
  { id: 2, title: 'Loan Repayment Reminder', message: 'The monthly loan repayment cycle for march closes in 5 days. Ensure your accounts are funded.', type: 'Financial', target: 'Loan Holders', date: '2025-03-10', reads: 85 },
  { id: 3, title: 'Friday Members Meeting', message: 'Join us for our monthly SACCO members meeting this Friday at 10 AM at the branch office.', type: 'Event', target: 'All Members', date: '2025-03-05', reads: 210 },
];

export default function SupervisorAnnouncements() {
  const [showCompose, setShowCompose] = useState(false);

  return (
    <SupervisorDashboardLayout title="Branch Announcements">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif flex items-center gap-2"><Bell className="h-6 w-6 text-primary" /> SACCO Announcements</h1>
            <p className="text-sm text-muted-foreground mt-1 text-balance">Broadcast branch-specific alerts and announcements to your SACCO members.</p>
          </div>
          <Button onClick={() => setShowCompose(!showCompose)} className="bg-primary text-white rounded-xl font-bold gap-2 shadow-md h-11">
            <Plus className="h-4 w-4" /> New Announcement
          </Button>
        </div>

        {/* Compose Form */}
        {showCompose && (
          <Card className="border-none shadow-md rounded-2xl border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Compose Announcement</CardTitle>
              <CardDescription>Post a board update for your branch members.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Announcement Title</Label>
                        <Input placeholder="Enter title..." className="h-10 rounded-xl bg-muted/30 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Target Group</Label>
                        <select className="w-full h-10 rounded-xl bg-muted/30 border-none px-3 text-sm font-bold outline-none">
                            <option>All Members</option>
                            <option>Maize Farmers</option>
                            <option>Bean Farmers</option>
                            <option>Loan Holders</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Message Content</Label>
                    <textarea className="w-full h-24 rounded-xl bg-muted/30 border-none p-3 text-sm font-bold outline-none resize-none" placeholder="Write your announcement details here..." />
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" className="rounded-xl font-bold" onClick={() => setShowCompose(false)}>Cancel</Button>
                    <Button className="bg-primary text-white rounded-xl font-bold gap-2">
                        <Send className="h-4 w-4" /> Send Announcement
                    </Button>
                </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {mockAnnouncements.map(item => (
            <Card key={item.id} className="border-none shadow-sm rounded-2xl hover:shadow-md transition-all group overflow-hidden relative">
                <div className="h-full w-1.5 bg-primary/20 absolute left-0 top-0"></div>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Megaphone className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0 pr-4">
                            <h3 className="text-sm font-black truncate">{item.title}</h3>
                            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 underline underline-offset-2">{item.message}</p>
                            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-1 font-black uppercase tracking-widest bg-muted px-1.5 py-0.5 rounded leading-none">{item.target}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                <span className="flex items-center gap-1 font-black"><Eye className="h-3 w-3" /> {item.reads} views</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SupervisorDashboardLayout>
  );
}
