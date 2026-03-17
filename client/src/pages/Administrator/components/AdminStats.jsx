import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Leaf, HandHelping, ShoppingCart, TrendingUp, TrendingDown, Building2, AlertTriangle, Activity } from 'lucide-react';
import { adminService } from '../../../services/adminService';

export default function AdminStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const resp = await adminService.getStats();
        setData(resp.data);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const stats = [
    { label: 'Total Farmers', value: loading ? '-' : data?.farmers, icon: <Users className="text-white" />, trend: 'Registered accounts', trendUp: true, bg: 'from-emerald-500 to-green-600' },
    { label: 'Supervisors', value: loading ? '-' : data?.supervisors, icon: <Building2 className="text-white" />, trend: 'Active SACCO leads', trendUp: null, bg: 'from-blue-500 to-indigo-600' },
    { label: 'Vendors', value: loading ? '-' : data?.vendors, icon: <ShoppingCart className="text-white" />, trend: 'Wholesalers/Buyers', trendUp: true, bg: 'from-amber-500 to-orange-600' },
    { label: 'Produce Weight', value: loading ? '-' : `${(data?.totalProduceWeight || 0).toLocaleString()}kg`, icon: <Leaf className="text-white" />, trend: 'Verified produce', trendUp: true, bg: 'from-violet-500 to-purple-600' },
    { label: 'Loan Volume', value: loading ? '-' : `KES ${(data?.totalLoansDisbursed || 0).toLocaleString()}`, icon: <HandHelping className="text-white" />, trend: 'Total disbursed', trendUp: null, bg: 'from-cyan-500 to-teal-600' },
    { label: 'Pending Actions', value: loading ? '-' : data?.pendingActions, icon: <Activity className="text-white" />, trend: 'Requests for review', trendUp: false, bg: 'from-rose-500 to-red-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">{stat.label}</CardTitle>
            <div className={`p-2 bg-gradient-to-br ${stat.bg} shadow-sm rounded-xl transition-colors`}>
              {loading ? <div className="h-4 w-4" /> : React.cloneElement(stat.icon, { className: 'h-4 w-4 text-white' })}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif">{stat.value}</div>
            <p className="text-[10px] font-bold text-muted-foreground mt-1 flex items-center gap-1 uppercase tracking-widest">
              {stat.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
