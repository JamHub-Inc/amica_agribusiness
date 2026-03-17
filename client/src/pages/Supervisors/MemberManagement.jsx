import React, { useState, useEffect } from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, UserPlus, Search, Filter, MoreHorizontal, Eye, Edit3, Ban, Mail, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { saccoService } from '../../services/saccoService';
import { toast } from 'sonner';

const statusColors = {
  ACTIVE: 'bg-success/10 text-success border-success/20',
  OFFLINE: 'bg-muted text-muted-foreground border-border/50',
  SUSPENDED: 'bg-destructive/10 text-destructive border-destructive/20',
  PENDING: 'bg-warning/10 text-warning border-warning/20',
};

export default function MemberManagement() {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'edit', 'message', 'suspend'
  const [actionLoading, setActionLoading] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [messageText, setMessageText] = useState('');

  const openModal = (member, type) => {
    setSelectedMember(member);
    setModalType(type);
    if (type === 'edit') setEditForm({ ...member });
    if (type === 'message') setMessageText('');
  };

  const closeModal = () => {
    setModalType(null);
    setTimeout(() => {
      setSelectedMember(null);
      setEditForm({});
      setMessageText('');
    }, 200);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    // Simulating API call
    setTimeout(() => {
      setMembers(members.map(m => m.id === selectedMember.id ? { ...m, ...editForm } : m));
      toast.success('Farmer Profile Updated', { description: `${selectedMember.name}'s details have been saved successfully.` });
      setActionLoading(false);
      closeModal();
    }, 800);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setActionLoading(true);
    // Simulating API call
    setTimeout(() => {
      toast.success('Message Dispatched', { description: `Your communication to ${selectedMember.name} has been sent via SMS/Email.` });
      setActionLoading(false);
      closeModal();
    }, 800);
  };

  const handleSuspend = () => {
    setActionLoading(true);
    // Simulating API call
    setTimeout(() => {
      setMembers(members.map(m => m.id === selectedMember.id ? { ...m, status: 'SUSPENDED' } : m));
      toast.error('Account Suspended', { description: `${selectedMember.name}'s access to the SACCO network has been revoked.` });
      setActionLoading(false);
      closeModal();
    }, 800);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await saccoService.getMembers();
      setMembers(response.data || []);
    } catch (error) {
      console.error('Failed to load members:', error);
      toast.error('Failed to load SACCO members');
    } finally {
      setLoading(false);
    }
  };

  const filtered = members.filter(m => 
    m.name?.toLowerCase().includes(search.toLowerCase()) || 
    m.email?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'ACTIVE').length,
    pending: members.filter(m => m.status === 'PENDING').length,
    suspended: members.filter(m => m.status === 'SUSPENDED').length,
  };

  return (
    <SupervisorDashboardLayout title="Member Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Registry</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">Manage farmers and their compliance within the SACCO ecosystem</p>
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest shadow-md transition-all gap-3 border-none">
            <UserPlus className="h-5 w-5" /> Register New Farmer
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Members', value: loading ? '-' : stats.total, color: 'text-primary' },
            { label: 'Active Status', value: loading ? '-' : stats.active, color: 'text-success' },
            { label: 'Awaiting Review', value: loading ? '-' : stats.pending, color: 'text-warning' },
            { label: 'Suspended', value: loading ? '-' : stats.suspended, color: 'text-destructive' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card rounded-[2rem] bg-card overflow-hidden">
              <CardContent className="p-6">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h3 className={`text-4xl font-normal font-serif ${stat.color}`}>{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* List Card */}
        <Card className="border-none shadow-card rounded-[2.5rem] overflow-hidden bg-card">
          <CardHeader className="p-8 pb-4 bg-muted/20 border-b border-border/40">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email or location..." 
                  className="h-12 pl-12 rounded-2xl bg-white border-none shadow-sm font-medium" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl border-none shadow-sm h-12 bg-white font-bold px-6" onClick={loadMembers}>
                   {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Filter className="h-4 w-4 mr-2" />} Reload
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Farmer Profile</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Regional Section</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Compliance Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">Batch Count</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {loading ? (
                    [1, 2, 3].map(i => <tr key={i}><td colSpan="5" className="px-8 py-8"><div className="h-12 bg-muted animate-pulse rounded-2xl"></div></td></tr>)
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">
                        <AlertCircle className="h-10 w-10 mx-auto mb-4" />
                        No members found in branch registry
                      </td>
                    </tr>
                  ) : (
                    filtered.map(member => (
                      <tr key={member.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black">
                                 {member.name ? member.name[0] : 'F'}
                              </div>
                              <div className="flex flex-col">
                                  <span className="font-serif text-lg text-foreground">{member.name}</span>
                                  <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{member.email}</span>
                              </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-sm font-bold text-muted-foreground">{member.location || 'Unassigned'}</span>
                        </td>
                        <td className="px-8 py-6">
                          <Badge className={`rounded-full border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${statusColors[member.status] || statusColors.OFFLINE}`}>
                              {member.status || 'OFFLINE'}
                          </Badge>
                        </td>
                        <td className="px-8 py-6 text-center">
                           <span className="text-base font-normal font-serif">{member._count?.produce || 0}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl bg-muted/50 hover:bg-primary hover:text-white transition-all"><MoreHorizontal className="h-5 w-5" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 p-3 rounded-[1.5rem] shadow-2xl border-none">
                              <DropdownMenuItem onClick={() => openModal(member, 'view')} className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><Eye className="h-4 w-4 text-primary" /> View Profile</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openModal(member, 'edit')} className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><Edit3 className="h-4 w-4 text-secondary" /> Edit Profile</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openModal(member, 'message')} className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><Mail className="h-4 w-4 text-info" /> Send Message</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openModal(member, 'suspend')} className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest text-destructive"><Ban className="h-4 w-4" /> Suspend Account</DropdownMenuItem>
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

      {/* Modals */}
      <Dialog open={modalType === 'view'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
          <div className="bg-primary/5 p-8 border-b border-border/20 flex flex-col items-center">
            <div className="h-20 w-20 rounded-[1.25rem] bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl mb-4 shadow-lg shadow-primary/20">
              {selectedMember?.name?.[0] || 'F'}
            </div>
            <DialogTitle className="text-2xl font-serif text-center">{selectedMember?.name}</DialogTitle>
            <DialogDescription className="text-center font-bold text-muted-foreground uppercase tracking-widest mt-1 text-[10px]">
              {selectedMember?.location || 'Unassigned Branch'}
            </DialogDescription>
          </div>
          <div className="p-8 space-y-6 bg-card">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-border/30 pb-3">
                <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Email Contact</span>
                <span className="font-bold">{selectedMember?.email}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border/30 pb-3">
                <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Platform Status</span>
                <Badge className={`rounded-full border-none px-3 py-0.5 text-[9px] font-black uppercase tracking-widest gap-0 ${statusColors[selectedMember?.status] || statusColors.OFFLINE}`}>{selectedMember?.status || 'OFFLINE'}</Badge>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border/30 pb-3">
                <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Join Date</span>
                <span className="font-bold">{selectedMember?.createdAt ? new Date(selectedMember.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-1">
                <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Produce Logs</span>
                <span className="font-bold">{selectedMember?._count?.produce || 0} Batches Verified</span>
              </div>
            </div>
            <Button onClick={closeModal} className="w-full h-12 rounded-xl bg-muted text-foreground hover:bg-muted/80 border-none font-bold">Close Dossier</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modalType === 'edit'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Edit Farmer Profile</DialogTitle>
            <DialogDescription>Update the registry details for {selectedMember?.name}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground pl-1">Full Name</Label>
              <Input value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="h-12 rounded-xl bg-muted/40 border-none font-bold" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground pl-1">Email Address</Label>
              <Input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="h-12 rounded-xl bg-muted/40 border-none font-bold" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground pl-1">Regional Location</Label>
              <Input value={editForm.location || ''} onChange={e => setEditForm({...editForm, location: e.target.value})} className="h-12 rounded-xl bg-muted/40 border-none font-bold" />
            </div>
            <div className="pt-4 flex gap-3">
              <Button type="button" variant="outline" onClick={closeModal} className="flex-1 h-12 rounded-xl font-bold border-none bg-muted/40">Cancel</Button>
              <Button type="submit" disabled={actionLoading} className="flex-1 h-12 rounded-xl font-bold border-none text-white bg-primary hover:bg-primary/90">{actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={modalType === 'message'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Secure Message</DialogTitle>
            <DialogDescription>Send a direct communication to {selectedMember?.name}. They will receive it in their farmer portal.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground pl-1">Message Body</Label>
              <Textarea placeholder="Type your message here..." value={messageText} onChange={e => setMessageText(e.target.value)} className="min-h-[120px] rounded-xl bg-muted/40 border-none resize-none p-4" />
            </div>
            <div className="pt-4 flex gap-3">
              <Button variant="outline" onClick={closeModal} className="flex-1 h-12 rounded-xl font-bold border-none bg-muted/40">Cancel</Button>
              <Button onClick={handleSendMessage} disabled={actionLoading || !messageText.trim()} className="flex-1 h-12 rounded-xl font-bold bg-primary border-none text-white hover:bg-primary/90">{actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Dispatch Msg'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={modalType === 'suspend'} onOpenChange={(open) => !open && closeModal()}>
        <AlertDialogContent className="rounded-3xl border-none shadow-2xl p-8 max-w-sm">
          <AlertDialogHeader>
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-4">
              <Ban className="h-8 w-8 text-destructive" />
            </div>
            <AlertDialogTitle className="text-2xl font-serif text-center mt-2">Suspend Farmer?</AlertDialogTitle>
            <AlertDialogDescription className="text-center mt-2">
              Are you sure you want to suspend <strong>{selectedMember?.name}</strong>? They will temporarily lose access to market prices and loan applications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-col gap-2 mt-6">
            <AlertDialogAction onClick={handleSuspend} className="w-full h-12 rounded-xl bg-destructive hover:bg-destructive/90 font-bold border-none m-0 text-white">Yes, Suspend Account</AlertDialogAction>
            <AlertDialogCancel onClick={closeModal} className="w-full h-12 rounded-xl font-bold m-0 border-none bg-muted hover:bg-muted/80">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SupervisorDashboardLayout>
  );
}
