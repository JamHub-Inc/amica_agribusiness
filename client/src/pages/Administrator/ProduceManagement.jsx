import React, { useState, useEffect } from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Search, MoreHorizontal, Eye, Edit3, Trash2, CheckCircle, AlertCircle, Loader2, Filter, Package, Scale } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { adminService } from '../../services/adminService';
import { toast } from 'sonner';

const statusStyles = {
  VERIFIED: 'bg-success/10 text-success border-success/20',
  PENDING: 'bg-warning/10 text-warning border-warning/20',
  REJECTED: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function ProduceManagement() {
  const [search, setSearch] = useState('');
  const [produce, setProduce] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduce();
  }, []);

  const loadProduce = async () => {
    try {
      setLoading(true);
      const resp = await adminService.getProduce();
      setProduce(resp.data || []);
    } catch (err) {
      console.error('Failed to load produce:', err);
      toast.error('Failed to load produce inventory');
    } finally {
      setLoading(false);
    }
  };

  const filtered = produce.filter(p => 
    p.farmer?.name?.toLowerCase().includes(search.toLowerCase()) || 
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: produce.length,
    verified: produce.filter(p => p.status === 'VERIFIED').length,
    pending: produce.filter(p => p.status === 'PENDING').length,
    totalWeight: produce.reduce((sum, p) => sum + (p.quantity || 0), 0),
  };

  return (
    <AdminDashboardLayout title="Produce Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Inventory</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1 uppercase tracking-widest">Global Produce Circulation</p>
          </div>
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-none shadow-sm bg-white font-black text-sm uppercase tracking-widest gap-3" onClick={loadProduce}>
             {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Filter className="h-4 w-4" />} Refresh Records
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Entries', value: loading ? '-' : stats.total, color: 'text-primary' },
            { label: 'Verified Volume', value: loading ? '-' : stats.verified, color: 'text-success' },
            { label: 'Awaiting Review', value: loading ? '-' : stats.pending, color: 'text-warning' },
            { label: 'Aggregated Weight', value: loading ? '-' : `${stats.totalWeight.toLocaleString()} KG`, color: 'text-primary' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card rounded-[2rem] bg-card overflow-hidden">
              <CardContent className="p-6">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className={`text-3xl font-serif ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card">
          <CardHeader className="p-8 pb-4 bg-muted/20 border-b border-border/40">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
               <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by farmer, crop or region..." 
                  className="h-12 pl-12 rounded-2xl bg-white border-none shadow-sm font-medium" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Producer</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Commodity</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Weight/Unit</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Validation</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Timestamp</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Registry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {loading ? (
                    [1, 2, 3, 4, 5].map(i => <tr key={i}><td colSpan="6" className="px-8 py-8"><div className="h-12 bg-muted animate-pulse rounded-2xl"></div></td></tr>)
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-8 py-20 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">
                        <AlertCircle className="h-10 w-10 mx-auto mb-4" />
                        No produce logs found in the directory
                      </td>
                    </tr>
                  ) : (
                    filtered.map(item => (
                      <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                 {item.farmer?.name ? item.farmer.name[0] : 'F'}
                              </div>
                              <span className="font-serif text-base">{item.farmer?.name}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold flex items-center gap-2">
                            <Leaf className="h-4 w-4 text-primary" />{item.name}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-foreground flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-muted-foreground" /> {item.quantity}</span>
                              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.unit || 'KG'}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`text-[10px] font-black px-3 py-1.5 rounded-full border w-fit uppercase tracking-widest ${statusStyles[item.status] || 'bg-muted'}`}>
                            {item.status || 'UNKNOWN'}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                           {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary hover:text-white transition-all"><MoreHorizontal className="h-5 w-5" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 p-3 rounded-[1.5rem] shadow-2xl border-none">
                              <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><Eye className="h-4 w-4 text-primary" /> View Batch Dossier</DropdownMenuItem>
                              <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><Edit3 className="h-4 w-4 text-secondary" /> Adjust Logistics</DropdownMenuItem>
                              <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><CheckCircle className="h-4 w-4 text-success" /> Override Verify</DropdownMenuItem>
                              <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest text-destructive"><Trash2 className="h-4 w-4" /> Purge Record</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
