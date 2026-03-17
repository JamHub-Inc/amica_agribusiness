import React, { useState, useEffect } from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import SupervisorWelcomeBlock from './components/SupervisorWelcomeBlock';
import SupervisorStats from './components/SupervisorStats';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from 'recharts';
import { Leaf, Users, HandHelping, ArrowRight, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { saccoService } from '../../services/saccoService';



export default function SupervisorDashboard() {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [actResp, statsResp] = await Promise.all([
        saccoService.getActivities(),
        saccoService.getStats()
      ]);
      setActivities(actResp.data || []);
      setStats(statsResp.data || null);
    } catch (err) {
      console.error('Failed to load dashboard activities:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SupervisorDashboardLayout title="SACCO Overview">
      <div className="space-y-6">
        <SupervisorWelcomeBlock />
        <SupervisorStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Member Growth */}
            <Card className="lg:col-span-2 border-none shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-serif">Member Growth</CardTitle>
                    <CardDescription>Your SACCO membership growth over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats?.growthData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="members" fill="hsl(var(--primary))" radius={[5, 5, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Loan Distribution */}
            <Card className="border-none shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-serif">Branch Outlook</CardTitle>
                    <CardDescription>Visual summary of system activity.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex flex-col items-center justify-center p-8">
                    <div className="space-y-6 w-full">
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                 <span>Produce Processing</span>
                                 <span className="text-primary">{stats?.outlook?.processingRate || 0}%</span>
                             </div>
                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                 <div className="h-full bg-primary rounded-full" style={{ width: `${stats?.outlook?.processingRate || 0}%` }}></div>
                             </div>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                 <span>Loan Approvals</span>
                                 <span className="text-secondary">{stats?.outlook?.approvalRate || 0}%</span>
                             </div>
                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                 <div className="h-full bg-secondary rounded-full" style={{ width: `${stats?.outlook?.approvalRate || 0}%` }}></div>
                             </div>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                 <span>Farmer Satisfaction</span>
                                 <span className="text-success">{stats?.outlook?.satisfactionRate || 0}%</span>
                             </div>
                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                 <div className="h-full bg-success rounded-full" style={{ width: `${stats?.outlook?.satisfactionRate || 0}%` }}></div>
                             </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Pending Actions */}
            <Card className="border-none shadow-md rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-lg font-serif">Awaiting Actions</CardTitle>
                        <CardDescription>Recent requests requiring supervisor review.</CardDescription>
                    </div>
                    <button className="text-xs font-bold text-primary hover:underline">View all</button>
                </CardHeader>
                <CardContent className="pt-2">
                    <div className="space-y-4">
                        {loading ? (
                           [1, 2, 3].map(i => <div key={i} className="h-16 bg-muted animate-pulse rounded-xl"></div>)
                        ) : activities.length === 0 ? (
                           <div className="py-12 text-center text-muted-foreground">No pending actions at this time.</div>
                        ) : (
                          activities.map((req) => (
                            <div key={req.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 group hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                                        req.type === 'Loan' ? 'bg-violet-100 text-violet-600' : 
                                        req.type === 'Produce' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {req.type === 'Loan' ? <HandHelping className="h-5 w-5" /> : 
                                         req.type === 'Produce' ? <Leaf className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{req.farmer}</p>
                                        <p className="text-[11px] text-muted-foreground font-medium">{req.type}: {req.item}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right mr-3 hidden sm:block">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {new Date(req.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded bg-white shadow-sm border border-border/50 ${
                                        req.status === 'PENDING' ? 'text-warning' : 
                                        req.status === 'VERIFYING' ? 'text-info' : 'text-success'
                                    }`}>{req.status}</span>
                                    <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-primary hover:text-white transition-all">
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                          ))
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Branch Health */}
            <Card className="border-none shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-serif">Registration Trend</CardTitle>
                    <CardDescription>Farmer registrations per month.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                   <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats?.growthData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                            <Line type="monotone" dataKey="members" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, stroke: 'white', strokeWidth: 2, fill: 'hsl(var(--primary))' }} />
                        </LineChart>
                   </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </SupervisorDashboardLayout>
  );
}
