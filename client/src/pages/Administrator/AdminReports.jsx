import React from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, Download, TrendingUp, Leaf, DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const productionData = [
  { month: 'Aug', maize: 4200, beans: 3100, potatoes: 5800 },
  { month: 'Sep', maize: 4800, beans: 3400, potatoes: 6100 },
  { month: 'Oct', maize: 5200, beans: 2900, potatoes: 5500 },
  { month: 'Nov', maize: 4600, beans: 3600, potatoes: 6400 },
  { month: 'Dec', maize: 5100, beans: 3200, potatoes: 5900 },
  { month: 'Jan', maize: 5500, beans: 3800, potatoes: 6800 },
  { month: 'Feb', maize: 5800, beans: 4100, potatoes: 7200 },
];

const priceTrendData = [
  { month: 'Aug', maize: 3800, beans: 7500, potatoes: 2200 },
  { month: 'Sep', maize: 4000, beans: 8000, potatoes: 2400 },
  { month: 'Oct', maize: 4200, beans: 8200, potatoes: 2600 },
  { month: 'Nov', maize: 4100, beans: 8500, potatoes: 2500 },
  { month: 'Dec', maize: 4300, beans: 8300, potatoes: 2700 },
  { month: 'Jan', maize: 4500, beans: 8600, potatoes: 2800 },
  { month: 'Feb', maize: 4500, beans: 8500, potatoes: 2800 },
];

const loanData = [
  { month: 'Aug', disbursed: 2400, repaid: 1800 },
  { month: 'Sep', disbursed: 3100, repaid: 2200 },
  { month: 'Oct', disbursed: 2800, repaid: 2600 },
  { month: 'Nov', disbursed: 3500, repaid: 2900 },
  { month: 'Dec', disbursed: 2900, repaid: 3100 },
  { month: 'Jan', disbursed: 3800, repaid: 3200 },
  { month: 'Feb', disbursed: 4200, repaid: 3400 },
];

const regionData = [
  { region: 'Central', production: 18500 },
  { region: 'Rift Valley', production: 22400 },
  { region: 'Western', production: 14200 },
  { region: 'Nyanza', production: 11800 },
  { region: 'Eastern', production: 16400 },
  { region: 'Coast', production: 8900 },
];

export default function AdminReports() {
  return (
    <AdminDashboardLayout title="Reports & Analytics">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" /> Reports & Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">System-wide insights and performance metrics.</p>
          </div>
          <Button variant="outline" className="rounded-xl font-medium gap-2 h-11 border-primary/20 text-primary">
            <Download className="h-4 w-4" /> Export Reports
          </Button>
        </div>

        {/* Production Trends */}
        <Card className="border-none shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-serif flex items-center gap-2"><Leaf className="h-5 w-5 text-primary" /> Farmer Production Trends</CardTitle>
            <CardDescription>Monthly produce volume by crop type (in kg).</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="maize" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={18} name="Maize" />
                <Bar dataKey="beans" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={18} name="Beans" />
                <Bar dataKey="potatoes" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} barSize={18} name="Potatoes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price Trends */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> Market Price Trends</CardTitle>
              <CardDescription>Price fluctuations per crop (KES).</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px] pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="maize" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} name="Maize" />
                  <Line type="monotone" dataKey="beans" stroke="hsl(var(--secondary))" strokeWidth={2.5} dot={{ r: 3 }} name="Beans" />
                  <Line type="monotone" dataKey="potatoes" stroke="hsl(var(--info))" strokeWidth={2.5} dot={{ r: 3 }} name="Potatoes" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Loan Analytics */}
          <Card className="border-none shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Loan Analytics</CardTitle>
              <CardDescription>Monthly loan disbursement vs repayment (KES '000).</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px] pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loanData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="disbursedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="repaidGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="disbursed" stroke="hsl(var(--primary))" fill="url(#disbursedGrad)" strokeWidth={2} name="Disbursed" />
                  <Area type="monotone" dataKey="repaid" stroke="hsl(var(--success))" fill="url(#repaidGrad)" strokeWidth={2} name="Repaid" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Regional Performance */}
        <Card className="border-none shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-serif flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Regional Crop Performance</CardTitle>
            <CardDescription>Total production output by region (in kg).</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis type="category" dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} width={80} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="production" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} barSize={24} animationDuration={1500} name="Production (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
