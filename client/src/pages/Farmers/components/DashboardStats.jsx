import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Sprout, ShoppingBag } from 'lucide-react';
import { produceService } from '../../../services/produceService';
import { orderService } from '../../../services/orderService';

export default function DashboardStats() {
  const [statsData, setStatsData] = useState({
    totalCrops: 0,
    activeOrders: 0,
    totalWeight: 0,
    yieldLabel: '0'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [produceRes, ordersRes] = await Promise.all([
          produceService.getProduce(),
          orderService.getFarmerOrders()
        ]);
        
        const crops = produceRes.data || [];
        const orders = ordersRes.data || [];
        const activeOrders = orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED').length;
        const totalWeight = crops.reduce((sum, c) => sum + (c.quantity || 0), 0);

        setStatsData({
          totalCrops: crops.length,
          activeOrders,
          totalWeight,
          yieldLabel: totalWeight > 0 ? `${totalWeight.toLocaleString()} ${crops[0]?.unit || 'KG'}` : '0'
        });
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const stats = [
    { label: 'Total Crops', value: loading ? '-' : statsData.totalCrops, icon: <Sprout className="text-white" />, trend: 'Active listings' },
    { label: 'Active Orders', value: loading ? '-' : statsData.activeOrders, icon: <ShoppingBag className="text-white" />, trend: 'Pending delivery' },
    { label: 'Total Produce', value: loading ? '-' : statsData.yieldLabel, icon: <TrendingUp className="text-white" />, trend: 'Cumulative weight' },
    { label: 'Average Price', value: 'KES 2,400', icon: <TrendingUp className="text-white" />, trend: 'Per unit' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            <div className="p-2 bg-primary shadow-sm rounded-xl transition-colors">
              {React.cloneElement(stat.icon, { className: 'h-4 w-4 text-white' })}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              {stat.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
