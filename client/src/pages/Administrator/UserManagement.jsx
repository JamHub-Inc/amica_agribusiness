import React, { useState, useEffect } from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, UserPlus, Search, Shield, ShieldCheck, MoreHorizontal, Eye, Edit3, Ban, CheckCircle, Mail, Loader2, AlertCircle, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { adminService } from '../../services/adminService';
import { toast } from 'sonner';

const roleColors = {
  FARMER: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  SUPERVISOR: 'bg-blue-100 text-blue-700 border-blue-200',
  VENDOR: 'bg-amber-100 text-amber-700 border-amber-200',
  SYSTEM_ADMIN: 'bg-violet-100 text-violet-700 border-violet-200',
};

const statusColors = {
  ACTIVE: 'bg-success/10 text-success',
  SUSPENDED: 'bg-destructive/10 text-destructive',
  PENDING: 'bg-warning/10 text-warning',
  OFFLINE: 'bg-muted text-muted-foreground',
};

export default function UserManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: 'FARMER',
    password: '',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast.error('Failed to load system users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminService.createUser(formData);
      toast.success('Individual successfully onboarded to the network');
      setIsAddModalOpen(false);
      setFormData({ name: '', email: '', phone: '', location: '', role: 'FARMER', password: '' });
      loadUsers();
    } catch (error) {
      toast.error(error.message || 'Onboarding failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = users.filter(u => {
    const matchesSearch = 
      u.name?.toLowerCase().includes(search.toLowerCase()) || 
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || u.role === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalUsers: users.length,
    farmers: users.filter(u => u.role === 'FARMER').length,
    supervisors: users.filter(u => u.role === 'SUPERVISOR').length,
    pending: users.filter(u => u.status === 'PENDING').length,
  };

  return (
    <AdminDashboardLayout title="User Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Registry</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1 uppercase tracking-widest">Global Ecosystem Directory</p>
          </div>
          <Button 
            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest shadow-md transition-all gap-3 border-none"
            onClick={() => setIsAddModalOpen(true)}
          >
            <UserPlus className="h-5 w-5" /> Create a User
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: loading ? '-' : stats.totalUsers, icon: Users },
            { label: 'Farmers', value: loading ? '-' : stats.farmers, icon: Shield },
            { label: 'Supervisors', value: loading ? '-' : stats.supervisors, icon: ShieldCheck },
            { label: 'Pending Review', value: loading ? '-' : stats.pending, icon: CheckCircle },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card rounded-[2rem] bg-card overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-0.5">{stat.label}</p>
                  <p className="text-3xl font-serif text-foreground">{stat.value}</p>
                </div>
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
                  onChange={(e) => setSearch(e.target.value)} 
                />
              </div>
              <div className="flex gap-2 bg-white/50 p-1.5 rounded-[1.2rem] backdrop-blur-sm">
                {['All', 'FARMER', 'SUPERVISOR', 'VENDOR', 'SYSTEM_ADMIN'].map(role => (
                  <Button 
                    key={role} 
                    variant={filter === role ? "default" : "ghost"} 
                    size="sm" 
                    className={`rounded-xl text-[10px] font-black uppercase tracking-widest h-9 px-4 transition-all ${filter === role ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted'}`} 
                    onClick={() => setFilter(role)}
                  >
                    {role === 'All' ? 'All Users' : role === 'SYSTEM_ADMIN' ? 'Admin' : role.charAt(0) + role.slice(1).toLowerCase()}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Individual</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Assignment</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Lifecycle</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Region</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Activation</th>
                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Registry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {loading ? (
                    [1, 2, 3, 4, 5].map(i => <tr key={i}><td colSpan="6" className="px-8 py-8"><div className="h-14 bg-muted animate-pulse rounded-2xl"></div></td></tr>)
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-8 py-20 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">
                        <AlertCircle className="h-10 w-10 mx-auto mb-4" />
                        No usersfound matching selection
                      </td>
                    </tr>
                  ) : (
                    filtered.map(user => (
                      <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                              {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                               <p className="font-serif text-lg text-foreground">{user.name}</p>
                               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border shadow-sm ${roleColors[user.role] || ''}`}>{user.role?.replace('_', ' ')}</span>
                        </td>
                        <td className="px-8 py-6 text-sm">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full w-fit font-black text-[10px] uppercase tracking-widest ${statusColors[user.status] || statusColors.OFFLINE}`}>
                             <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${user.status === 'ACTIVE' ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                             {user.status || 'OFFLINE'}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-muted-foreground">{user.location || 'Distributed'}</td>
                        <td className="px-8 py-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                           {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary hover:text-white transition-all">
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 p-3 rounded-[1.5rem] shadow-2xl border-none">
                              <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest" onClick={() => toast.info('Registry details requested')}><Eye className="h-4 w-4 text-primary" /> View </DropdownMenuItem>
                              <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><Edit3 className="h-4 w-4 text-secondary" /> Adjust Access</DropdownMenuItem>
                              <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest"><Mail className="h-4 w-4 text-info" /> Secure Contact</DropdownMenuItem>
                              <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest text-destructive"><Ban className="h-4 w-4" /> Revoke Access</DropdownMenuItem>
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

        {/* Add User Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-card">
            <div className="bg-primary/5 p-8 border-b border-border/20">
               <DialogHeader>
                 <div className="flex justify-between items-start">
                   <div>
                     <DialogTitle className="text-3xl font-serif text-foreground">Onboard Participant</DialogTitle>
                     <DialogDescription className="text-sm font-bold text-muted-foreground mt-2 uppercase tracking-widest">Register a new individual into the ecosystem registry</DialogDescription>
                   </div>
                   <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                     <UserPlus className="h-6 w-6 text-primary" />
                   </div>
                 </div>
               </DialogHeader>
            </div>

            <form onSubmit={handleAddUser} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Legal Name</Label>
                  <Input 
                    placeholder="Enter full name" 
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold focus:ring-2 ring-primary/20 transition-all" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Dossier</Label>
                  <Input 
                    type="email" 
                    placeholder="name@ecosystem.com" 
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold focus:ring-2 ring-primary/20 transition-all" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mobile Activation</Label>
                  <Input 
                    placeholder="+254 7XX XXX XXX" 
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold focus:ring-2 ring-primary/20 transition-all" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Operational Region</Label>
                  <Input 
                    placeholder="e.g. Nairobi, Nakuru" 
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold focus:ring-2 ring-primary/20 transition-all" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">System Privilege Assignment</Label>
                  <select 
                    className="w-full h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold outline-none focus:ring-2 ring-primary/20 transition-all appearance-none cursor-pointer"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="FARMER">FARMER</option>
                    <option value="SUPERVISOR">SUPERVISOR</option>
                    <option value="VENDOR">VENDOR</option>
                    <option value="SYSTEM_ADMIN">SYSTEM ADMIN</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Access Authentication</Label>
                  <Input 
                    type="password" 
                    placeholder="Define secure password" 
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold focus:ring-2 ring-primary/20 transition-all" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              <DialogFooter className="pt-8 border-t border-border/10">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest text-xs" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Discard
                </Button>
                <Button 
                  type="submit" 
                  className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all gap-3 border-none"
                  disabled={submitting}
                >
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                  {submitting ? 'Processing...' : 'finalize onboarding'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
