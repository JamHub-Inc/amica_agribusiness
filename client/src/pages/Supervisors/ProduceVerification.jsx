import React, { useState, useEffect } from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, Clock, Package, Scale, User, Filter, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { produceService } from '@/services/produceService';
import { toast } from 'sonner';

export default function ProduceVerification() {
  const [search, setSearch] = useState('');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      setLoading(true);
      const response = await produceService.getPendingVerification();
      setBatches(response.data || []);
    } catch (error) {
      console.error('Failed to load produce:', error);
      toast.error('Failed to load pending produce batches');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    try {
      await produceService.verify(id, status);
      toast.success(`Batch ${status === 'VERIFIED' ? 'verified' : 'rejected'} successfully`);
      loadBatches();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const pendingFiltered = batches.filter(b => 
    b.status === 'PENDING' && (
      b.farmer?.name?.toLowerCase().includes(search.toLowerCase()) || 
      b.name?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const historyFiltered = batches.filter(b => 
    b.status !== 'PENDING' && (
      b.farmer?.name?.toLowerCase().includes(search.toLowerCase()) || 
      b.name?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const displayedBatches = activeTab === 'pending' ? pendingFiltered : historyFiltered;

  return (
    <SupervisorDashboardLayout title="Produce Verification">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Quality Control</h1>
              <p className="text-sm font-bold text-muted-foreground mt-1">Verify and certify produce batches arriving at the center</p>
           </div>
           <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-none shadow-sm bg-white h-12 font-bold px-6" onClick={loadBatches}>
                 {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Filter className="h-4 w-4 mr-2" />} Reload
              </Button>
           </div>
        </div>

        <div className="relative max-w-md">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input 
             placeholder="Search by farmer or crop..." 
             className="h-12 pl-12 rounded-2xl bg-white border-none shadow-sm font-medium" 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>

        <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-white">
           <CardHeader className="p-8 pb-4 bg-muted/20 border-b border-border/40">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <CardTitle className="text-2xl font-serif flex items-center gap-3">
                    <Package className="h-6 w-6 text-primary" /> {activeTab === 'pending' ? 'Incoming Batch Queue' : 'Verification History'}
                 </CardTitle>
                 <div className="flex bg-muted/40 p-1 rounded-xl">
                    <Button 
                      onClick={() => setActiveTab('history')} 
                      className={`h-10 rounded-lg font-bold px-6 shadow-none transition-colors border-none ${activeTab === 'history' ? 'bg-white text-primary shadow-sm hover:bg-white' : 'bg-transparent text-muted-foreground hover:bg-muted/80'}`}
                    >
                      All Produce
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('pending')} 
                      className={`h-10 rounded-lg font-bold px-6 shadow-none transition-colors border-none flex items-center gap-2 ${activeTab === 'pending' ? 'bg-white text-primary shadow-sm hover:bg-white' : 'bg-transparent text-muted-foreground hover:bg-muted/80'}`}
                    >
                      Pending Queue
                      {batches.filter(b => b.status === 'PENDING').length > 0 && (
                        <span className="bg-destructive text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                          {batches.filter(b => b.status === 'PENDING').length}
                        </span>
                      )}
                    </Button>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-0">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-muted/50">
                       <tr>
                          <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Batch Identifiers</th>
                          <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Volume & Quality</th>
                          <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Submission</th>
                          <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Verification</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                       {loading ? (
                          [1, 2, 3].map(i => <tr key={i}><td colSpan="4" className="px-8 py-8"><div className="h-12 bg-muted animate-pulse rounded-2xl"></div></td></tr>)
                       ) : displayedBatches.length === 0 ? (
                          <tr>
                             <td colSpan="4" className="px-8 py-20 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">
                                <AlertCircle className="h-10 w-10 mx-auto mb-4" />
                                {activeTab === 'pending' ? 'No pending batches for verification' : 'No produce history found'}
                             </td>
                          </tr>
                       ) : (
                          displayedBatches.map((batch) => (
                             <tr key={batch.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-4">
                                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                         {batch.name ? batch.name[0] : 'P'}
                                      </div>
                                      <div>
                                         <p className="text-sm font-black text-foreground uppercase tracking-tight">{batch.name}</p>
                                         <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold">
                                            <User className="h-3 w-3" /> {batch.farmer?.name}
                                         </div>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-8 py-6">
                                   <div className="flex flex-col">
                                      <span className="text-base font-serif flex items-center gap-2"><Scale className="h-4 w-4 text-muted-foreground" /> {batch.quantity} {batch.unit || 'KG'}</span>
                                      <span className="text-[10px] font-black text-success uppercase tracking-widest mt-1">Grade A - Premium</span>
                                   </div>
                                </td>
                                <td className="px-8 py-6">
                                   <div className="flex flex-col">
                                      <span className="text-sm font-bold text-foreground">{new Date(batch.createdAt).toLocaleDateString()}</span>
                                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                                         <Clock className="h-3 w-3" /> {new Date(batch.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                   </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   {batch.status === 'PENDING' ? (
                                     <>
                                       <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="rounded-xl border-success/20 text-success hover:bg-success hover:text-white font-bold h-10 px-4"
                                            onClick={() => handleVerify(batch.id, 'VERIFIED')}
                                          >
                                             <CheckCircle className="h-4 w-4 mr-2" /> Verify
                                          </Button>
                                          <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white font-bold h-10 px-4"
                                            onClick={() => handleVerify(batch.id, 'REJECTED')}
                                          >
                                             <XCircle className="h-4 w-4 mr-2" /> Reject
                                          </Button>
                                       </div>
                                       <div className="group-hover:hidden flex justify-end">
                                          <Badge className="bg-warning/10 text-warning border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                                             Waiting
                                          </Badge>
                                       </div>
                                     </>
                                   ) : (
                                     <div className="flex justify-end">
                                        <Badge className={`border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                                          batch.status === 'VERIFIED' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                                        }`}>
                                           {batch.status}
                                        </Badge>
                                     </div>
                                   )}
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
    </SupervisorDashboardLayout>
  );
}
