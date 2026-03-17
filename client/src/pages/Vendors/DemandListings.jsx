import { useState, useEffect } from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, Plus, Search, Filter, ArrowUpRight, Clock, MapPin, Package, User, MoreHorizontal, MessageSquare } from 'lucide-react';
import { demandService } from '../../services/demandService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

export default function DemandListings() {
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    loadDemands();
  }, []);

  const loadDemands = async () => {
    try {
      setLoading(true);
      const response = await demandService.getMyListings();
      setDemands(response.data);
    } catch (error) {
      console.error('Failed to load demands:', error);
      toast.error('Failed to load your demand listings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantity || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      await demandService.create({
        ...formData,
        price: parseFloat(formData.price)
      });
      toast.success('Demand listing posted successfully');
      setOpen(false);
      setFormData({ cropName: '', quantity: '', price: '', description: '' });
      loadDemands();
    } catch (error) {
      console.error('Failed to create demand:', error);
      toast.error(error.message || 'Failed to post demand');
    } finally {
      setSubmitting(false);
    }
  };

  const activeCount = demands.filter(d => d.active).length;

  return (
    <VendorDashboardLayout title="Market Demand Management">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Demand Hub</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">Post your procurement needs and let verified farmers fulfill your orders</p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm uppercase tracking-widest shadow-md transform active:scale-95 transition-all gap-3 border-none">
                <Plus className="h-5 w-5" /> Post New Demand
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-[2.5rem] p-8">
              <DialogHeader>
                <DialogTitle className="text-3xl font-serif text-primary">Post Commodity Demand</DialogTitle>
                <DialogDescription className="text-sm font-bold text-muted-foreground">
                  Specify what you are looking to buy. Your listing will be visible to all verified farmers.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest">Crop Name</Label>
                  <Input 
                    placeholder="e.g. Yellow Maize" 
                    className="h-12 rounded-xl bg-muted/50 border-none font-bold"
                    value={formData.cropName}
                    onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest">Quantity (e.g. 500 Bags)</Label>
                    <Input 
                      placeholder="e.g. 500 Bags" 
                      className="h-12 rounded-xl bg-muted/50 border-none font-bold"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest">Target Price (KES)</Label>
                    <Input 
                      type="number" 
                      placeholder="e.g. 4500" 
                      className="h-12 rounded-xl bg-muted/50 border-none font-bold"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest">Additional Requirements</Label>
                  <Textarea 
                    placeholder="Special quality requirements, moisture content, etc." 
                    className="rounded-xl bg-muted/50 border-none min-h-[100px] font-medium p-4"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-xl group gap-2"
                    disabled={submitting}
                  >
                    {submitting ? 'Broadcasting Demand...' : 'Post Listing'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Active Demands', value: loading ? '-' : activeCount, icon: Megaphone, color: 'text-primary', bg: 'bg-primary/5' },
             { label: 'Total Responses', value: '0', icon: User, color: 'text-secondary', bg: 'bg-secondary/5' }, // Mock stat for now
             { label: 'Fulfillment Rate', value: '0%', icon: Package, color: 'text-success', bg: 'bg-success/5' }, // Mock stat for now
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
               <h3 className="text-xl font-serif">No active demands</h3>
               <p className="text-muted-foreground font-medium mb-6">Post your produce requirements to alert nearby farmers.</p>
               <Button onClick={() => setOpen(true)} variant="outline" className="rounded-xl border-primary text-primary font-bold">Post First Demand</Button>
             </div>
           ) : (
             demands.map((demand) => (
               <Card key={demand.id} className="border-none shadow-card rounded-[2.5rem] bg-card overflow-hidden group hover:shadow-lg transition-all duration-500 hover:scale-[1.01]">
                  <CardContent className="p-10">
                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div className="space-y-5">
                           <div className="flex items-center gap-3">
                              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${demand.active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{demand.active ? 'Active' : 'Closed'}</span>
                              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                 <Clock className="h-3 w-3" /> Posted {new Date(demand.createdAt).toLocaleDateString()}
                              </span>
                           </div>
                           <div className="flex items-baseline gap-4">
                              <h3 className="text-4xl font-normal tracking-tight text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.03em] font-serif">{demand.cropName}</h3>
                              <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">{demand.quantity}</p>
                           </div>
                           <div className="flex flex-wrap gap-8">
                              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                                 <Package className="h-4 w-4 text-primary" /> Target Budget: KES {demand.price.toLocaleString()}
                              </div>
                           </div>
                        </div>

                        <div className="lg:text-right space-y-6 flex lg:flex-col justify-between items-center lg:items-end w-full lg:w-auto">
                           <div className="flex items-center gap-4 bg-muted/30 p-6 rounded-[2rem] border border-border/10 min-w-[200px] justify-center lg:justify-end">
                              <div className="h-10 w-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center shadow-md">
                                 <MessageSquare className="h-5 w-5" />
                              </div>
                              <div className="space-y-0.5 text-left">
                                 <p className="text-2xl font-normal text-foreground font-serif">0</p>
                                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Farmer Proposals</p>
                              </div>
                           </div>
                           <div className="flex gap-3">
                              <Button variant="ghost" className="h-14 w-14 rounded-2xl bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                                 <MoreHorizontal className="h-5 w-5" />
                              </Button>
                              <Button className="h-14 px-10 rounded-2xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black text-xs uppercase tracking-widest transition-all gap-3 shadow-md hover:shadow-lg border-none">
                                 Manage Listing <ArrowUpRight className="h-5 w-5" />
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
    </VendorDashboardLayout>
  );
}
