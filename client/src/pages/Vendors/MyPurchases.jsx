import { useState, useEffect } from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Package, Calendar, User, MapPin, Search, Download, ExternalLink, Filter, ArrowUpRight } from 'lucide-react';
import { orderService } from '../../services/orderService';

export default function MyPurchases() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await orderService.getVendorOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedOrders = orders.filter(o => o.status === 'COMPLETED' || o.status === 'APPROVED');
  const totalSpend = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const uniqueFarmers = new Set(completedOrders.map(o => o.farmerId)).size;

  const filtered = completedOrders.filter(o => 
    o.produce.name.toLowerCase().includes(search.toLowerCase()) || 
    o.farmer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <VendorDashboardLayout title="Purchase History">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Purchase History</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">Review and manage your successfully completed procurement records</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <Button variant="outline" className="h-12 px-6 rounded-2xl border-border font-bold text-xs uppercase tracking-widest bg-card shadow-sm hover:bg-muted gap-2">
               <Download className="h-4 w-4" /> Download Report
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Volume', value: loading ? '-' : `${completedOrders.length} Items`, icon: Package, color: 'text-primary', bg: 'bg-primary/5' },
             { label: 'Total Spend', value: loading ? '-' : `KES ${totalSpend.toLocaleString()}`, icon: CheckCircle2, color: 'text-secondary', bg: 'bg-secondary/5' },
             { label: 'Purchases', value: loading ? '-' : completedOrders.length, icon: Calendar, color: 'text-success', bg: 'bg-success/5' },
             { label: 'Unique Farmers', value: loading ? '-' : uniqueFarmers, icon: User, color: 'text-warning', bg: 'bg-warning/5' },
           ].map((stat, i) => (
             <Card key={i} className={`border-none shadow-card rounded-[2.2rem] overflow-hidden ${stat.bg}`}>
               <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                     <div className={`p-4 rounded-2xl ${stat.color.replace('text', 'bg')}/10 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        <h3 className={`text-3xl font-normal tracking-tight ${stat.color} font-serif`}>{stat.value}</h3>
                     </div>
                  </div>
               </CardContent>
             </Card>
           ))}
        </div>

        <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card">
          <CardHeader className="p-8 pb-4 border-b border-border/40">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <CardTitle className="text-2xl font-normal tracking-tight text-foreground font-serif">Procurement Log</CardTitle>
                  <CardDescription className="text-sm font-bold text-muted-foreground">Historical records of all your confirmed purchases</CardDescription>
               </div>
               <div className="flex gap-2 w-full md:w-auto">
                 <div className="relative flex-1 md:w-64">
                   <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input 
                     className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border-none font-medium text-xs text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-0" 
                     placeholder="Search cultivars, farmers..." 
                     value={search}
                     onChange={e => setSearch(e.target.value)}
                   />
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
            ) : filtered.length === 0 ? (
              <div className="py-24 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-serif">No completed purchases found</h3>
                <p className="text-muted-foreground font-medium">As you complete orders with farmers, they will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Purchase ID</th>
                      <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Crop</th>
                      <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Quantity</th>
                      <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Farmer</th>
                      <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Investment</th>
                      <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Conf. Date</th>
                      <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {filtered.map((record) => (
                      <tr key={record.id} className="group hover:bg-muted/30 transition-colors cursor-pointer">
                        <td className="px-8 py-6">
                          <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-widest">#{record.id}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Package className="h-5 w-5 text-primary" />
                             </div>
                             <span className="font-bold text-foreground">{record.produce.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 font-bold text-sm text-muted-foreground">{record.quantity} {record.produce.unit}</td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-foreground truncate block max-w-[120px]">{record.farmer.name}</span>
                          <span className="text-[10px] text-muted-foreground block">{record.farmer.location}</span>
                        </td>
                        <td className="px-8 py-6 font-bold text-foreground underline underline-offset-4 decoration-primary/20">KES {record.totalPrice.toLocaleString()}</td>
                        <td className="px-8 py-6 font-bold text-sm text-muted-foreground">{new Date(record.createdAt).toLocaleDateString()}</td>
                        <td className="px-8 py-6">
                           <Button variant="ghost" className="rounded-xl h-10 w-10 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                             <Download className="h-4 w-4" />
                           </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="p-6 border-t border-border/40 text-center">
               <Button variant="ghost" className="font-black text-xs text-primary uppercase tracking-widest hover:bg-primary/5">
                 View Historical Analytics <ArrowUpRight className="h-4 w-4 ml-2" />
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorDashboardLayout>
  );
}
