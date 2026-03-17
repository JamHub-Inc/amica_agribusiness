import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, CreditCard, ArrowUpRight } from 'lucide-react';
import { loanService } from '../../../services/loanService';
import { useNavigate } from 'react-router-dom';

export default function LoanStatus() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const response = await loanService.getSummary();
        setSummary(response.data);
      } catch (err) {
        console.error('Failed to load loan status:', err);
      } finally {
        setLoading(false);
      }
    };
    loadLoans();
  }, []);

  const totalOutstandingFloat = summary ? parseFloat(summary.outstanding.replace('KES ', '').replace(/,/g, '')) : 0;
  // For the progress bar, we'd need total disbursed. 
  // Since our service doesn't return total yet, we'll use a placeholder or assume 0 if no outstanding.

  return (
    <Card className="border-none shadow-xl rounded-3xl bg-gradient-to-br from-card to-muted/20 h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Wallet className="text-primary h-5 w-5" />
            </div>
            <span className="text-lg font-bold font-serif">Loan Overview</span>
          </span>
          <span className={`text-[10px] px-2 py-1 rounded-full font-black uppercase tracking-widest border shadow-sm ${
            totalOutstandingFloat > 0 ? 'bg-success/20 text-success border-success/30' : 'bg-muted text-muted-foreground border-border/50'
          }`}>
            {loading ? '---' : summary?.status || 'No Active Loans'}
          </span>
        </CardTitle>
        <CardDescription className="text-xs pt-1 font-medium text-muted-foreground">Your current input financing status.</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-2 flex-grow flex flex-col justify-between">
        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Outstanding Balance</p>
          <div className="flex items-baseline gap-2 mb-3">
            <h3 className="text-3xl font-normal tracking-tight text-foreground font-serif">{loading ? '...' : (summary?.outstanding || 'KES 0')}</h3>
          </div>
          
          <div className="mt-3 bg-muted rounded-full h-2 overflow-hidden border border-border/50">
            <div className={`bg-primary h-full transition-all duration-1000 ${totalOutstandingFloat > 0 ? 'w-[30%]' : 'w-0'}`}></div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            <span>Repayment Progress</span>
            <span>{totalOutstandingFloat > 0 ? 'Active' : 'N/A'}</span>
          </div>
        </div>

        <div className="p-3 bg-background rounded-xl border border-border/40 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Status</p>
              <p className="text-sm font-bold text-foreground mt-1">{loading ? 'Loading...' : (totalOutstandingFloat > 0 ? 'Repayment Active' : 'No Loans')}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-primary underline underline-offset-2 cursor-pointer" onClick={() => navigate('/loans')}>Manage Loans</p>
          </div>
        </div>
        
        <Button onClick={() => navigate('/loans')} className="w-full bg-foreground hover:bg-primary text-background hover:text-primary-foreground font-black uppercase tracking-widest shadow-md rounded-xl h-12 gap-2 transition-all mt-2 group border-none text-xs">
          Request Financing <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
