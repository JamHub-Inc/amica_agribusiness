import { useState, useEffect } from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import { produceService } from '../../services/produceService';
import { orderService } from '../../services/orderService';

export default function Reports() {
  const [crops, setCrops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [produceRes, ordersRes] = await Promise.all([
        produceService.getProduce(),
        orderService.getFarmerOrders()
      ]);
      setCrops(produceRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Failed to load report data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Aggregating yield by crop name
  const yieldData = crops.reduce((acc, crop) => {
    const existing = acc.find(a => a.crop === crop.name);
    if (existing) {
      existing.current += crop.quantity;
    } else {
      acc.push({ crop: crop.name, current: crop.quantity, target: crop.quantity * 1.2 }); // 1.2 as a mock target
    }
    return acc;
  }, []);

  // Aggregating revenue by month (completed orders)
  const revenueData = orders
    .filter(o => o.status === 'COMPLETED')
    .reduce((acc, order) => {
      const month = new Date(order.updatedAt).toLocaleString('default', { month: 'short' });
      const existing = acc.find(a => a.month === month);
      if (existing) {
        existing.amount += order.totalPrice;
      } else {
        acc.push({ month, amount: order.totalPrice });
      }
      return acc;
    }, []);

  const totalYield = crops.reduce((sum, c) => sum + c.quantity, 0);
  const totalRevenue = orders.filter(o => o.status === 'COMPLETED').reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <FarmerDashboardLayout title="Analytics & Reports">
      <div className="space-y-6">
        {/* Performance Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-md rounded-2xl bg-primary text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/70 font-medium uppercase tracking-widest">Total Yield</p>
                  <h3 className="text-2xl font-serif">
                    {loading ? '-' : `${totalYield.toLocaleString()} ${crops[0]?.unit || 'Units'}`}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md rounded-2xl bg-secondary text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-secondary-foreground/70 font-medium uppercase tracking-widest">Total Revenue</p>
                  <h3 className="text-2xl font-serif">
                    {loading ? '-' : `KES ${totalRevenue.toLocaleString()}`}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md rounded-2xl bg-accent text-accent-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/5 rounded-xl">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Target Met</p>
                  <h3 className="text-2xl font-serif">88%</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md rounded-2xl bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-destructive/5 rounded-xl">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Loss Rate</p>
                  <h3 className="text-2xl font-serif text-destructive">2.4%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Yield Allocation</CardTitle>
              <CardDescription>Current vs Target yield per crop category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {loading ? (
                  <div className="h-full w-full bg-muted animate-pulse rounded-2xl"></div>
                ) : yieldData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">No yield data available.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="crop" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 400 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 400 }} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="current" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Current Yield" />
                      <Bar dataKey="target" fill="hsl(var(--secondary))" radius={[6, 6, 0, 0]} name="Target Yield" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Revenue Trend</CardTitle>
              <CardDescription>Visualizing completed sales revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {loading ? (
                  <div className="h-full w-full bg-muted animate-pulse rounded-2xl"></div>
                ) : revenueData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">No completed sales yet.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 400 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 400 }} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
