import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  Search, 
  Bell, 
  Plus, 
  ChevronDown, 
  Menu, 
  UserIcon, 
  LogOut, 
  Eye, 
  Settings, 
  ShoppingCart, 
  ClipboardList, 
  Megaphone,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const VendorHeader = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const unreadCount = 5; 
  const notifications = [ 
    { id: 1, title: 'Price Alert', message: 'Maize prices increased in Nakuru.', status: 'UNREAD', createdAt: new Date() },
    { id: 2, title: 'Order Confirmed', message: 'Farmer John accepted your purchase request #1024.', status: 'UNREAD', createdAt: new Date() }
  ];

  const getUserInitials = () => {
    if (!user) return 'V';
    const nameParts = user.name ? user.name.split(' ') : [];
    if (nameParts.length >= 2) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    if (user.name) return user.name.substring(0, 2).toUpperCase();
    return 'V';
  };

  const userInitials = getUserInitials();

  const quickActions = [
    { label: 'Browse Market', icon: ShoppingCart, href: '/vendor/marketplace', color: 'bg-primary', description: 'Find new produce' },
    { label: 'My Orders', icon: ClipboardList, href: '/vendor/orders', color: 'bg-secondary', description: 'Track pending purchases' },
    { label: 'Post Demand', icon: Megaphone, href: '/vendor/demand', color: 'bg-accent', description: 'Tell farmers what you need' },
  ];

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleKeyDown = (e) => { if (e.key === 'Enter' && searchQuery.trim()) console.log('Searching for:', searchQuery); };
  const handleLogout = async () => { try { await logout(); navigate('/login'); } catch (error) { console.error('Logout failed:', error); } };

  return (
    <header className="sticky px-6 py-4 top-0 z-40 flex h-20 items-center justify-between gap-4 border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/50 text-muted-foreground hidden md:flex items-center justify-center transition-all hover:bg-primary/10 hover:text-primary" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl bg-muted/50 text-muted-foreground flex items-center justify-center" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-[320px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search marketplace..." 
              className="pl-10 pr-4 h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20 text-sm shadow-none transition-all hover:bg-muted/50 focus:bg-muted/50 text-foreground placeholder:text-muted-foreground" 
              value={searchQuery} 
              onChange={handleSearch} 
              onKeyDown={handleKeyDown} 
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hidden sm:flex gap-2 h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300 transform active:scale-95">
              <Plus className="h-4 w-4" /><span className="text-sm font-bold uppercase tracking-wider">Market Action</span><ChevronDown className="h-4 w-4 ml-1 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-border/40 shadow-2xl bg-card text-foreground">
            <DropdownMenuLabel className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-3 py-3">Market Shortcuts</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            {quickActions.map((action) => (
              <DropdownMenuItem key={action.label} className="p-2 rounded-xl hover:bg-muted/50 focus:bg-muted/50 cursor-pointer transition-colors" asChild>
                <Link to={action.href} className="flex items-center w-full cursor-pointer gap-3 focus:outline-none">
                  <div className={`h-11 w-11 rounded-xl ${action.color} flex items-center justify-center shadow-md shrink-0`}><action.icon className="h-5 w-5 text-white" /></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{action.label}</span>
                    <span className="text-[11px] font-medium text-muted-foreground">{action.description}</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl bg-muted/30 hover:bg-primary/10 transition-colors border border-border/10">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center bg-destructive text-destructive-foreground border-[3px] border-background text-[9px] font-black rounded-full shadow-lg">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl border-border/40 shadow-2xl bg-card text-foreground">
            <div className="flex items-center justify-between px-3 py-3">
              <DropdownMenuLabel className="text-xs font-black text-muted-foreground uppercase tracking-widest p-0">Activity Feed</DropdownMenuLabel>
              <button className="text-[10px] text-primary hover:underline font-black uppercase tracking-widest">Mark All</button>
            </div>
            <DropdownMenuSeparator className="my-1" />
            <div className="max-h-80 overflow-y-auto no-scrollbar">
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className={`flex flex-col items-start p-4 gap-2 hover:bg-muted/50 rounded-xl cursor-pointer border-b border-border/20 last:border-0 transition-colors ${notification.status === 'UNREAD' ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-start justify-between w-full gap-4">
                    <div className={`h-2.5 w-2.5 rounded-full mt-1.5 flex-shrink-0 animate-pulse ${notification.status === 'UNREAD' ? 'bg-primary' : 'bg-muted'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-sm ${notification.status === 'UNREAD' ? 'font-bold' : 'font-medium text-muted-foreground'} truncate`}>{notification.title}</p>
                        <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">{new Date(notification.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[11px] font-medium text-muted-foreground leading-relaxed line-clamp-2">{notification.message}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="justify-center text-xs font-black text-primary hover:text-primary/80 transition-colors cursor-pointer py-4 rounded-xl bg-muted/30 hover:bg-muted/50 mt-1 uppercase tracking-widest gap-2">
              <Eye className="h-4 w-4" /> Market History
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-px bg-border/40 mx-2 hidden sm:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative rounded-2xl h-12 px-2 gap-3 hover:bg-muted/30 border border-transparent hover:border-border/40 transition-all duration-300">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-md">
                {userInitials}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-bold text-foreground leading-none mb-1">{user?.name || 'Vendor'}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none">{user?.role || 'Sales Personnel'}</span>
              </div>
              <ChevronDown className="hidden md:block h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-border/40 shadow-2xl bg-card text-foreground mt-2">
            <div className="px-4 py-4 mb-1">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-xl">
                  {userInitials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-base font-black truncate">{user?.name || 'Vendor Name'}</span>
                  <span className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-widest">{user?.email || 'sales@Amica.com'}</span>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="p-4 rounded-xl hover:bg-muted/50 focus:bg-muted/50 cursor-pointer gap-4 transition-all group" asChild>
              <Link to="/vendor/profile">
                <UserIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-bold">Account Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-4 rounded-xl hover:bg-muted/50 focus:bg-muted/50 cursor-pointer gap-4 transition-all group" asChild>
              <Link to="/vendor/settings">
                <Settings className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-bold">Preferences</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="p-4 rounded-xl hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer gap-4 text-destructive hover:text-destructive/80 transition-all font-black uppercase tracking-widest" onClick={handleLogout}>
              <LogOut className="h-5 w-5" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default VendorHeader;
