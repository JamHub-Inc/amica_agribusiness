import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { adminService } from '../../../services/adminService';
import { Loader2 } from 'lucide-react';

export default function FarmerGrowthChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await adminService.getCharts();
        setData(resp.data);
      } catch (err) {
        console.error('Failed to load growth charts:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md rounded-[2.5rem] bg-card flex items-center justify-center h-[380px]">
           <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
        </Card>
        <Card className="border-none shadow-md rounded-[2.5rem] bg-card flex items-center justify-center h-[380px]">
           <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Farmer Growth */}
      <Card className="border-none shadow-card rounded-[2.5rem] bg-card overflow-hidden">
        <CardHeader className="p-8 pb-0">
          <CardTitle className="flex justify-between items-center text-xl font-serif">
            <span>Network Expansion</span>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </CardTitle>
          <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Farmer Onboarding Rate</CardDescription>
        </CardHeader>
        <CardContent className="h-[280px] w-full p-8 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.farmerGrowth || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="farmerGrowthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 700 }} />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '5 5' }}
                contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', padding: '1rem', fontWeight: 800 }}
              />
              <Area type="monotone" dataKey="farmers" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#farmerGrowthFill)" animationDuration={2000} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Produce Supply */}
      <Card className="border-none shadow-card rounded-[2.5rem] bg-card overflow-hidden">
        <CardHeader className="p-8 pb-0">
          <CardTitle className="flex justify-between items-center text-xl font-serif">
            <span>Commodity Distribution</span>
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
          </CardTitle>
          <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Aggregated Supply by Crop Type</CardDescription>
        </CardHeader>
        <CardContent className="h-[280px] w-full p-8 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.produceSupply || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="crop" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 700 }} />
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', padding: '1rem', fontWeight: 800 }}
              />
              <Bar dataKey="supply" fill="hsl(var(--secondary))" radius={[8, 8, 8, 8]} barSize={32} animationDuration={2000} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
