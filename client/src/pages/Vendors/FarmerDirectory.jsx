import React from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Search, Filter, MapPin, Package, Star, ArrowUpRight, MessageSquare, ShieldCheck, ShoppingBag } from 'lucide-react';

const farmers = [
  { id: 1, name: 'John Odhiambo', location: 'Kisumu', crops: 'Maize, Rice, Beans', capacity: '10-20 Tons/Season', rating: 4.8, verified: true, avatar: 'JO' },
  { id: 2, name: 'Agnes Wasai', location: 'Meru', crops: 'Potatoes, Carrots, Cabbage', capacity: '5-8 Tons/Season', rating: 4.9, verified: true, avatar: 'AW' },
  { id: 3, name: 'Peterson Kamau', location: 'Nakuru', crops: 'Tomatoes, Onions, Garlic', capacity: '2-4 Tons/Month', rating: 4.5, verified: true, avatar: 'PK' },
  { id: 4, name: 'Mary Wambui', location: 'Nyandarua', crops: 'Potatoes, Wheat, Peas', capacity: '15-25 Tons/Season', rating: 4.7, verified: true, avatar: 'MW' },
  { id: 5, name: 'David Kioko', location: 'Kajiado', crops: 'Watermelon, Onions, Peppers', capacity: '8-12 Tons/Season', rating: 4.6, verified: true, avatar: 'DK' },
];

export default function FarmerDirectory() {
  return (
    <VendorDashboardLayout title="Farmer Partners Directory">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Farmer Directory</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">Connect with verified farmers and build long-term supply relationships</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <input className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border border-border/60 font-medium text-sm text-foreground outline-none focus:border-primary transition-colors shadow-sm placeholder:text-muted-foreground" placeholder="Search farmers, crops..." />
             </div>
             <Button variant="outline" className="h-12 px-6 rounded-2xl border-border font-bold text-xs uppercase tracking-widest bg-card shadow-sm hover:bg-muted">
               <Filter className="h-4 w-4" /> Filters
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {farmers.map((farmer) => (
             <Card key={farmer.id} className="border-none shadow-card rounded-[2.5rem] overflow-hidden group hover:shadow-lg transition-all duration-500 bg-card">
                <CardContent className="p-10">
                   <div className="flex justify-between items-start mb-8">
                      <div className="h-16 w-16 rounded-[1.5rem] bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-md group-hover:scale-110 transition-transform">
                         {farmer.avatar}
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${farmer.verified ? 'bg-success/10 text-success shadow-sm border border-success/20' : 'bg-muted text-muted-foreground'}`}>
                         <ShieldCheck className="h-4 w-4" /> Verified
                      </div>
                   </div>

                   <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-normal tracking-tight text-foreground font-serif">{farmer.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground font-bold text-[10px] uppercase tracking-widest leading-none">
                         <MapPin className="h-3.5 w-3.5 text-primary" /> {farmer.location} region
                      </div>
                   </div>

                   <div className="space-y-4 mb-8 pt-6 border-t border-border/10">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Crop Specialization</p>
                         <p className="text-sm font-bold text-foreground leading-tight">{farmer.crops}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Supply Capacity</p>
                         <p className="text-sm font-bold text-foreground">{farmer.capacity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                               <Star key={s} className={`h-3 w-3 ${s <= Math.floor(farmer.rating) ? 'text-accent fill-accent' : 'text-muted'}`} />
                            ))}
                         </div>
                         <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{farmer.rating} (24 Reviews)</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 mt-4">
                      <Button variant="outline" className="h-14 rounded-2xl border-border font-bold text-[10px] uppercase tracking-widest hover:bg-muted gap-2 bg-transparent">
                         <MessageSquare className="h-4 w-4" /> Chat
                      </Button>
                      <Button className="h-14 rounded-2xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold text-[10px] uppercase tracking-widest shadow-md transform active:scale-95 transition-all gap-2 border-none">
                         <ShoppingBag className="h-4 w-4" /> View Yields
                      </Button>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
