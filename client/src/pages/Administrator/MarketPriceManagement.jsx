import React, { useState, useEffect } from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Plus, Edit3, Trash2, TrendingUp, TrendingDown, MapPin, Calendar, Search, Loader2 } from 'lucide-react';
import { marketService } from '../../services/marketService';
import { toast } from 'sonner';

export default function MarketPriceManagement() {
  const [search, setSearch] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    commodity: '',
    price: '',
    unit: '',
    region: '',
    trend: 'STABLE'
  });

  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    try {
      setLoading(true);
      const resp = await marketService.getPrices();
      setPrices(resp.data || []);
    } catch (err) {
      console.error('Failed to load prices:', err);
      toast.error('Failed to load market prices');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await marketService.updatePrice(editingId, formData);
        toast.success('Price updated successfully');
      } else {
        await marketService.createPrice(formData);
        toast.success('Price added successfully');
      }
      setShowAddForm(false);
      setEditingId(null);
      setFormData({ commodity: '', price: '', unit: '', region: '', trend: 'STABLE' });
      loadPrices();
    } catch (err) {
      toast.error(err.message || 'Failed to save price');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      commodity: item.commodity,
      price: item.price.toString(),
      unit: item.unit,
      region: item.region,
      trend: item.trend || 'STABLE'
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this price entry?')) return;
    try {
      await marketService.deletePrice(id);
      toast.success('Price entry deleted');
      loadPrices();
    } catch (err) {
      toast.error('Failed to delete entry');
    }
  };

  const filtered = prices.filter(p => 
    p.commodity?.toLowerCase().includes(search.toLowerCase()) || 
    p.region?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminDashboardLayout title="Market Price Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Price Records</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">Manage commodity benchmark prices for the entire ecosystem</p>
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest shadow-md transition-all gap-3 border-none" onClick={() => {
            setShowAddForm(!showAddForm);
            if (showAddForm) setEditingId(null);
          }}>
            <Plus className="h-5 w-5" /> {editingId ? 'Cancel Editing' : 'Add Price Entry'}
          </Button>
        </div>

        {showAddForm && (
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-card overflow-hidden border-2 border-primary/20">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-serif text-primary">{editingId ? 'Edit Price Entry' : 'New Price Entry'}</CardTitle>
              <CardDescription className="text-sm font-bold text-muted-foreground">Define market rates and regional trends.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Commodity</Label>
                    <Input placeholder="e.g. Maize" className="h-12 rounded-xl bg-muted/50 border-none font-bold" value={formData.commodity} onChange={e => setFormData({...formData, commodity: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price (KES)</Label>
                    <Input type="number" placeholder="e.g. 4500" className="h-12 rounded-xl bg-muted/50 border-none font-bold" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Unit</Label>
                    <Input placeholder="e.g. per 90kg bag" className="h-12 rounded-xl bg-muted/50 border-none font-bold" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market / Region</Label>
                    <Input placeholder="e.g. Nairobi" className="h-12 rounded-xl bg-muted/50 border-none font-bold" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} required />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="space-y-2 flex-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Trend</Label>
                      <select className="w-full h-12 rounded-xl bg-muted/50 border-none px-4 font-bold outline-none appearance-none" value={formData.trend} onChange={e => setFormData({...formData, trend: e.target.value})}>
                         <option value="UP">📈 Rising Price</option>
                         <option value="DOWN">📉 Falling Price</option>
                         <option value="STABLE">↔️ Stable</option>
                      </select>
                   </div>
                   <div className="flex gap-3 pt-6">
                    <Button type="button" variant="ghost" className="rounded-xl h-12 font-bold px-6" onClick={() => {setShowAddForm(false); setEditingId(null);}}>Cancel</Button>
                    <Button className="h-12 px-10 rounded-xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black uppercase tracking-widest shadow-lg transition-all border-none">
                      {editingId ? 'Update Price' : 'Publish Rate'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search commodities or regions..." className="h-12 pl-12 rounded-2xl bg-card border-none shadow-sm font-medium" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-44 bg-muted animate-pulse rounded-[2rem]"></div>)
            ) : filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-muted/20 rounded-[2.5rem] border-2 border-dashed border-border/10">
                 <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                 <p className="text-xl font-serif text-muted-foreground">No price records found.</p>
              </div>
            ) : (
              filtered.map(item => (
                <Card key={item.id} className="border-none shadow-card rounded-[2.5rem] hover:shadow-xl transition-all duration-500 bg-card group border-b-4 border-b-transparent hover:border-b-primary overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <ShoppingCart className="h-6 w-6 text-primary group-hover:text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-normal font-serif truncate max-w-[120px]">{item.commodity}</h3>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.unit}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/50 hover:bg-primary hover:text-white transition-all" onClick={() => handleEdit(item)}><Edit3 className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/50 hover:bg-destructive hover:text-white transition-all" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-3xl font-normal font-serif">KES {(item.price || 0).toLocaleString()}</span>
                      <span className={`text-[10px] font-black flex items-center gap-1 uppercase tracking-widest ${item.trend === 'UP' ? 'text-success' : item.trend === 'DOWN' ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {item.trend === 'UP' ? <TrendingUp className="h-3 w-3" /> : item.trend === 'DOWN' ? <TrendingDown className="h-3 w-3" /> : 'STABLE'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground pt-4 border-t border-border/10">
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{item.region}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(item.updatedAt || item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
