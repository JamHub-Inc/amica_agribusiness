import { useState, useEffect } from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, Filter, MapPin, Package, User, TrendingUp, CheckCircle2 } from 'lucide-react';
import { produceService } from '../../services/produceService';
import { orderService } from '../../services/orderService';

export default function ProduceMarketplace() {
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    loadMarketplace();
  }, []);

  const loadMarketplace = async () => {
    try {
      const response = await produceService.getMarketListings();
      setListings(response.data);
    } catch (error) {
      console.error('Failed to load marketplace:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (item) => {
    try {
      setProcessingId(item.id);
      await orderService.createOrder({
        produceId: item.id,
        farmerId: item.farmerId || item.farmer?.id, // Send the farmerId payload
        quantity: item.quantity, // Default to buying all for now
        totalPrice: item.price * item.quantity
      });
      alert(`Order request for ${item.name} sent to ${item.farmer?.name || 'the farmer'}!`);
      // Refresh to show status if needed, or just remove from list if it's no longer "Available"
      loadMarketplace();
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to initiate purchase. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const filtered = listings.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    (l.farmer?.location || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <VendorDashboardLayout title="Marketplace">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Marketplace</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">Discover and source the finest produce direct from verified farmers</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <input 
                 className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border border-border/60 font-medium text-sm text-foreground outline-none focus:border-primary transition-colors shadow-sm placeholder:text-muted-foreground" 
                 placeholder="Search crops, regions..." 
                 value={search}
                 onChange={e => setSearch(e.target.value)}
               />
             </div>
             <Button variant="outline" className="h-12 px-6 rounded-2xl border-border font-bold text-xs uppercase tracking-widest gap-2 bg-card shadow-sm hover:bg-muted">
               <Filter className="h-4 w-4" /> Filters
             </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] rounded-[2.5rem] bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <Card key={item.id} className="border-none shadow-card rounded-[2.5rem] overflow-hidden group hover:shadow-lg transition-all duration-500 bg-card">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1551730459-92db2a3c8d6a?w=400&auto=format&fit=crop&q=80`} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mx-auto" 
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-border/30">
                     <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.status}</span>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-normal tracking-tight text-foreground mb-1 font-serif">{item.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground font-bold text-[10px] uppercase tracking-widest">
                         <MapPin className="h-3 w-3 text-primary" /> {item.farmer?.location || 'Regional'}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-normal tracking-tight text-success font-serif">KES {item.price.toLocaleString()}</p>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">per {item.unit}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border/10">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-muted-foreground">
                         <Package className="h-3.5 w-3.5 text-muted-foreground" /> Quantity Available
                      </div>
                      <span className="font-bold text-foreground">{item.quantity} {item.unit}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-muted-foreground">
                         <User className="h-3.5 w-3.5 text-muted-foreground" /> Farmer
                      </div>
                      <span className="font-bold text-primary hover:underline cursor-pointer">{item.farmer?.name || 'Unknown Farmer'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <Button variant="outline" className="h-12 rounded-2xl border-border font-bold text-[10px] uppercase tracking-widest hover:bg-muted bg-transparent">
                      Negotiate
                    </Button>
                    <Button 
                      onClick={() => handleBuy(item)}
                      disabled={processingId === item.id}
                      className="h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[10px] uppercase tracking-widest shadow-md transform active:scale-95 transition-all border-none"
                    >
                      {processingId === item.id ? 'Processing...' : 'Initiate Buy'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-24 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-serif">No produce available</h3>
            <p className="text-muted-foreground font-medium">Verified produce will appear here once farmers list them.</p>
          </div>
        )}
      </div>
    </VendorDashboardLayout>
  );
}
