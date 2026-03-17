import { useState, useEffect } from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Clock, CheckCircle2, XCircle, AlertCircle, ArrowRight, User, Package, MapPin, MoreVertical } from 'lucide-react';
import { orderService } from '../../services/orderService';

export default function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const pendingOrders = orders.filter(o => o.status === 'PENDING');

  return (
    <VendorDashboardLayout title="Market Orders">
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Purchase Orders</h1>
                <p className="text-sm font-bold text-muted-foreground mt-1">Review and manage your pending purchase requests</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-12 px-6 rounded-2xl border-border font-bold text-xs uppercase tracking-widest bg-card shadow-sm hover:bg-muted">
                  Export PDF
                </Button>
                <Button className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-md transform active:scale-95 transition-all border-none">
                  Bulk Actions
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Requests', value: loading ? '-' : pendingOrders.length, color: 'text-foreground', bg: 'bg-card', icon: ClipboardList },
                  { label: 'Awaiting Response', value: loading ? '-' : pendingOrders.length, color: 'text-warning', bg: 'bg-warning/10', icon: Clock },
                  { label: 'In Negotiation', value: '0', color: 'text-secondary', bg: 'bg-secondary/10', icon: AlertCircle },
                  { label: 'Confirmed Today', value: '0', color: 'text-success', bg: 'bg-success/10', icon: CheckCircle2 },
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

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
               <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card">
                 <CardContent className="p-10">
                    <div className="space-y-6">
                        {loading ? (
                          [1, 2].map(i => <div key={i} className="h-40 rounded-[2rem] bg-muted animate-pulse"></div>)
                        ) : pendingOrders.length === 0 ? (
                          <div className="py-24 text-center">
                            <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <h3 className="text-xl font-serif">No pending orders</h3>
                            <p className="text-muted-foreground font-medium">When you initiate a purchase from the marketplace, it will appear here waiting for farmer confirmation.</p>
                          </div>
                        ) : (
                          pendingOrders.map((order) => (
                            <div key={order.id} className="group p-8 rounded-[2rem] bg-muted/30 hover:bg-background hover:shadow-lg transition-all duration-500 border border-transparent hover:border-border/50 relative overflow-hidden">
                               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                                  <div className="space-y-4">
                                     <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-primary bg-primary/10 px-4 py-1.5 rounded-full uppercase tracking-widest">#{order.id}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-warning/10 text-warning`}>{order.status}</span>
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                     </div>
                                     <div className="flex items-baseline gap-4">
                                        <h3 className="text-4xl font-normal tracking-tight text-foreground font-serif">{order.produce.name}</h3>
                                        <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">{order.quantity} {order.produce.unit}</p>
                                     </div>
                                     <div className="flex flex-wrap gap-6 items-center">
                                        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                                           <User className="h-4 w-4 text-primary" /> {order.farmer.name}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                                           <MapPin className="h-4 w-4 text-primary" /> {order.farmer.location}
                                        </div>
                                     </div>
                                  </div>

                                  <div className="lg:text-right space-y-4 flex lg:flex-col justify-between items-center lg:items-end">
                                     <div className="space-y-1">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Total Estimate</p>
                                        <h4 className="text-3xl font-normal text-foreground font-serif">KES {order.totalPrice.toLocaleString()}</h4>
                                     </div>
                                     <div className="flex gap-3">
                                        <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                                           <MoreVertical className="h-5 w-5" />
                                        </Button>
                                        <Button className="h-12 px-8 rounded-2xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold text-xs uppercase tracking-widest transition-all gap-3 shadow-md hover:shadow-lg border-none">
                                           Manage Order <ArrowRight className="h-4 w-4" />
                                        </Button>
                                     </div>
                                  </div>
                               </div>
                               
                               {/* Background accent */}
                               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[4rem]"></div>
                            </div>
                          ))
                        )}
                    </div>
                 </CardContent>
               </Card>
            </div>
        </div>
    </VendorDashboardLayout>
  );
}
