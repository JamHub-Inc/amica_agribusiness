import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Leaf, HandHelping, ShoppingCart, BarChart3, 
  MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight, 
  UserCircle, Building2, Bell, Shield, HelpCircle
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, title: "Dashboard", path: "/supervisor/dashboard" },
  { icon: Users, title: "Members", path: "/supervisor/members" },
  { icon: Leaf, title: "Produce Verification", path: "/supervisor/produce" },
  { icon: HandHelping, title: "Loan Requests", path: "/supervisor/loans" },
  { icon: ShoppingCart, title: "Market Prices", path: "/supervisor/market-prices" },
  { icon: BarChart3, title: "SACCO Reports", path: "/supervisor/reports" },
  { icon: MessageSquare, title: "Messages", path: "/supervisor/messages" },
  { icon: Bell, title: "Announcements", path: "/supervisor/announcements" },
  { icon: Settings, title: "SACCO Settings", path: "/supervisor/settings" },
  { icon: UserCircle, title: "Profile", path: "/supervisor/profile" },
];

export default function SupervisorSidebar({ isOpen = true, setIsOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [isHovering, setIsHovering] = useState(false);

  const isExpanded = isOpen || isHovering;

  const handleLogout = async (e) => {
    e.preventDefault();
    try { await logout(); navigate('/login'); } catch (error) { console.error('Logout failed:', error); }
  };

  const getUserInitials = () => {
    if (!user) return 'S';
    const nameParts = user.name ? user.name.split(' ') : [];
    if (nameParts.length >= 2) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    if (user.name) return user.name.substring(0, 2).toUpperCase();
    return 'S';
  };

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'SYSTEM_ADMIN': return '/admin/dashboard';
      case 'SUPERVISOR': return '/supervisor/dashboard';
      default: return '/farmers-dashboard';
    }
  };

  const handleLinkClick = (href) => {
    if(href === '#') return;
    navigate(href);
    if (window.innerWidth < 1024 && setIsOpen) setIsOpen(false);
  };

  return (
    <div 
      className={`h-screen transition-all duration-300 ease-in-out relative flex flex-col ${isExpanded ? 'w-[256px]' : 'w-[88px]'} border-r border-border/60 bg-gradient-to-b from-card/95 to-card/85 backdrop-blur-sm overflow-hidden z-50`} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Logo area */}
      <Link to={getDashboardPath()} onClick={(e) => { e.preventDefault(); handleLinkClick(getDashboardPath()); }} className="h-16 border-b border-border/50 flex items-center justify-center relative group cursor-pointer shrink-0">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div key="expanded-logo" className="flex items-center justify-start px-6 w-full h-full gap-2.5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-serif text-primary tracking-tight leading-none">Amica</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium leading-none mt-0.5">Supervisor</span>
              </div>
            </motion.div>
          ) : (
            <motion.div key="collapsed-logo" className="relative group-hover:scale-110 transition-transform duration-200" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.3 }}>
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <Building2 className="h-4.5 w-4.5 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto no-scrollbar space-y-1">
        {navItems.map((item) => {
          const isItemActive = pathname === item.path;
          return (
            <div key={item.title} className="space-y-0.5">
                <a href={item.path} onClick={(e) => { e.preventDefault(); handleLinkClick(item.path); }} className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 relative overflow-hidden group ${isItemActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={false} />
                  
                  <motion.div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200 relative z-10 shrink-0 ${isItemActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground group-hover:text-primary group-hover:bg-primary/10'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  
                  <AnimatePresence>
                    {isExpanded && <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden tracking-wide relative z-10 font-medium">{item.title}</motion.span>}
                  </AnimatePresence>
                </a>
            </div>
          );
        })}
      </nav>

      {/* Quick actions grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-4 pb-4 space-y-1">
            <div className="grid grid-cols-3 gap-2">
              <motion.button onClick={() => navigate('/supervisor/settings')} className="h-10 rounded-xl flex items-center justify-center bg-secondary/5 hover:bg-secondary/15 transition-all duration-200 group relative overflow-hidden shadow-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Settings className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors relative z-10" />
              </motion.button>
              <motion.button onClick={() => navigate('/supervisor/announcements')} className="h-10 rounded-xl flex items-center justify-center bg-info/5 hover:bg-info/15 transition-all duration-200 group relative overflow-hidden shadow-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Bell className="h-4 w-4 text-muted-foreground group-hover:text-info transition-colors relative z-10" />
              </motion.button>
              <motion.button className="h-10 rounded-xl flex items-center justify-center bg-accent/5 hover:bg-accent/15 transition-all duration-200 group relative overflow-hidden shadow-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors relative z-10" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile area */}
      <div className={`border-t border-border/50 p-4 transition-all duration-300 ${!isExpanded && "px-2"}`}>
        <AnimatePresence>
          {isExpanded ? (
            <motion.div key="expanded-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-xl border border-border/50">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-sm shrink-0">{getUserInitials()}</div>
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-sm font-medium truncate w-full text-foreground">{user?.name || 'Supervisor'}</span>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase truncate w-full tracking-widest leading-none">SACCO Manager</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-3 hover:text-white bg-destructive/10 hover:bg-destructive text-destructive font-medium transition-all duration-300 rounded-xl h-10 shadow-sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />Logout Account
              </Button>
            </motion.div>
          ) : (
            <motion.div key="collapsed-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
              <Button variant="ghost" size="sm" className="h-12 w-12 p-0 text-destructive hover:text-white bg-destructive/10 hover:bg-destructive rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm" onClick={handleLogout} title="Logout"><LogOut className="h-5 w-5" /></Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
