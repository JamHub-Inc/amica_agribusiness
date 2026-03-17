import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Search, Bell, Plus, ChevronDown, Menu, UserIcon, LogOut, Eye, Settings, Calendar, Sprout, ShoppingBag, Droplets, Leaf, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const FarmerHeader = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const unreadCount = 3; 
  const notifications = [ 
    { id: 1, title: 'Harvest Reminder', message: 'Your Maize is ready for harvest.', status: 'UNREAD', createdAt: new Date() },
    { id: 2, title: 'Weather Alert', message: 'Heavy rain expected tomorrow.', status: 'READ', createdAt: new Date() }
  ];

  const getUserInitials = () => {
    if (!user) return 'U';
    const nameParts = user.name ? user.name.split(' ') : [];
    if (nameParts.length >= 2) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    if (user.name) return user.name.substring(0, 2).toUpperCase();
    return 'U';
  };

  const userInitials = getUserInitials();

  const quickActions = [
    { label: 'My Produce', icon: Sprout, href: '/my-produce', color: 'from-green-500 to-emerald-500', description: 'Log a new crop cycle' },
    { label: 'Market Prices', icon: ShoppingBag, href: '/market-prices', color: 'from-amber-500 to-orange-500', description: 'View latest market trends' },
    { label: 'Reports', icon: BarChart3, href: '/reports', color: 'from-blue-500 to-cyan-500', description: 'Check regional analytics' },
  ];

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleKeyDown = (e) => { if (e.key === 'Enter' && searchQuery.trim()) console.log('Searching for:', searchQuery); };
  const handleLogout = async () => { try { await logout(); navigate('/login'); } catch (error) { console.error('Logout failed:', error); } };

  return (
    <header className="sticky px-4 py-4 top-0 z-40 flex h-20 items-center justify-between gap-4 border-b border-border/40 bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-primary/10 text-primary hidden md:flex items-center justify-center transition-all hover:bg-primary hover:text-white" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-[320px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
            <Input placeholder="Search crops, reports..." className="pl-10 pr-4 h-10 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/40 text-sm shadow-none transition-all hover:bg-muted/80 focus:bg-background" value={searchQuery} onChange={handleSearch} onKeyDown={handleKeyDown} />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hidden sm:flex gap-2 h-10 px-4 rounded-xl bg-primary text-white shadow-md hover:shadow-lg transition-all duration-300">
              <Plus className="h-4 w-4" /><span className="text-sm font-medium tracking-wide">Quick Action</span><ChevronDown className="h-4 w-4 ml-1 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-border/50 shadow-xl backdrop-blur-md bg-background/95">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-2 py-2">Quick Shortcuts</DropdownMenuLabel>
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
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl border-border/50 shadow-xl backdrop-blur-md bg-background/95">
            <div className="flex items-center justify-between px-3 py-3">
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest p-0">Notifications</DropdownMenuLabel>
              <div className="flex gap-2 items-center">
                 <button className="text-[10px] text-primary hover:underline font-bold uppercase tracking-wider">Mark as read</button>
              </div>
            </div>
            <DropdownMenuSeparator className="my-1 bg-border/40" />
            <div className="max-h-80 overflow-y-auto no-scrollbar">
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className={`flex flex-col items-start p-3 gap-2 hover:bg-muted/60 rounded-xl cursor-pointer border-b border-border/20 last:border-0 transition-colors ${notification.status === 'UNREAD' ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-start justify-between w-full gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full mt-1 flex-shrink-0 shadow-sm ${notification.status === 'UNREAD' ? 'bg-primary' : 'bg-muted/50'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-sm ${notification.status === 'UNREAD' ? 'font-medium text-foreground' : 'font-normal text-foreground/80'} truncate`}>{notification.title}</p>
                        <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">{new Date(notification.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[11px] font-normal text-muted-foreground/90 leading-relaxed line-clamp-2">{notification.message}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator className="my-1 bg-border/40" />
            <DropdownMenuItem className="justify-center text-sm font-bold text-primary hover:text-primary transition-colors cursor-pointer py-3 rounded-xl bg-primary/5 hover:bg-primary/10 mt-1">
              <Eye className="h-4 w-4 mr-2" />View all history
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-px bg-border/80 mx-1 hidden sm:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative rounded-2xl h-12 px-2 gap-3 hover:bg-secondary/10 border border-transparent hover:border-secondary/20 transition-all">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm shadow-sm">
                {userInitials}
              </div>
              <div className="hidden md:flex flex-col items-start"><span className="text-sm font-medium text-foreground leading-none mb-1">{user?.name || 'User'}</span><span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground leading-none">{user?.role || 'Farmer'}</span></div>
              <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground/70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 p-2 rounded-2xl border-border/50 shadow-xl backdrop-blur-md bg-background/95 mt-2">
            <div className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-lg shadow-sm">
                  {userInitials}
                </div>
                <div className="flex flex-col"><span className="text-sm font-bold text-foreground">{user?.name || 'User'}</span><span className="text-xs font-medium text-muted-foreground/80 truncate w-[140px]">{user?.email || 'No email access'}</span></div>
              </div>
            </div>
            <DropdownMenuSeparator className="my-1 bg-border/40" />
            <DropdownMenuItem className="p-3 rounded-xl hover:bg-muted/60 focus:bg-muted/60 cursor-pointer gap-3 transition-colors" asChild>
              <Link to="/profile"><UserIcon className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-semibold">My Profile</span></Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 rounded-xl hover:bg-muted/60 focus:bg-muted/60 cursor-pointer gap-3 transition-colors" asChild>
              <Link to="/settings"><Settings className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-semibold">Preferences</span></Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-border/40" />
            <DropdownMenuItem className="p-3 rounded-xl hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer gap-3 text-destructive hover:text-destructive transition-colors font-bold" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default FarmerHeader;
