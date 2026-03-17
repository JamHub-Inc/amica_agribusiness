import { useState, useEffect } from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, Clock, MapPin, Package, MessageSquare, ArrowUpRight, Search, Filter } from 'lucide-react';
import { demandService } from '../../services/demandService';

export default function MarketDemand() {
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDemands();
  }, []);

  const loadDemands = async () => {
    try {
      const response = await demandService.getActive();
      setDemands(response.data);
    } catch (error) {
      console.error('Failed to load market demand:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FarmerDashboardLayout title="Market Demand">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Market Demand Hub</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">See what buyers are looking for and fulfill their procurement needs</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <Button variant="outline" className="h-12 px-6 rounded-2xl border-border font-bold text-xs uppercase tracking-widest bg-card shadow-sm hover:bg-muted gap-2">
               <Filter className="h-4 w-4" /> Filter Listings
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Total Verified Demands', value: loading ? '-' : demands.length, icon: Megaphone, color: 'text-primary', bg: 'bg-primary/5' },
             { label: 'Highest Demand', value: 'Maize', icon: Package, color: 'text-secondary', bg: 'bg-secondary/5' },
             { label: 'Market Outlook', value: 'Bullish', icon: ArrowUpRight, color: 'text-success', bg: 'bg-success/5' },
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

        <div className="space-y-6">
           {loading ? (
             [1, 2].map(i => <div key={i} className="h-48 rounded-[2.5rem] bg-muted animate-pulse"></div>)
           ) : demands.length === 0 ? (
             <div className="py-24 text-center border-dashed border-2 bg-muted/20 rounded-[2.5rem]">
               <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
               <h3 className="text-xl font-serif">No active buyer demands</h3>
               <p className="text-muted-foreground font-medium mb-6">Buyers haven't posted any requirements yet. Check back soon!</p>
             </div>
           ) : (
             demands.map((demand) => (
               <Card key={demand.id} className="border-none shadow-card rounded-[2.5rem] bg-card overflow-hidden group hover:shadow-lg transition-all duration-500 hover:scale-[1.01]">
                  <CardContent className="p-10">
                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div className="space-y-5">
                           <div className="flex items-center gap-3">
                              {demand.urgent && (
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-destructive/10 text-destructive animate-pulse">URGENT</span>
                              )}
                              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                 <Clock className="h-3 w-3" /> Posted {new Date(demand.createdAt).toLocaleDateString()}
                              </span>
                           </div>
                           <div className="flex items-baseline gap-4">
                              <h3 className="text-4xl font-normal tracking-tight text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.03em] font-serif">{demand.cropName}</h3>
                              <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Required: {demand.quantity}</p>
                           </div>
                           <div className="flex flex-wrap gap-8">
                              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                                 <MapPin className="h-4 w-4 text-primary" /> {demand.vendor?.location || 'Regional'}
                              </div>
                              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                                 <Package className="h-4 w-4 text-primary" /> Buying Price: KES {demand.price.toLocaleString()}
                              </div>
                           </div>
                        </div>

                        <div className="lg:text-right space-y-6 flex lg:flex-col justify-between items-center lg:items-end w-full lg:w-auto">
                           <div className="flex items-center gap-4 bg-muted/30 p-6 rounded-[2rem] border border-border/10 min-w-[200px] justify-center lg:justify-end">
                              <div className="h-10 w-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center shadow-md">
                                 <MessageSquare className="h-5 w-5" />
                              </div>
                              <div className="space-y-0.5 text-left">
                                 <p className="text-sm font-bold text-foreground">{demand.vendor?.name}</p>
                                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Verified Buyer</p>
                              </div>
                           </div>
                           <div className="flex gap-3">
                              <Button className="h-14 px-10 rounded-2xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black text-xs uppercase tracking-widest transition-all gap-3 shadow-md hover:shadow-lg border-none">
                                 Fulfill Demand <ArrowUpRight className="h-5 w-5" />
                              </Button>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
             ))
           )}
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
