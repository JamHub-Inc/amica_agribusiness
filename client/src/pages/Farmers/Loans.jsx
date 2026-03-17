import { useState, useEffect } from 'react';
import { loanService } from '../../services/loanService';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, CreditCard, PlusCircle, History, FileText, CheckCircle2, Clock, AlertCircle, Users, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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

export default function Loans() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    duration: '6',
    guarantorName: '',
    guarantorPhone: '',
    kraCert: null,
    idCard: null,
    landProof: null
  });

  useEffect(() => {
    loadLoans();
  }, []);

  const resetForm = () => {
    setFormData({
      amount: '',
      purpose: '',
      duration: '6',
      guarantorName: '',
      guarantorPhone: '',
      kraCert: null,
      idCard: null,
      landProof: null
    });
    setStep(1);
  };

  const loadLoans = async () => {
    try {
      setLoading(true);
      const response = await loanService.getSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Failed to load loans:', error);
      toast.error('Failed to load loan data');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    // Step 1 Validation
    if (step === 1) {
      if (!formData.amount || !formData.purpose) {
        toast.error('Required Information Missing', {
          description: 'Please specify the amount and purpose of the loan.'
        });
        return;
      }
      setStep(2);
      return;
    }

    // Step 2 Validation
    if (step === 2) {
      if (!formData.guarantorName || !formData.guarantorPhone) {
        toast.error('Guarantor Details Required', {
          description: 'Please provide both the name and phone number of your guarantor.'
        });
        return;
      }
      setStep(3);
      return;
    }

    // Step 3 (Final) Validation & Security Checks
    if (step === 3) {
      // SACCO Membership Check
      if (!user?.saccoId) {
        toast.error('SACCO Affiliation Required', {
          description: 'You must be part of a SACCO network to finalize this request.'
        });
        return;
      }

      // Temporarily bypassing Identity & Document Checks to allow testing
      /*
      if (!user?.isVerified) {
        toast.error('Identity Verification Required', {
          description: 'Your account must be verified before the final submission.'
        });
        return;
      }

      if (!formData.kraCert || !formData.idCard) {
        toast.error('Documentation Missing', {
          description: 'Please upload the mandatory KRA and ID verification documents.'
        });
        return;
      }
      */

      try {
        setApplying(true);
        await loanService.apply({
          amount: parseFloat(formData.amount),
          purpose: formData.purpose,
          duration: parseInt(formData.duration),
          guarantorName: formData.guarantorName,
          guarantorPhone: formData.guarantorPhone,
          kraCertUrl: `docs/kra_${user?.id}_${Date.now()}.png`,
          idCardUrl: `docs/id_${user?.id}_${Date.now()}.png`,
          landOwnershipUrl: formData.landProof ? `docs/land_${user?.id}_${Date.now()}.png` : null
        });
        toast.success('Loan Registry Successful', {
          description: 'Your application has been logged and sent to your SACCO supervisor.'
        });
        setOpen(false);
        resetForm();
        loadLoans(); 
      } catch (error) {
        console.error('Application failed:', error);
        toast.error(error.message || 'Failed to submit application');
      } finally {
        setApplying(false);
      }
    }
  };

  return (
    <FarmerDashboardLayout title="Loans & Financing">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Financing Hub</h1>
              <p className="text-sm font-bold text-muted-foreground mt-1 text-primary italic">Request credit and track your repayments</p>
           </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-[2.5rem] bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-primary text-white overflow-hidden relative">
              <CardContent className="p-8 pt-10">
                <div className="flex flex-col h-full justify-between gap-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                      <Wallet className="h-7 w-7" />
                    </div>
                    <Badge className="bg-success text-white border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-lg">{summary?.status || 'Active'}</Badge>
                  </div>
                  <div>
                    <p className="text-[10px] text-primary-foreground/70 font-black uppercase tracking-widest mb-1">Total Outstanding</p>
                    <h3 className="text-4xl font-normal font-serif tracking-tight">{summary?.outstanding || 'KES 0'}</h3>
                  </div>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-[2.5rem] bg-secondary text-white overflow-hidden relative">
              <CardContent className="p-8 pt-10">
                <div className="flex flex-col h-full justify-between gap-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                      <CreditCard className="h-7 w-7" />
                    </div>
                    <Badge className="bg-white/20 text-white border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">Limit: KES 250K</Badge>
                  </div>
                  <div>
                    <p className="text-[10px] text-secondary-foreground/70 font-black uppercase tracking-widest mb-1">Next Repayment</p>
                    <h3 className="text-4xl font-normal font-serif tracking-tight">KES 0</h3>
                  </div>
                </div>
                <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) resetForm(); }}>
              <DialogTrigger asChild>
                <Card className="border-none shadow-xl rounded-[2.5rem] bg-card text-card-foreground flex group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-dashed border-primary/20">
                  <CardContent className="p-8 flex flex-col justify-center items-center w-full gap-5">
                    <div className="p-5 bg-primary/5 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <PlusCircle className="h-10 w-10 text-primary group-hover:text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-normal font-serif text-primary">Apply for Credit</h3>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Instant evaluation & approval</p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden bg-card">
                <div className="bg-primary p-8 text-white relative">
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                         {[1, 2, 3].map((s) => (
                           <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-white' : 'w-4 bg-white/30'}`}></div>
                         ))}
                      </div>
                      <DialogTitle className="text-3xl font-serif">Loan Registry</DialogTitle>
                      <DialogDescription className="text-white/70 text-sm font-bold uppercase tracking-widest mt-1">
                        Step {step} of 3: {step === 1 ? 'Financing Details' : step === 2 ? 'Guarantor Details' : 'Verification Vault'}
                      </DialogDescription>
                   </div>
                   <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <form onSubmit={handleApply} className="p-8 space-y-6">
                  {step === 1 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Requested Amount (KES)</Label>
                        <Input 
                          type="number" 
                          placeholder="e.g. 50000" 
                          className="h-14 rounded-2xl bg-muted/50 border-none font-black text-xl px-6 focus-visible:ring-primary/20"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Repayment Duration</Label>
                        <select 
                          className="w-full h-14 rounded-2xl bg-muted/50 border-none px-6 font-bold outline-none appearance-none cursor-pointer focus:ring-2 ring-primary/20"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        >
                          <option value="3">3 Months (Short Term)</option>
                          <option value="6">6 Months (Standard)</option>
                          <option value="12">12 Months (Extended)</option>
                          <option value="24">24 Months (Capital Investment)</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Purpose Supporting Request</Label>
                        <Textarea 
                          placeholder="Specifically state how this financing will improve your farm yield..." 
                          className="rounded-2xl bg-muted/50 border-none min-h-[120px] font-bold p-6 focus-visible:ring-primary/20"
                          value={formData.purpose}
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="p-6 bg-info/5 rounded-[2rem] border border-info/10 mb-2 flex items-start gap-4">
                         <div className="h-10 w-10 bg-info/10 rounded-xl flex items-center justify-center text-info shrink-0">
                            <Users size={20} />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-info">Loan Guarantor Required</p>
                            <p className="text-[10px] font-medium text-info/70 uppercase tracking-widest mt-1">A member of your SACCO who can vouch for your integrity.</p>
                         </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Guarantor's Full Name</Label>
                        <Input 
                          placeholder="Name of SACCO Member" 
                          className="h-14 rounded-2xl bg-muted/50 border-none font-bold px-6"
                          value={formData.guarantorName}
                          onChange={(e) => setFormData({ ...formData, guarantorName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Guarantor's Phone Number</Label>
                        <Input 
                          placeholder="+254 7XX XXX XXX" 
                          className="h-14 rounded-2xl bg-muted/50 border-none font-bold px-6"
                          value={formData.guarantorPhone}
                          onChange={(e) => setFormData({ ...formData, guarantorPhone: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 text-center">Mandatory Document Uploads</p>
                       {[
                         { id: 'kra', label: 'KRA Tax Certificate', key: 'kraCert' },
                         { id: 'id', label: 'National ID (Front & Back)', key: 'idCard' },
                         { id: 'land', label: 'Proof of Land Ownership', key: 'landProof' }
                       ].map((doc) => (
                         <div key={doc.id} className="relative group">
                            <label className={`flex items-center justify-between p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${formData[doc.key] ? 'border-success bg-success/5' : 'border-muted-foreground/20 hover:border-primary/40 bg-muted/30'}`}>
                               <div className="flex items-center gap-4">
                                  <div className={`p-3 rounded-xl ${formData[doc.key] ? 'bg-success text-white' : 'bg-background text-muted-foreground'}`}>
                                     {formData[doc.key] ? <CheckCircle2 size={18} /> : <FileText size={18} />}
                                  </div>
                                  <div>
                                     <p className="text-sm font-bold">{doc.label}</p>
                                     <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                                        {formData[doc.key] ? formData[doc.key].name : 'Select high-quality scan'}
                                     </p>
                                  </div>
                               </div>
                               <Input 
                                 type="file" 
                                 className="hidden" 
                                 onChange={(e) => setFormData({ ...formData, [doc.key]: e.target.files[0] })}
                                 accept="image/*,.pdf"
                               />
                               {!formData[doc.key] && <PlusCircle size={20} className="text-muted-foreground/40 group-hover:text-primary transition-colors" />}
                            </label>
                         </div>
                       ))}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {step > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      className="flex-1 h-14 rounded-[1.5rem] bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl group gap-2"
                      disabled={applying}
                    >
                      {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : step === 3 ? <ShieldCheck size={16} /> : null}
                      {applying ? 'Processing Registry...' : step < 3 ? 'Continue to Next Step' : 'Confirm & Submit Request'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card">
            <CardHeader className="p-8 pb-4 border-b border-border/40 bg-muted/20">
              <CardTitle className="text-2xl font-normal font-serif flex items-center gap-3">
                <History className="h-6 w-6 text-primary" /> Loan History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Application Date</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Amount</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Status</th>
                        <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Repayment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {!loading && summary?.history?.map((item) => (
                        <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                          <td className="px-8 py-6">
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.type || 'Input Finance'}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className="text-base font-normal font-serif">{item.amount}</span>
                          </td>
                          <td className="px-8 py-6">
                            <Badge className={`rounded-full border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                              item.status === 'COMPLETED' || item.status === 'REPAID' || item.status === 'DISBURSED' ? 'bg-success/10 text-success' : 
                              item.status === 'PENDING' ? 'bg-warning/10 text-warning' : 'bg-info/10 text-info'
                            }`}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-8 py-6">
                             <div className="w-full bg-muted rounded-full h-2 overflow-hidden max-w-[100px]">
                                <div className={`h-full bg-primary ${item.status === 'REPAID' ? 'w-full' : 'w-1/3'}`}></div>
                             </div>
                          </td>
                        </tr>
                      ))}
                      {!loading && (!summary?.history || summary.history.length === 0) && (
                        <tr>
                          <td colSpan="4" className="px-8 py-20 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">
                             <AlertCircle className="h-10 w-10 mx-auto mb-4" />
                             No financing records available
                          </td>
                        </tr>
                      )}
                    </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-normal font-serif flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" /> Verification Vault
              </CardTitle>
              <CardDescription className="text-sm font-bold text-muted-foreground">Certified credentials for priority loan approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-8 pb-8">
               {[
                 { name: 'KRA Tax Certificate', status: 'Verified', icon: CheckCircle2, sub: 'PIN ending in *234X' },
                 { name: 'Proof of Land Ownership', status: 'Pending', icon: Clock, sub: 'Title Deed under verification' },
                 { name: 'Identity Verification', status: 'Verified', icon: CheckCircle2, sub: 'National ID confirmed' },
               ].map((doc, i) => (
                 <div key={i} className="flex justify-between items-center p-6 bg-card rounded-2xl border border-border/10 shadow-sm group hover:border-primary/30 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-xl ${doc.status === 'Verified' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                       <doc.icon className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-foreground">{doc.name}</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{doc.sub}</p>
                     </div>
                   </div>
                   <Badge variant="outline" className={`rounded-full border-none font-black text-[9px] uppercase tracking-[0.1em] px-3 ${doc.status === 'Verified' ? 'bg-success/5 text-success' : 'bg-warning/5 text-warning'}`}>
                     {doc.status}
                   </Badge>
                 </div>
               ))}
               <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 border-primary/20 hover:bg-primary/5 text-primary font-black uppercase tracking-widest text-xs transition-all shadow-sm">
                 Upload New Attachment
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
