import React, { useState, useEffect } from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, TrendingUp, TrendingDown, Filter, ArrowUpRight, ArrowDownRight, Info, Loader2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { marketService } from '../../services/marketService';
import { toast } from 'sonner';

export default function MarketPrices() {
  const [search, setSearch] = useState('');
  const [prices, setPrices] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [priceResp, insightResp] = await Promise.all([
        marketService.getPrices(),
        marketService.getInsights()
      ]);
      setPrices(priceResp.data || []);
      setInsights(insightResp.data || []);
    } catch (err) {
      console.error('Failed to load market data:', err);
      toast.error('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  const filtered = prices.filter(p => 
    p.commodity?.toLowerCase().includes(search.toLowerCase()) || 
    p.region?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SupervisorDashboardLayout title="Market Prices">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
            <Input 
              placeholder="Search market commodities..." 
              className="pl-10 h-12 rounded-2xl bg-white shadow-sm border-none focus-visible:ring-primary/20" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="rounded-xl flex-1 md:flex-none border-none shadow-sm bg-white h-12 font-medium gap-2" onClick={loadData}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Filter className="h-4 w-4" />} Refresh
            </Button>
            <Button className="rounded-xl flex-1 md:flex-none bg-primary text-white shadow-md h-12 font-medium gap-2">
              <Info className="h-4 w-4" /> Market Insights
            </Button>
          </div>
        </div>

        {/* Global Market Stats / Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {insights.length > 0 ? (
             insights.map((insight, idx) => (
                <Card key={idx} className={`border-none shadow-xl rounded-3xl bg-gradient-to-br ${insight.trend === 'UP' ? 'from-success/20' : 'from-warning/20'} to-white overflow-hidden`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className={`text-[10px] font-black ${insight.trend === 'UP' ? 'text-success' : 'text-warning'} uppercase tracking-widest`}>
                          {insight.trend === 'UP' ? 'Bullish Signal' : 'Supply Alert'}
                        </p>
                        <h3 className="text-xl font-serif leading-tight">{insight.text}</h3>
                        <div className={`flex items-center gap-1 text-[11px] font-bold mt-2 ${insight.trend === 'UP' ? 'text-success/80' : 'text-warning/80'}`}>
                          {insight.trend === 'UP' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} 
                          Updated just now
                        </div>
                      </div>
                      <div className={`p-4 ${insight.trend === 'UP' ? 'bg-success/10' : 'bg-warning/10'} rounded-2xl`}>
                        {insight.trend === 'UP' ? <TrendingUp className="h-8 w-8 text-success" /> : <TrendingDown className="h-8 w-8 text-warning" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
             ))
           ) : (
             <>
               <Card className="border-none shadow-xl rounded-3xl bg-muted/20 animate-pulse h-32"></Card>
               <Card className="border-none shadow-xl rounded-3xl bg-muted/20 animate-pulse h-32"></Card>
             </>
           )}

           <Card className="border-none shadow-xl rounded-3xl bg-primary text-white bg-no-repeat bg-right-bottom" style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 60%)' }}>
             <CardContent className="pt-6 h-full flex flex-col justify-center">
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-primary-foreground/70 uppercase tracking-widest">Global Status</p>
                 <h3 className="text-2xl font-serif">Awaiting Seasonal Peak</h3>
                 <p className="text-[11px] text-white/80 mt-2 line-clamp-1">Prices are stabilizing across major corridors.</p>
               </div>
             </CardContent>
           </Card>
        </div>

        {/* Detailed Price List */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card">
            <CardHeader className="bg-muted/30 p-8">
              <CardTitle className="text-2xl font-serif flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-primary" /> Real-time Price Index
              </CardTitle>
              <CardDescription className="font-bold text-muted-foreground">Certified data from local and regional collection centers</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b border-border/50">
                      <tr>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Commodity</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Price (KES)</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Region</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {loading ? (
                        [1, 2, 3].map(i => (
                          <tr key={i}><td colSpan="4" className="px-8 py-6"><div className="h-10 bg-muted animate-pulse rounded-xl"></div></td></tr>
                        ))
                      ) : filtered.length === 0 ? (
                        <tr><td colSpan="4" className="px-8 py-12 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">No commodities matching search</td></tr>
                      ) : (
                        filtered.map((data, i) => (
                          <tr key={i} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                            <td className="px-8 py-6">
                               <div className="flex flex-col">
                                  <span className="font-serif text-lg text-foreground">{data.commodity}</span>
                                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{data.unit}</span>
                               </div>
                            </td>
                            <td className="px-8 py-6 text-xl font-normal font-serif">KES {data.price.toLocaleString()}</td>
                            <td className="px-8 py-6">
                               <span className="px-4 py-1.5 bg-muted rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">{data.region}</span>
                            </td>
                            <td className={`px-8 py-6 text-right font-black text-sm ${data.trend === 'UP' ? 'text-success' : 'text-destructive'}`}>
                              <span className="flex items-center justify-end gap-1 uppercase tracking-widest text-[10px]">
                                {data.trend === 'UP' ? <ArrowUpRight className="h-4 w-4" /> : data.trend === 'DOWN' ? <ArrowDownRight className="h-4 w-4" /> : null}
                                {data.trend}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SupervisorDashboardLayout>
  );
}
