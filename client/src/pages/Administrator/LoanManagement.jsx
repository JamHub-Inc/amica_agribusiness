import React, { useState, useEffect } from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HandHelping, Search, Eye, MoreHorizontal, CheckCircle, XCircle, Clock, DollarSign, TrendingUp, Loader2, AlertCircle, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { adminService } from '../../services/adminService';
import { toast } from 'sonner';

const statusStyles = {
  APPROVED: 'bg-success/10 text-success border-success/20',
  PENDING: 'bg-warning/10 text-warning border-warning/20',
  REJECTED: 'bg-destructive/10 text-destructive border-destructive/20',
  DISBURSED: 'bg-primary/10 text-primary border-primary/20',
};

const statusIcons = {
  APPROVED: CheckCircle,
  DISBURSED: CheckCircle,
  PENDING: Clock,
  REJECTED: XCircle,
};

export default function LoanManagement() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);
      const response = await adminService.getLoans();
      setLoans(response.data || []);
    } catch (error) {
      console.error('Failed to load loans:', error);
      toast.error('Failed to load credit applications');
    } finally {
      setLoading(false);
    }
  };

  const filtered = loans.filter(l => {
    const matchSearch = 
      l.farmer?.name?.toLowerCase().includes(search.toLowerCase()) || 
      l.farmer?.sacco?.name?.toLowerCase().includes(search.toLowerCase());
    
    // Support filtering by tab. Normalize status for matching
    const matchTab = tab === 'All' || l.status === tab.toUpperCase();
    return matchSearch && matchTab;
  });

  const stats = {
    total: loans.length,
    disbursed: loans.filter(l => l.status === 'DISBURSED').reduce((sum, l) => sum + (l.amount || 0), 0),
    repaid: loans.reduce((sum, l) => sum + (l.repaid || 0), 0),
    pending: loans.filter(l => l.status === 'PENDING').length,
  };

  return (
    <AdminDashboardLayout title="Credit Facilitation">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div>
              <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Credit Feed</h1>
              <p className="text-sm font-bold text-muted-foreground mt-1 uppercase tracking-widest">Global Loan Lifecycle & Capital Flow</p>
           </div>
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-none shadow-sm bg-white font-black text-sm uppercase tracking-widest gap-3" onClick={loadLoans}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Filter className="h-4 w-4 text-primary" />} REFRESH
           </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Operations', value: loading ? '-' : stats.total, icon: HandHelping, color: 'text-primary' },
            { label: 'Capital Disbursed', value: loading ? '-' : `KES ${(stats.disbursed/1000).toFixed(1)}K`, icon: DollarSign, color: 'text-success' },
            { label: 'Ecosystem Repayment', value: loading ? '-' : `KES ${(stats.repaid/1000).toFixed(1)}K`, icon: TrendingUp, color: 'text-info' },
            { label: 'Active Requests', value: loading ? '-' : stats.pending, icon: Clock, color: 'text-warning' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card rounded-[2rem] bg-card overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-0.5">{stat.label}</p>
                  <p className={`text-3xl font-serif ${stat.color}`}>{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* List Card */}
        <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card">
           <CardHeader className="p-8 pb-4 bg-muted/20 border-b border-border/40">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex gap-2 bg-white/50 p-1.5 rounded-[1.2rem] backdrop-blur-sm">
                {['All', 'Approved', 'Pending', 'Rejected', 'Disbursed'].map(t => (
                  <Button 
                    key={t} 
                    variant={tab === t ? 'default' : 'ghost'} 
                    size="sm" 
                    className={`rounded-xl text-[10px] font-black uppercase tracking-widest h-9 px-4 transition-all ${tab === t ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted'}`} 
                    onClick={() => setTab(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by farmer name or SACCO branch..." 
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
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Applicant</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Amount & Allocation</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Affiliate SACCO</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Flow Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Recapture Rate</th>
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
                        No usersfound matching current search criteria
                      </td>
                    </tr>
                  ) : (
                    filtered.map(loan => {
                      const StatusIcon = statusIcons[loan.status] || Clock;
                      const repayPercent = loan.amount > 0 ? Math.round(((loan.repaid || 0) / loan.amount) * 100) : 0;
                      return (
                        <tr key={loan.id} className="hover:bg-muted/30 transition-colors group">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
                                   {loan.farmer?.name ? loan.farmer.name[0] : 'L'}
                                </div>
                                <span className="font-serif text-lg text-foreground">{loan.farmer?.name}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex flex-col">
                                <span className="text-base font-normal font-serif text-foreground">KES {loan.amount?.toLocaleString()}</span>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{loan.purpose || 'Capital Infusion'}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="h-3.5 w-3.5 text-primary" /> {loan.farmer?.sacco?.name || 'Independent'}
                             </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className={`text-[10px] font-black px-3 py-1.5 rounded-full border w-fit uppercase tracking-widest flex items-center gap-2 ${statusStyles[loan.status] || 'bg-muted'}`}>
                              <StatusIcon className="h-3.5 w-3.5" />
                              {loan.status}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 min-w-[100px] h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-primary rounded-full shadow-sm shadow-primary/50 transition-all duration-1000" style={{ width: `${repayPercent}%` }}></div>
                              </div>
                              <span className="text-[10px] font-black text-muted-foreground min-w-[30px]">{repayPercent}%</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary hover:text-white transition-all"><MoreHorizontal className="h-5 w-5" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-64 p-3 rounded-[1.5rem] shadow-2xl border-none">
                                <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><Eye className="h-4 w-4 text-primary" /> Application Details</DropdownMenuItem>
                                <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><CheckCircle className="h-4 w-4 text-success" /> Authorize Capital</DropdownMenuItem>
                                <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest text-destructive"><XCircle className="h-4 w-4" /> Revoke Request</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })
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
