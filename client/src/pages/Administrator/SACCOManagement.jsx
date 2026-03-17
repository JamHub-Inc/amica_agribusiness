import React, { useState, useEffect } from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, MapPin, TrendingUp, UserPlus, MoreHorizontal, Eye, Edit3, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { adminService } from '../../services/adminService';
import { toast } from 'sonner';

const performanceColor = (val) => {
  if (val >= 90) return 'text-success bg-success';
  if (val >= 70) return 'text-primary bg-primary';
  if (val >= 50) return 'text-warning bg-warning';
  return 'text-destructive bg-destructive';
};

export default function SACCOManagement() {
  const [saccos, setSaccos] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  
  const [activeSacco, setActiveSacco] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    supervisorId: '',
  });

  useEffect(() => {
    loadSaccos();
    loadSupervisors();
  }, []);

  const loadSaccos = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSaccos();
      setSaccos(response.data || []);
    } catch (error) {
      console.error('Failed to load saccos:', error);
      toast.error('Failed to load SACCO branches');
    } finally {
      setLoading(false);
    }
  };

  const loadSupervisors = async () => {
    try {
      const response = await adminService.getUsers();
      const allUsers = response.data || [];
      setSupervisors(allUsers.filter(u => u.role === 'SUPERVISOR'));
    } catch (error) {
      console.error('Failed to load supervisors:', error);
    }
  };

  const handleRegisterSacco = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminService.createSacco(formData);
      toast.success('Records structure successfully established');
      setIsModalOpen(false);
      setFormData({ name: '', location: '', supervisorId: '' });
      loadSaccos();
    } catch (error) {
      toast.error(error.message || 'Establishment failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSacco = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminService.updateSacco(activeSacco.id, {
        name: formData.name,
        location: formData.location
      });
      toast.success('Branch identity updated');
      setIsEditOpen(false);
      setActiveSacco(null);
      loadSaccos();
    } catch (error) {
      toast.error(error.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReassignLead = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminService.updateSacco(activeSacco.id, {
        supervisorId: formData.supervisorId
      });
      toast.success('Command structure reallocated');
      setIsReassignOpen(false);
      setActiveSacco(null);
      loadSaccos();
    } catch (error) {
      toast.error(error.message || 'Reassignment failed');
    } finally {
      setSubmitting(false);
    }
  };

  const openView = async (item) => {
    try {
      const res = await adminService.getSacco(item.id);
      setActiveSacco(res.data);
      setIsViewOpen(true);
    } catch (error) {
      toast.error('Failed to fetch dossier details');
    }
  };

  const openEdit = (item) => {
    setActiveSacco(item);
    setFormData({
      name: item.name,
      location: item.location || '',
      supervisorId: item.supervisorId || ''
    });
    setIsEditOpen(true);
  };

  const openReassign = (item) => {
    setActiveSacco(item);
    setFormData({
      ...formData,
      supervisorId: item.supervisorId || ''
    });
    setIsReassignOpen(true);
  };

  const totalMembers = saccos.reduce((sum, s) => sum + (s._count?.members || 0), 0);
  const assignedSupervisors = saccos.filter(s => s.supervisor).length;

  return (
    <AdminDashboardLayout title="SACCO Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Corporative</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1 uppercase tracking-widest">SACCO Network Infrastructure</p>
          </div>
          <Button 
            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest shadow-md transition-all gap-3 border-none"
            onClick={() => {
              setFormData({ name: '', location: '', supervisorId: '' });
              setIsModalOpen(true);
            }}
          >
            <Building2 className="h-5 w-5" /> Register SACCO
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total SACCOs', value: loading ? '-' : saccos.length, icon: Building2 },
            { label: 'Active Status', value: loading ? '-' : saccos.length, icon: TrendingUp },
            { label: 'Global Members', value: loading ? '-' : totalMembers.toLocaleString(), icon: Users },
            { label: 'Supervisors', value: loading ? '-' : `${assignedSupervisors} / ${saccos.length}`, icon: UserPlus },
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

        {/* SACCO Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             [1, 2, 3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-[2.5rem]"></div>)
          ) : saccos.length === 0 ? (
            <div className="col-span-full py-20 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">
               <AlertCircle className="h-12 w-12 mx-auto mb-4" />
               No SACCO branches registered in the ecosystem
            </div>
          ) : (
            saccos.map((sacco) => {
              const performance = Math.floor(Math.random() * 30) + 70;
              const perfClass = performanceColor(performance);
              return (
                <Card key={sacco.id} className="border-none shadow-card rounded-[2.5rem] hover:shadow-lg transition-all group overflow-hidden bg-card">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-normal font-serif text-foreground">{sacco.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <MapPin className="h-3 w-3 text-primary" />{sacco.location || 'Distributed'}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-muted group-hover:scale-105 transition-all"><MoreHorizontal className="h-5 w-5 text-muted-foreground" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-3 rounded-[1.5rem] shadow-2xl border-none">
                          <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest" onClick={() => openView(sacco)}><Eye className="h-4 w-4 text-primary" /> View Branch</DropdownMenuItem>
                          <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest" onClick={() => openEdit(sacco)}><Edit3 className="h-4 w-4 text-secondary" /> Edit Branch</DropdownMenuItem>
                          <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-widest" onClick={() => openReassign(sacco)}><UserPlus className="h-4 w-4 text-info" /> Reassign Lead</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-4 rounded-2xl border border-border/5">
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Members</p>
                        <p className="text-xl font-normal font-serif text-foreground">{(sacco._count?.members || 0).toLocaleString()}</p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-2xl border border-border/5">
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Assets</p>
                        <p className="text-xl font-normal font-serif text-foreground">Active</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Branch Supervisor</p>
                        <p className="text-sm font-bold text-foreground">{sacco.supervisor?.name || 'Vacant Command'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Efficiency</p>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${perfClass.split(' ')[1]}`} style={{ width: `${performance}%` }}></div>
                          </div>
                          <span className={`text-[10px] font-black uppercase ${perfClass.split(' ')[0]}`}>{performance}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border/20">
                      <div className="flex items-center gap-2">
                         <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-success">Operational</span>
                      </div>
                      <Button variant="ghost" className="h-8 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10" onClick={() => openView(sacco)}>Manage Network</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Register SACCO Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-card text-foreground">
            <div className="bg-primary/5 p-8 border-b border-border/20">
               <DialogHeader>
                 <div className="flex justify-between items-start">
                   <div>
                     <DialogTitle className="text-3xl font-serif">SACCO Establishment</DialogTitle>
                     <DialogDescription className="text-sm font-bold text-muted-foreground mt-2 uppercase tracking-widest">Register a new Corporative branch into the infrastructure</DialogDescription>
                   </div>
                   <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                     <Building2 className="h-6 w-6 text-primary" />
                   </div>
                 </div>
               </DialogHeader>
            </div>

            <form onSubmit={handleRegisterSacco} className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">SACCO Branch Identity</Label>
                <Input 
                  placeholder="e.g. Western Farmers Corporative" 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Base of Operations</Label>
                <Input 
                  placeholder="e.g. Bungoma County" 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Appoint Commanding Supervisor</Label>
                <select 
                  className="w-full h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold outline-none focus:ring-2 ring-primary/20 transition-all appearance-none cursor-pointer"
                  value={formData.supervisorId}
                  onChange={(e) => setFormData({...formData, supervisorId: e.target.value})}
                  required
                >
                  <option value="" disabled>Select available supervisor</option>
                  {supervisors.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - {s.location || 'Distributed'}</option>
                  ))}
                </select>
              </div>

              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest text-xs" onClick={() => setIsModalOpen(false)}>Discard</Button>
                <Button type="submit" className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all gap-3 border-none" disabled={submitting}>
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                  {submitting ? 'Establishing...' : 'Confirm Registration'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Branch Modal */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-card text-foreground">
            {activeSacco && (
              <>
                <div className="bg-primary/5 p-8 border-b border-border/20">
                  <DialogHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <DialogTitle className="text-3xl font-serif">{activeSacco.name}</DialogTitle>
                        <DialogDescription className="text-sm font-bold text-muted-foreground mt-2 uppercase tracking-widest flex items-center gap-2">
                          <MapPin className="h-3 w-3" /> {activeSacco.location} • Operational Dossier
                        </DialogDescription>
                      </div>
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Building2 className="h-7 w-7" />
                      </div>
                    </div>
                  </DialogHeader>
                </div>
                <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Branch Supervisor</p>
                         <p className="text-lg font-bold">{activeSacco.supervisor?.name || 'Vacant'}</p>
                         <p className="text-xs text-muted-foreground">{activeSacco.supervisor?.email}</p>
                      </div>
                      <div className="space-y-1 text-right">
                         <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Network Size</p>
                         <p className="text-3xl font-serif text-primary">{activeSacco._count?.members || 0}</p>
                         <p className="text-[10px] font-black uppercase text-muted-foreground">Affiliated Farmers</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Active Participants List</p>
                      {activeSacco.members?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {activeSacco.members.map(member => (
                            <div key={member.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all border border-transparent hover:border-border/10">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-[10px] font-black">{member.name.charAt(0)}</div>
                                <div>
                                  <p className="text-sm font-bold">{member.name}</p>
                                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-60">{member.role}</p>
                                </div>
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{member.location}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center opacity-30 italic font-serif">No participants linked to this branch yet.</div>
                      )}
                   </div>
                </div>
                <DialogFooter className="p-8 border-t border-border/10">
                  <Button variant="ghost" className="h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-xs" onClick={() => setIsViewOpen(false)}>Close Dossier</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Branch Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-card text-foreground">
            <div className="bg-secondary/5 p-8 border-b border-border/20">
               <DialogHeader>
                 <DialogTitle className="text-3xl font-serif">Adjust Identity</DialogTitle>
                 <DialogDescription className="text-sm font-bold text-muted-foreground mt-2 uppercase tracking-widest">Modify branch records and relocation status</DialogDescription>
               </DialogHeader>
            </div>
            <form onSubmit={handleUpdateSacco} className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Branch Name</Label>
                <Input className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Operations Center</Label>
                <Input className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
              </div>
              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" className="h-14 px-8 rounded-2xl font-bold" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button type="submit" className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs" disabled={submitting}>
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Apply Adjustments'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Reassign Lead Modal */}
        <Dialog open={isReassignOpen} onOpenChange={setIsReassignOpen}>
          <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-card text-foreground">
            <div className="bg-info/5 p-8 border-b border-border/20">
               <DialogHeader>
                 <DialogTitle className="text-3xl font-serif">Command Reallocation</DialogTitle>
                 <DialogDescription className="text-sm font-bold text-muted-foreground mt-2 uppercase tracking-widest">Appoint a new Lead Supervisor for this branch</DialogDescription>
               </DialogHeader>
            </div>
            <form onSubmit={handleReassignLead} className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Selected Successor</Label>
                <select 
                  className="w-full h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold outline-none focus:ring-2 ring-primary/20 appearance-none cursor-pointer"
                  value={formData.supervisorId}
                  onChange={(e) => setFormData({...formData, supervisorId: e.target.value})}
                  required
                >
                  <option value="" disabled>Select Successor</option>
                  {supervisors.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - {s.location}</option>
                  ))}
                </select>
              </div>
              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" className="h-14 px-8 rounded-2xl font-bold" onClick={() => setIsReassignOpen(false)}>Abort</Button>
                <Button type="submit" className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs" disabled={submitting}>
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirm Command Shift'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
