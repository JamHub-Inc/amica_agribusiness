import React from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, MapPin, Calendar, ArrowUpRight, ArrowDownRight, Search, Filter, ShoppingCart, Info } from 'lucide-react';

const currentPrices = [
  { item: 'Maize (White)', price: 'KES 3,200', unit: 'per 90kg bag', change: '+5.2%', trend: 'up', location: 'Nakuru' },
  { item: 'Beans (Rosecoco)', price: 'KES 8,500', unit: 'per 90kg bag', change: '-2.1%', trend: 'down', location: 'Meru' },
  { item: 'Potatoes (Irish)', price: 'KES 2,800', unit: 'per 50kg bag', change: '+12.5%', trend: 'up', location: 'Nyandarua' },
  { item: 'Onions (Red)', price: 'KES 5,500', unit: 'per 100kg net', change: '+1.5%', trend: 'up', location: 'Kajiado' },
  { item: 'Tomatoes', price: 'KES 4,500', unit: 'per 64kg crate', change: '-8.4%', trend: 'down', location: 'Isiolo' },
];

const priceHistoryData = [
  { month: 'Sep', maize: 3100, beans: 8200 },
  { month: 'Oct', maize: 3200, beans: 8100 },
  { month: 'Nov', maize: 3050, beans: 8300 },
  { month: 'Dec', maize: 3400, beans: 8400 },
  { month: 'Jan', maize: 3600, beans: 8250 },
  { month: 'Feb', maize: 3400, beans: 8150 },
  { month: 'Mar', maize: 3550, beans: 8250 },
];

export default function MarketPrices() {
  return (
    <VendorDashboardLayout title="Real-time Market Intelligence">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Market Intel</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">Real-time agricultural commodity prices and trend analysis across regions</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <Button variant="outline" className="h-12 px-6 rounded-2xl border-border font-bold text-xs uppercase tracking-widest bg-card shadow-sm hover:bg-muted gap-2">
                Regional Comparison
             </Button>
             <Button className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-md transform active:scale-95 transition-all border-none">
                Price Alerts
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Price List */}
          <div className="lg:col-span-1 space-y-4">
             {currentPrices.map((item, i) => (
                <Card key={i} className="border-none shadow-card rounded-[2rem] overflow-hidden bg-card hover:translate-y-[-4px] transition-transform cursor-pointer group">
                   <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                           <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black ${item.trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                           {item.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                           {item.change}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-normal text-lg text-foreground leading-tight mb-1 font-serif">{item.item}</h4>
                          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                             <MapPin className="h-3 w-3 text-primary" /> {item.location} Basin Office
                          </div>
                        </div>
                        <div className="flex items-baseline gap-2 pt-2 border-t border-border/10">
                           <p className="text-2xl font-normal tracking-tight text-foreground font-serif">{item.price}</p>
                           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.unit}</p>
                        </div>
                      </div>
                   </CardContent>
                </Card>
             ))}
          </div>

          {/* Advanced Analytics */}
          <div className="lg:col-span-2 space-y-8">
             <Card className="border-none shadow-card rounded-[2.5rem] bg-card overflow-hidden">
                <CardHeader className="p-8 pb-4 border-b border-border/40 relative overflow-hidden">
                   <div className="flex justify-between items-center relative z-10">
                      <div>
                        <CardTitle className="text-2xl font-normal tracking-tight text-foreground font-serif">Historical Price Matrix</CardTitle>
                        <CardDescription className="text-sm font-bold text-muted-foreground">6-month commodity tracking for strategic buying</CardDescription>
                      </div>
                      <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border border-primary/20">
                         <TrendingUp className="h-4 w-4" /> Market Bullish
                      </div>
                   </div>
                   <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                </CardHeader>
                <CardContent className="h-[400px] p-8">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorMaize" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorBeans" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', background: 'hsl(var(--card))' }}
                          itemStyle={{ fontWeight: 600, fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="maize" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorMaize)" name="White Maize" />
                        <Area type="monotone" dataKey="beans" stroke="hsl(var(--secondary))" strokeWidth={4} fillOpacity={1} fill="url(#colorBeans)" name="Rosecoco Beans" />
                      </AreaChart>
                   </ResponsiveContainer>
                </CardContent>
             </Card>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-card rounded-[2rem] bg-primary text-primary-foreground overflow-hidden p-8 hover:bg-primary/95 transition-colors border border-primary-dark/20">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-white/10 text-white">
                         <TrendingUp className="h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-normal tracking-tight font-serif">Bullish Commodities</h4>
                   </div>
                   <div className="space-y-4">
                      {[
                        { item: 'Irish Potatoes', level: '12.5% increase', trend: 'Critical' },
                        { item: 'White Maize', level: '5.2% increase', trend: 'Steady' },
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-primary-foreground/5 last:border-0 p-4 rounded-xl hover:bg-white/5 transition-all">
                           <div>
                              <p className="text-sm font-bold text-white mb-0.5">{s.item}</p>
                              <p className="text-[10px] font-black text-primary-foreground/70 uppercase tracking-widest">{s.trend} Supply</p>
                           </div>
                           <p className="text-sm font-black text-accent">{s.level}</p>
                        </div>
                      ))}
                   </div>
                </Card>

                <Card className="border-none shadow-card rounded-[2rem] bg-card overflow-hidden p-8 hover:shadow-lg transition-all">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
                         <TrendingDown className="h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-normal tracking-tight text-foreground font-serif">Buying Opportunities</h4>
                   </div>
                   <div className="space-y-4">
                      {[
                        { item: 'Red Onions', level: 'Low Price', trend: 'Buy Now' },
                        { item: 'Rosecoco Beans', level: 'Abundant', trend: 'Negotiate' },
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-border/10 last:border-0 p-4 rounded-xl hover:bg-muted/30 transition-all">
                           <div>
                              <p className="text-sm font-bold text-foreground mb-0.5">{s.item}</p>
                              <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{s.trend} Stage</p>
                           </div>
                           <div className="h-2 w-12 bg-destructive/10 rounded-full relative overflow-hidden">
                              <div className="absolute inset-y-0 left-0 bg-destructive w-[60%]"></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </Card>
             </div>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
