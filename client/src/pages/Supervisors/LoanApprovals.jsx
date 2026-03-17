import { useState, useEffect } from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HandHelping, Search, MoreHorizontal, Eye, CheckCircle2, XCircle, Clock, DollarSign, TrendingUp, Filter, AlertCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { loanService } from '../../services/loanService';

export default function LoanApprovals() {
  const [search, setSearch] = useState('');
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const response = await loanService.getPending();
      setLoans(response.data);
    } catch (error) {
      console.error('Failed to load pending loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await loanService.updateStatus(id, status);
      setLoans(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    } catch (error) {
      console.error('Failed to update loan status:', error);
    }
  };

  const pendingFiltered = loans.filter(l => 
    l.status === 'PENDING' && (
      l.farmer?.name?.toLowerCase().includes(search.toLowerCase()) || 
      l.purpose?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const historyFiltered = loans.filter(l => 
    l.status !== 'PENDING' && (
      l.farmer?.name?.toLowerCase().includes(search.toLowerCase()) || 
      l.purpose?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const displayedLoans = activeTab === 'pending' ? pendingFiltered : historyFiltered;

  return (
    <SupervisorDashboardLayout title="Loan Approvals">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif flex items-center gap-2"><HandHelping className="h-6 w-6 text-primary" /> Loan Approvals</h1>
            <p className="text-sm text-muted-foreground mt-1">Review and approve loan requests within your SACCO branch.</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="relative w-full sm:w-80 border rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search loan requests..." className="pl-10 h-10 border-none bg-muted/30 focus-visible:ring-0 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold gap-2">
                <Filter className="h-3.5 w-3.5" /> High Urgency
            </Button>
          </div>
        </div>

        {/* Table List */}
        <Card className="border-none shadow-md rounded-2xl">
          <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <CardTitle className="text-lg font-serif">
                    {activeTab === 'pending' ? 'Pending Loan Requests' : 'Loan Review History'}
                 </CardTitle>
                 <div className="flex bg-muted/40 p-1 rounded-xl">
                    <Button 
                      onClick={() => setActiveTab('history')} 
                      className={`h-10 rounded-lg font-bold px-6 shadow-none transition-colors border-none ${activeTab === 'history' ? 'bg-primary text-black shadow-sm hover:bg-muted/10' : 'bg-transparent text-muted-foreground hover:bg-muted/10'}`}
                    >
                      All Loans
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('pending')} 
                      className={`h-10 rounded-lg font-bold px-6 shadow-none transition-colors border-none flex items-center gap-2 ${activeTab === 'pending' ? 'bg-white text-primary shadow-sm hover:bg-white' : 'bg-transparent text-muted-foreground hover:bg-muted/80'}`}
                    >
                      Pending Queue
                      {loans.filter(l => l.status === 'PENDING').length > 0 && (
                        <span className="bg-destructive text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                          {loans.filter(l => l.status === 'PENDING').length}
                        </span>
                      )}
                    </Button>
                 </div>
              </div>
          </CardHeader>
          <CardContent className="pt-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 w-full bg-muted animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 text-left">
                      <th className="py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Farmer</th>
                      <th className="py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Amount</th>
                      <th className="py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Purpose</th>
                      <th className="py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                      <th className="py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedLoans.map(loan => (
                      <tr key={loan.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors group">
                        <td className="py-3 px-4 font-bold text-sm">
                          <div>
                            <p>{loan.farmer.name}</p>
                            <p className="text-[10px] text-muted-foreground">{loan.farmer.location}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-black text-sm">KES {loan.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-xs font-medium text-muted-foreground truncate max-w-[150px]">{loan.purpose}</td>
                        <td className="py-3 px-4">
                          {loan.status === 'PENDING' ? (
                            <Badge className="bg-warning/10 text-warning border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                               Waiting
                            </Badge>
                          ) : (
                            <Badge className={`border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                              loan.status === 'APPROVED' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                            }`}>
                               {loan.status}
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {loan.status === 'PENDING' ? (
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="rounded-xl h-8 text-[10px] font-bold border-success/20 text-success hover:bg-success/10"
                                  onClick={() => handleUpdateStatus(loan.id, 'APPROVED')}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="rounded-xl h-8 text-[10px] font-bold border-destructive/20 text-destructive hover:bg-destructive/10"
                                  onClick={() => handleUpdateStatus(loan.id, 'REJECTED')}
                                >
                                  Reject
                                </Button>
                              </div>
                          ) : (
                               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">Locked</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && displayedLoans.length === 0 && (
                <div className="py-12 text-center text-muted-foreground opacity-50 space-y-2">
                    <HandHelping className="h-10 w-10 mx-auto" strokeWidth={1.5} />
                    <p className="text-sm font-bold">{activeTab === 'pending' ? 'No pending loan requests' : 'No loan history found'}</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SupervisorDashboardLayout>
  );
}
