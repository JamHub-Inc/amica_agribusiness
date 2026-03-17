import React, { useState, useEffect } from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Sprout, Calendar, Droplets, Thermometer, ArrowRight, Loader2, Package, Tag, Calculator, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { produceService } from '../../services/produceService';

export default function MyProduce() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    quantity: '',
    unit: 'KG',
    price: '',
    harvestDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadProduce();
  }, []);

  const loadProduce = async () => {
    try {
      setLoading(true);
      const response = await produceService.getProduce();
      setCrops(response.data || []);
    } catch (error) {
      console.error('Failed to load produce:', error);
      toast.error('Failed to load produce registry');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        quantity: parseFloat(formData.quantity),
        price: parseFloat(formData.price),
        harvestDate: new Date(formData.harvestDate).toISOString()
      };
      await produceService.addProduce(payload);
      toast.success('Produce successfully registered in the ecosystem');
      setIsModalOpen(false);
      setFormData({
        name: '',
        variety: '',
        quantity: '',
        unit: 'KG',
        price: '',
        harvestDate: new Date().toISOString().split('T')[0]
      });
      loadProduce();
    } catch (error) {
      toast.error(error.message || 'Failed to list produce');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FarmerDashboardLayout title="My Produce">
      <div className="space-y-6 text-foreground">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-normal font-serif text-foreground">Grain & Yield</h2>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-70">Active produce and harvest registry</p>
          </div>
          <Button 
            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest shadow-md transition-all gap-3 border-none"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-5 w-5" /> New Planting
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-3xl bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : crops.length === 0 ? (
          <Card className="p-20 text-center border-none shadow-card bg-card rounded-[3rem]">
            <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Sprout className="h-10 w-10 text-primary opacity-40" />
            </div>
            <h3 className="text-3xl font-serif mb-2">Registry Empty</h3>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10 opacity-60">Your current harvest yield is not yet documented</p>
            <Button 
              variant="outline" 
              className="h-14 px-10 rounded-2xl border-2 border-primary text-primary font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              Add Produce
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops.map((crop) => (
              <Card key={crop.id} className="border-none shadow-card rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-card">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                      <Sprout className="h-7 w-7" />
                    </div>
                    <Badge className={`rounded-xl border-none px-4 py-2 font-black uppercase text-[10px] tracking-widest shadow-sm ${
                      crop.status === 'VERIFIED' ? 'bg-success text-white' : 
                      crop.status === 'PENDING' ? 'bg-warning text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {crop.status}
                    </Badge>
                  </div>
                  <div className="mt-6">
                    <CardTitle className="text-2xl font-serif text-foreground">{crop.name}</CardTitle>
                    <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 opacity-60">
                      {crop.variety || 'Standard'} Variety • {crop.location || 'Local Farm'}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/5">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 mb-2 opacity-60">
                        <Package className="h-3 w-3" /> Yield
                      </p>
                      <p className="text-lg font-serif">{crop.quantity} <span className="text-xs uppercase font-black tracking-widest text-muted-foreground">{crop.unit}</span></p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/5">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 mb-2 opacity-60">
                        <Calendar className="h-3 w-3" /> Harvest
                      </p>
                      <p className="text-sm font-bold text-primary">{crop.harvestDate ? new Date(crop.harvestDate).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/20">
                    <div className="flex justify-between items-center bg-primary/5 p-4 rounded-2xl">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Valuation</span>
                      <span className="text-sm font-black text-primary uppercase tracking-widest">KES {crop.price}/ {crop.unit}</span>
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full justify-between items-center group-hover:bg-primary/5 transition-colors text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl h-14 mt-2">
                    Open Produce <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Produce Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl rounded-[3rem] bg-card text-foreground">
            <div className="bg-primary/5 p-10 border-b border-border/10">
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-4xl font-serif">Harvest Registry</DialogTitle>
                    <DialogDescription className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-4 opacity-60">
                      Document new produce into the global agricultural infrastructure
                    </DialogDescription>
                  </div>
                  <div className="h-16 w-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary">
                    <Sprout className="h-8 w-8" />
                  </div>
                </div>
              </DialogHeader>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Commodity Name</Label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-40" />
                    <Input 
                      placeholder="e.g. Yellow Maize" 
                      className="h-14 rounded-2xl bg-muted/30 border-none pl-12 pr-6 font-bold text-sm focus:ring-2 ring-primary/20 transition-all" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Variety Strain</Label>
                  <Input 
                    placeholder="e.g. Hybrid KH-500" 
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold text-sm focus:ring-2 ring-primary/20 transition-all" 
                    value={formData.variety}
                    onChange={(e) => setFormData({...formData, variety: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Quantity</Label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-40" />
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="h-14 rounded-2xl bg-muted/30 border-none pl-12 pr-6 font-bold text-sm focus:ring-2 ring-primary/20 transition-all" 
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Metric Unit</Label>
                  <select 
                    className="w-full h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold text-sm outline-none focus:ring-2 ring-primary/20 transition-all appearance-none cursor-pointer"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="KG">Kilograms (KG)</option>
                    <option value="TONNE">Metric Tonne</option>
                    <option value="BAG">90KG Bag</option>
                    <option value="BUNCH">Bunch</option>
                    <option value="CRATE">Standard Crate</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Unit Price (KES)</Label>
                  <div className="relative">
                    <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-40" />
                    <Input 
                      type="number" 
                      placeholder="Price per unit" 
                      className="h-14 rounded-2xl bg-muted/30 border-none pl-12 pr-6 font-bold text-sm focus:ring-2 ring-primary/20 transition-all" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Harvest Completion Date</Label>
                <Input 
                  type="date" 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold text-sm focus:ring-2 ring-primary/20 transition-all" 
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                />
              </div>

              <DialogFooter className="pt-10 flex gap-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs opacity-60 hover:opacity-100" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Discard
                </Button>
                <Button 
                  type="submit" 
                  className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all gap-3 border-none flex-1"
                  disabled={submitting}
                >
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                  {submitting ? 'Registering...' : 'Confirm Listing'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </FarmerDashboardLayout>
  );
}

