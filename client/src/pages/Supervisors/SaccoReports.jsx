import React from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, TrendingUp, Leaf, DollarSign, MapPin, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const productionData = [
  { month: 'Oct', maize: 3200, beans: 2100, potatoes: 4800 },
  { month: 'Nov', maize: 3800, beans: 2400, potatoes: 5100 },
  { month: 'Dec', maize: 4200, beans: 1900, potatoes: 4500 },
  { month: 'Jan', maize: 3600, beans: 2600, potatoes: 5400 },
  { month: 'Feb', maize: 4100, beans: 2200, potatoes: 4900 },
  { month: 'Mar', maize: 4500, beans: 2800, potatoes: 5800 },
];

const loanRiskData = [
  { name: 'Low Risk', value: 340, color: 'hsl(var(--success))' },
  { name: 'Medium Risk', value: 85, color: 'hsl(var(--warning))' },
  { name: 'High Risk', value: 12, color: 'hsl(var(--destructive))' },
  { name: 'N/A', value: 45, color: 'hsl(var(--muted-foreground)/0.2)' },
];

import { useAuth } from '../../context/AuthContext';

export default function SaccoReports() {
  const { user } = useAuth();
  return (
    <SupervisorDashboardLayout title="SACCO Reports">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" /> SACCO Reports</h1>
            <p className="text-sm text-muted-foreground mt-1">Branch-specific analytics and member performance insights.</p>
          </div>
          <Button variant="outline" className="rounded-xl font-bold gap-2 h-11 border-primary/20 text-primary hover:bg-primary/10 transition-all">
            <Download className="h-4 w-4" /> Export Branch Data
          </Button>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md rounded-2xl bg-primary text-white p-6 relative overflow-hidden">
                <div className="relative z-10 flex flex-col justify-between h-full">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Total Collections</p>
                    <div className="mt-2">
                        <p className="text-3xl font-serif">12,450 kg</p>
                        <div className="flex items-center gap-2 mt-1">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs font-bold">+18% vs last month</span>
                        </div>
                    </div>
                </div>
                <Leaf className="absolute bottom-[-20%] right-[-10%] h-32 w-32 text-white/10" />
            </Card>

            <Card className="border-none shadow-md rounded-2xl bg-card p-6 border-l-4 border-l-success">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Repayments</p>
                <div className="mt-2">
                    <p className="text-3xl font-serif">KES 1.8M</p>
                    <div className="flex items-center gap-2 mt-1 text-success">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs font-bold font-serif whitespace-nowrap tracking-tighter">94% Repayment rate</span>
                    </div>
                </div>
            </Card>

            <Card className="border-none shadow-md rounded-2xl bg-card p-6 border-l-4 border-l-warning">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Overdue Payments</p>
                <div className="mt-2">
                    <p className="text-3xl font-serif">KES 84,500</p>
                    <div className="flex items-center gap-2 mt-1 text-warning">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs font-bold tracking-tighter">12 members flagged</span>
                    </div>
                </div>
            </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Produce Volume Chart */}
            <Card className="border-none shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-serif">Produce Collection Volume</CardTitle>
                    <CardDescription>Monthly volume by crop type for {user?.managedSacco?.name || 'your Sacco'}.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="maize" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="beans" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="potatoes" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Member Risk Pie Chart */}
            <Card className="border-none shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-serif">Member Risk Profiles</CardTitle>
                    <CardDescription>Distribution of credit risk across SACCO members.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="h-full w-full flex flex-col md:flex-row items-center gap-8">
                        <div className="h-[200px] w-[200px] shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={loanRiskData} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                                        {loanRiskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col gap-3">
                            {loanRiskData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between gap-6 min-w-[150px]">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-xs font-bold text-muted-foreground uppercase">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-black">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </SupervisorDashboardLayout>
  );
}
