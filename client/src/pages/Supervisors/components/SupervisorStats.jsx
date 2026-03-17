import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Leaf, HandHelping, ShoppingCart, TrendingUp, TrendingDown, Building2, CheckCircle2 } from 'lucide-react';
import { saccoService } from '../../../services/saccoService';

export default function SupervisorStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const resp = await saccoService.getStats();
      setData(resp.data);
    } catch (err) {
      console.error('Failed to load sacco stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'SACCO Members', value: loading ? '-' : data?.memberCount, icon: <Users className="text-white" />, trend: 'Verified Farmers', trendUp: true, bg: 'from-blue-500 to-indigo-600' },
    { label: 'Pending Verification', value: loading ? '-' : data?.pendingProduce, icon: <Leaf className="text-white" />, trend: 'Produce items', trendUp: null, bg: 'from-amber-500 to-orange-600' },
    { label: 'Loan Requests', value: loading ? '-' : data?.pendingLoans, icon: <HandHelping className="text-white" />, trend: 'Requires review', trendUp: true, bg: 'from-violet-500 to-purple-600' },
    { label: 'Total Produce (kg)', value: loading ? '-' : data?.totalProduceWeight.toLocaleString(), icon: <CheckCircle2 className="text-white" />, trend: 'Verified weight', trendUp: true, bg: 'from-emerald-500 to-green-600' },
    { label: 'Avg. Market Price', value: '4,500', icon: <ShoppingCart className="text-white" />, trend: 'KES/90kg bag', trendUp: null, bg: 'from-cyan-500 to-teal-600' },
    { label: 'SACCO Branch', value: loading ? '-' : (data?.location || 'General'), icon: <Building2 className="text-white" />, trend: data?.saccoName, trendUp: true, bg: 'from-rose-500 to-red-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-clip">
            <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-wider truncate">{stat.label}</CardTitle>
            <div className={`p-2 bg-gradient-to-br ${stat.bg} shadow-sm rounded-xl transition-colors`}>
              {loading ? <div className="h-4 w-4" /> : React.cloneElement(stat.icon, { className: 'h-4 w-4 text-white' })}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif">{stat.value}</div>
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1 font-medium">
              {stat.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
