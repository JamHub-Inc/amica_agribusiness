import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Search, Bell, Menu, UserIcon, LogOut, Eye, Settings, Building2, ChevronDown, CheckCircle, Clock, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function SupervisorHeader({ toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const unreadCount = 5; 
  const notifications = [ 
    { id: 1, title: 'New Member Request', message: 'A farmer has requested to join your SACCO.', status: 'UNREAD', createdAt: new Date() },
    { id: 2, title: 'Loan Repayment', message: 'Payment confirmed for Member #482.', status: 'READ', createdAt: new Date() }
  ];

  const getUserInitials = () => {
    if (!user) return 'S';
    const nameParts = user.name ? user.name.split(' ') : [];
    if (nameParts.length >= 2) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    if (user.name) return user.name.substring(0, 2).toUpperCase();
    return 'S';
  };

  const userInitials = getUserInitials();

  const quickActions = [
    { label: 'Verify Produce', icon: CheckCircle, href: '/supervisor/produce', color: 'from-emerald-500 to-green-600', description: 'Review pending logs' },
    { label: 'Review Loans', icon: Clock, href: '/supervisor/loans', color: 'from-primary to-primary/80', description: 'Approve disbursements' },
    { label: 'Add Member', icon: Plus, href: '/supervisor/members', color: 'from-blue-500 to-indigo-500', description: 'Register new farmer' },
  ];

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleLogout = async () => { try { await logout(); navigate('/login'); } catch (error) { console.error('Logout failed:', error); } };

  return (
    <header className="sticky px-4 py-4 top-0 z-40 flex h-20 items-center justify-between gap-4 border-b border-border/40 bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-primary/10 text-primary hidden md:flex items-center justify-center transition-all hover:bg-primary hover:text-white" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex flex-1 max-w-md">
           <div className="flex items-center gap-3 bg-muted/30 px-3 py-1.5 rounded-xl border border-border/50">
             <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
               <Building2 className="h-3.5 w-3.5 text-primary" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{user?.managedSacco?.name || 'SACCO'} Branch</span>
           </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Web Search */}
        <div className="hidden lg:flex relative w-[280px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
          <Input placeholder="Search members, loans..." className="pl-10 pr-4 h-10 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/40 text-sm shadow-none transition-all hover:bg-muted/80 focus:bg-background" value={searchQuery} onChange={handleSearch} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hidden sm:flex gap-2 h-10 px-4 rounded-xl bg-primary text-white shadow-md hover:shadow-lg transition-all duration-300">
              <Plus className="h-4 w-4" /><span className="text-sm font-medium tracking-wide">Quick Action</span><ChevronDown className="h-4 w-4 ml-1 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-border/50 shadow-xl backdrop-blur-md bg-background/95">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-2 py-2">Branch Shortcuts</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 bg-border/40" />
            {quickActions.map((action) => (
              <DropdownMenuItem key={action.label} className="p-2 rounded-xl hover:bg-muted/60 focus:bg-muted/60 cursor-pointer transition-colors" asChild>
                <Link to={action.href} className="flex items-center w-full cursor-pointer gap-3">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-sm shrink-0`}><action.icon className="h-5 w-5 text-white" /></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                    <span className="text-[11px] font-normal text-muted-foreground">{action.description}</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl bg-muted/30 hover:bg-primary/10 transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center bg-destructive text-white border-[3px] border-background text-[9px] font-black rounded-full shadow-sm">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl border-border/50 shadow-xl backdrop-blur-md bg-background/95">
             <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 py-3">Notifications</DropdownMenuLabel>
             <DropdownMenuSeparator className="my-1 bg-border/40" />
             <div className="max-h-80 overflow-y-auto no-scrollbar">
                {notifications.map((n) => (
                  <DropdownMenuItem key={n.id} className={`flex flex-col items-start p-3 gap-1 rounded-xl cursor-pointer ${n.status === 'UNREAD' ? 'bg-primary/5' : ''}`}>
                    <div className="flex items-center justify-between w-full">
                       <p className="text-sm font-bold">{n.title}</p>
                       <span className="text-[10px] text-muted-foreground">{n.status}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{n.message}</p>
                  </DropdownMenuItem>
                ))}
             </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-px bg-border/80 mx-1 hidden sm:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative rounded-2xl h-12 px-2 gap-3 hover:bg-secondary/10 border border-transparent hover:border-secondary/20 transition-all">
               <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm shadow-sm">
                 {userInitials}
               </div>
               <div className="hidden md:flex flex-col items-start mr-1">
                 <span className="text-sm font-medium text-foreground leading-none mb-1">{user?.name?.split(' ')[0]}</span>
                 <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground leading-none">Supervisor</span>
               </div>
               <ChevronDown className="h-4 w-4 text-muted-foreground/70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 p-2 rounded-2xl border-border/50 shadow-xl backdrop-blur-md bg-background/95 mt-2">
            <DropdownMenuItem className="p-3 rounded-xl hover:bg-muted/60 cursor-pointer gap-3" asChild>
              <Link to="/supervisor/profile"><UserIcon className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-semibold">My Profile</span></Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 rounded-xl hover:bg-muted/60 cursor-pointer gap-3" asChild>
              <Link to="/supervisor/settings"><Settings className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-semibold">SACCO Settings</span></Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-border/40" />
            <DropdownMenuItem className="p-3 rounded-xl hover:bg-destructive/10 cursor-pointer gap-3 text-destructive font-bold" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
