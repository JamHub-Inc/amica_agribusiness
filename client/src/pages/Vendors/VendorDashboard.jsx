import { useState, useEffect } from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  PackageCheck,
  ShoppingBag
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { produceService } from '../../services/produceService';
import { orderService } from '../../services/orderService';
import { Link, useNavigate } from 'react-router-dom';

const buyPriceData = [
  { month: 'Sep', maize: 3200, beans: 8100 },
  { month: 'Oct', maize: 3350, beans: 8250 },
  { month: 'Nov', maize: 3100, beans: 8400 },
  { month: 'Dec', maize: 3450, beans: 8300 },
  { month: 'Jan', maize: 3600, beans: 8200 },
  { month: 'Feb', maize: 3400, beans: 8150 },
  { month: 'Mar', maize: 3550, beans: 8250 },
];

export default function VendorDashboard() {
  const [marketListings, setMarketListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [marketRes, ordersRes] = await Promise.all([
        produceService.getMarketListings(),
        orderService.getVendorOrders()
      ]);
      setMarketListings(marketRes.data.slice(0, 5)); // Just take top 5 for dashboard
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const totalVolume = orders.filter(o => o.status === 'COMPLETED').length;
  const totalSpend = orders.filter(o => o.status === 'COMPLETED').reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <VendorDashboardLayout title="Market Overview">
      <div className="space-y-8">
        {/* Welcome Block */}
        <div className="bg-primary rounded-[2.5rem] p-8 md:p-12 text-primary-foreground relative overflow-hidden shadow-2xl border border-primary-dark/20">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
               <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Trading Session Active</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-normal tracking-tight mb-4 font-serif">Market Overview</h1>
            <p className="text-lg font-medium text-primary-foreground/80 leading-relaxed mb-8">
              Explore available produce, track your purchases, and monitor market demand in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/vendor/marketplace')} className="rounded-2xl h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-black shadow-xl shadow-accent/20 transform active:scale-95 transition-all gap-3 border-none">
                <ShoppingCart className="h-5 w-5" /> Browse Marketplace
              </Button>
              <Button onClick={() => navigate('/vendor/demand')} variant="outline" className="rounded-2xl h-14 px-8 border-white/20 hover:bg-white/10 text-white font-black gap-3 backdrop-blur-md">
                <Plus className="h-5 w-5" /> Post Demand
              </Button>
            </div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px]"></div>
          <img 
             src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
             alt="Market" 
             className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-10 pointer-events-none mix-blend-overlay" 
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Purchases', value: loading ? '-' : `KES ${totalSpend.toLocaleString()}`, icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10', trend: '+12.5%', trendUp: true },
            { label: 'Pending Orders', value: loading ? '-' : pendingOrders, icon: Clock, color: 'text-secondary', bg: 'bg-secondary/10', trend: 'Needs action', trendUp: false },
            { label: 'Total Volume', value: loading ? '-' : `${totalVolume} Items`, icon: Package, color: 'text-success', bg: 'bg-success/10', trend: '-2.4%', trendUp: false },
            { label: 'Market Demand', value: 'High', icon: TrendingUp, color: 'text-warning', bg: 'bg-warning/10', trend: 'Bullish', trendUp: true },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card rounded-[2rem] overflow-hidden group hover:shadow-lg transition-all duration-500 bg-card">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:rotate-12`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black ${stat.trendUp ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                    {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.trend}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
                  <h3 className="text-3xl font-normal tracking-tight text-foreground group-hover:text-primary transition-colors font-serif">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Price Trends */}
          <Card className="lg:col-span-2 border-none shadow-card rounded-[2.5rem] bg-card overflow-hidden">
             <CardHeader className="p-8 pb-4 border-b border-border/40">
               <div className="flex justify-between items-center">
                 <div>
                   <CardTitle className="text-2xl font-normal tracking-tight text-foreground font-serif">Purchase Price Trends</CardTitle>
                   <CardDescription className="text-sm font-bold text-muted-foreground">Regional buying price index for key commodities</CardDescription>
                 </div>
                 <select className="h-10 px-4 rounded-xl bg-muted border-none font-bold text-xs text-muted-foreground outline-none">
                    <option>Last 6 Months</option>
                    <option>Last Season</option>
                 </select>
               </div>
             </CardHeader>
             <CardContent className="h-[400px] p-8">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={buyPriceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    <Area type="monotone" dataKey="maize" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorMaize)" name="Maize" />
                    <Area type="monotone" dataKey="beans" stroke="hsl(var(--secondary))" strokeWidth={4} fillOpacity={1} fill="url(#colorBeans)" name="Beans" />
                 </AreaChart>
               </ResponsiveContainer>
             </CardContent>
          </Card>

          {/* Demand Alerts */}
          <Card className="border-none shadow-card rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden relative border border-primary-dark/20 flex flex-col">
            <CardHeader className="p-8 pb-4 relative z-10 shrink-0">
              <CardTitle className="text-2xl font-normal tracking-tight font-serif text-white">Demand Intelligence</CardTitle>
              <CardDescription className="text-sm font-bold text-white/70">AI-suggested buying opportunities</CardDescription>
            </CardHeader>
            <CardContent className="p-8 relative z-10 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                 {[
                   { title: 'Grain Shortage', detail: 'Central region reporting 30% lower maize stocks.', color: 'border-accent', icon: PackageCheck, status: 'HIGH PRIORITY' },
                   { title: 'Price Dip', detail: 'Potato prices fell in Nyandarua due to harvest peak.', color: 'border-success', icon: TrendingUp, status: 'SELL OPPORTUNITY' },
                 ].map((item, i) => (
                   <div key={i} className={`p-6 rounded-[2rem] bg-white/5 border-l-4 ${item.color} backdrop-blur-lg hover:bg-white/10 transition-colors cursor-pointer group`}>
                      <div className="flex justify-between items-center mb-3">
                         <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4 text-accent" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent">{item.status}</span>
                         </div>
                         <MoreHorizontal className="h-4 w-4 text-white/50 group-hover:text-white" />
                      </div>
                      <h4 className="text-lg font-bold mb-1 text-white">{item.title}</h4>
                      <p className="text-sm font-medium text-white/70 leading-relaxed">{item.detail}</p>
                   </div>
                 ))}
              </div>
              <Button className="w-full h-14 rounded-2xl bg-accent text-accent-foreground font-black uppercase tracking-widest hover:bg-accent/90 mt-6 border-none shadow-lg shrink-0">
                View All Insights
              </Button>
            </CardContent>
            {/* Background Glow */}
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
          </Card>
        </div>

        {/* Available Produce Tables */}
        <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card">
          <CardHeader className="p-8 pb-4 border-b border-border/40">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <CardTitle className="text-2xl font-normal tracking-tight font-serif">Available Produce</CardTitle>
                  <CardDescription className="text-sm font-bold text-muted-foreground">Live listings from verified farmers</CardDescription>
               </div>
               <div className="flex gap-2 w-full md:w-auto">
                 <div className="relative flex-1 md:w-64">
                   <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <input className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border-none font-bold text-xs text-foreground outline-none placeholder:text-muted-foreground" placeholder="Search cultivars..." />
                 </div>
                 <Button variant="outline" className="h-10 px-4 rounded-xl border-border font-bold text-[10px] uppercase tracking-widest gap-2">
                   <Filter className="h-3 w-3" /> Filters
                 </Button>
               </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
               <div className="p-8 space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-12 w-full bg-muted animate-pulse rounded-xl"></div>)}
               </div>
            ) : marketListings.length === 0 ? (
               <div className="py-16 text-center text-muted-foreground font-medium">No verified produce available yet.</div>
            ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Produce</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Quantity</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Location</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Farmer</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Listing Price</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {marketListings.map((listing) => (
                        <tr key={listing.id} className="group hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate('/vendor/marketplace')}>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                               <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                  <ShoppingBag className="h-5 w-5 text-primary" />
                               </div>
                               <span className="font-bold text-foreground">{listing.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 font-bold text-sm text-muted-foreground">{listing.quantity} {listing.unit}</td>
                          <td className="px-8 py-6 font-bold text-sm text-muted-foreground">{listing.farmer?.location || 'Unknown Location'}</td>
                          <td className="px-8 py-6">
                            <span className="text-sm font-bold text-foreground truncate block max-w-[120px]">{listing.farmer?.name || 'Unknown Farmer'}</span>
                          </td>
                          <td className="px-8 py-6 font-bold text-foreground underline underline-offset-4 decoration-primary/20">KES {listing.price.toLocaleString()}</td>
                          <td className="px-8 py-6">
                             <Button className="rounded-xl h-10 px-5 bg-foreground text-background group-hover:bg-primary group-hover:text-primary-foreground font-black text-[10px] uppercase tracking-widest transition-all border-none">
                               Buy Now
                             </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            )}
            <div className="p-6 border-t border-border/40 text-center">
               <Link to="/vendor/marketplace">
                 <Button variant="ghost" className="font-black text-xs text-primary uppercase tracking-widest hover:bg-primary/5">
                   View All Market Listings <ArrowUpRight className="h-4 w-4 ml-2" />
                 </Button>
               </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorDashboardLayout>
  );
}
