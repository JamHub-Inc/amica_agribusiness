import React from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, TrendingUp, TrendingDown, Filter, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const priceData = [
  { item: 'Maize', current: '3,450', change: '+2.5%', trend: 'up', history: [3200, 3300, 3250, 3400, 3450] },
  { item: 'Beans', current: '8,200', change: '-1.2%', trend: 'down', history: [8400, 8300, 8500, 8350, 8200] },
  { item: 'Tomatoes', current: '5,600', change: '+12.4%', trend: 'up', history: [4000, 4500, 5000, 5200, 5600] },
  { item: 'Onions', current: '4,100', change: '+0.8%', trend: 'up', history: [3900, 4000, 4050, 4080, 4100] },
  { item: 'Potatoes', current: '2,900', change: '-5.3%', trend: 'down', history: [3200, 3100, 3050, 3000, 2900] },
];

export default function MarketPrices() {
  return (
    <FarmerDashboardLayout title="Market Prices">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
            <Input placeholder="Search market commodities..." className="pl-10 h-12 rounded-2xl bg-white shadow-sm border-none focus-visible:ring-primary/20" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="rounded-xl flex-1 md:flex-none border-none shadow-sm bg-white h-12 font-medium gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button className="rounded-xl flex-1 md:flex-none bg-primary text-white shadow-md h-12 font-medium gap-2">
              <Info className="h-4 w-4" /> Market Insights
            </Button>
          </div>
        </div>

        {/* Global Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="border-none shadow-xl rounded-3xl bg-gradient-to-br from-success/20 to-white overflow-hidden">
             <CardContent className="pt-6">
               <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-[10px] font-medium text-success uppercase tracking-widest">Active Demand</p>
                   <h3 className="text-2xl font-serif">Horticulture</h3>
                   <div className="flex items-center gap-1 text-[11px] font-medium text-success/80 mt-2">
                     <ArrowUpRight className="h-3 w-3" /> 18% Increase this week
                   </div>
                 </div>
                 <div className="p-4 bg-success/10 rounded-2xl">
                   <TrendingUp className="h-8 w-8 text-success" />
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="border-none shadow-xl rounded-3xl bg-gradient-to-br from-warning/20 to-white overflow-hidden">
             <CardContent className="pt-6">
               <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-[10px] font-medium text-warning uppercase tracking-widest">Supply Warning</p>
                   <h3 className="text-2xl font-serif">Cereals</h3>
                   <div className="flex items-center gap-1 text-[11px] font-medium text-warning/80 mt-2">
                     <ArrowDownRight className="h-3 w-3" /> Tightening market stocks
                   </div>
                 </div>
                 <div className="p-4 bg-warning/10 rounded-2xl">
                   <TrendingDown className="h-8 w-8 text-warning" />
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="border-none shadow-xl rounded-2xl bg-primary text-white bg-no-repeat bg-right-bottom" style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 60%)' }}>
             <CardContent className="pt-6">
               <div className="space-y-1">
                 <p className="text-[10px] font-medium text-primary-foreground/70 uppercase tracking-widest">Market Recommendation</p>
                 <h3 className="text-2xl font-serif">Sell Now: Tomatoes</h3>
                 <p className="text-[11px] text-white/80 mt-2 line-clamp-1">Prices are at a 6-month seasonal peak.</p>
               </div>
             </CardContent>
           </Card>
        </div>

        {/* Detailed Price List */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" /> Live Retail Prices (per 90KG Bag)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-muted/50 border-b border-border/50">
                     <tr>
                       <th className="px-6 py-5 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Commodity</th>
                       <th className="px-6 py-5 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Current Price (KES)</th>
                       <th className="px-6 py-5 text-[10px] font-medium text-muted-foreground uppercase tracking-widest text-center">7-Day Trend</th>
                       <th className="px-6 py-5 text-[10px] font-medium text-muted-foreground uppercase tracking-widest text-right">Change</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border/20">
                     {priceData.map((data, i) => (
                       <tr key={i} className="hover:bg-muted/10 transition-colors group cursor-pointer">
                         <td className="px-6 py-5 font-medium text-sm text-foreground">{data.item}</td>
                         <td className="px-6 py-5 font-serif text-base">{data.current}</td>
                         <td className="px-6 py-5 min-w-[150px]">
                            <div className="h-[40px] w-full max-w-[120px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.history.map((val, idx) => ({ idx, val }))}>
                                  <Line type="monotone" dataKey="val" stroke={data.trend === 'up' ? '#10b981' : '#f43f5e'} strokeWidth={3} dot={false} />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                         </td>
                         <td className={`px-6 py-5 text-right font-medium text-sm ${data.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                           <span className="flex items-center justify-end gap-1">
                             {data.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                             {data.change}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
