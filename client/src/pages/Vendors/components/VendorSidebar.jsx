import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  LogOut, 
  Settings, 
  Bell, 
  HelpCircle, 
  LayoutDashboard, 
  ShoppingCart, 
  ClipboardList, 
  CheckSquare, 
  LineChart, 
  Megaphone, 
  Users, 
  MessageSquare, 
  User as UserIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../../context/AuthContext';

const navItems = [
  { title: 'Overview', href: '/vendor/dashboard', icon: LayoutDashboard },
  { title: 'Produce Marketplace', href: '/vendor/marketplace', icon: ShoppingCart },
  { title: 'Purchase Orders', href: '/vendor/orders', icon: ClipboardList },
  { title: 'My Purchases', href: '/vendor/purchases', icon: CheckSquare },
  { title: 'Market Prices', href: '/vendor/prices', icon: LineChart },
  { title: 'Demand Listings', href: '/vendor/demand', icon: Megaphone },
  { title: 'Farmer Directory', href: '/vendor/farmers', icon: Users },
  { title: 'Negotiations', href: '/vendor/messages', icon: MessageSquare },
  { title: 'Profile', href: '/vendor/profile', icon: UserIcon },
  { title: 'Settings', href: '/vendor/settings', icon: Settings },
];

const VendorSidebar = ({ isOpen = true, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const pathname = location.pathname;
  const [isHovering, setIsHovering] = useState(false);

  const getUserInitials = () => {
    if (!user) return 'V';
    const nameParts = user.name ? user.name.split(' ') : [];
    if (nameParts.length >= 2) return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    if (user.name) return user.name.substring(0, 2).toUpperCase();
    return 'V';
  };

  const isExpanded = isOpen || isHovering;

  const getDashboardPath = () => '/vendor/dashboard';

  const handleLinkClick = (href) => {
    if(href === '#') return;
    navigate(href);
    if (window.innerWidth < 1024 && setIsOpen) setIsOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try { await logout(); navigate('/login'); } catch (error) { console.error('Logout failed:', error); }
  };

  return (
    <div 
      className={`h-screen transition-all duration-300 ease-in-out relative flex flex-col ${isExpanded ? 'w-[256px]' : 'w-[88px]'} border-r border-border/60 bg-sidebar backdrop-blur-sm overflow-hidden z-50`} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={getDashboardPath()} onClick={(e) => { e.preventDefault(); handleLinkClick(getDashboardPath()); }} className="h-20 border-b border-border/10 flex items-center justify-center relative group cursor-pointer shrink-0">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div key="expanded-logo" className="flex items-center justify-start px-6 w-full h-full gap-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
              <img src="https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772099480/AmicaLogo-removebg-preview_y4gzdc.png" alt="Amica" className="h-8 w-auto object-contain brightness-0" />
              <span className="text-2xl font-serif text-primary tracking-tight">Amica</span>
              <span className="text-[10px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Vendor</span>
            </motion.div>
          ) : (
            <motion.div key="collapsed-logo" className="relative group-hover:scale-110 transition-transform duration-200" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.3 }}>
               <img src="https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772099480/AmicaLogo-removebg-preview_y4gzdc.png" alt="Amica" className="h-8 w-8 object-contain brightness-0" />
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      <nav className="flex-1 px-3 py-6 overflow-y-auto no-scrollbar space-y-1">
        {navItems.map((item) => {
          const isItemActive = pathname === item.href;
          return (
            <div key={item.title} className="space-y-0.5">
                <a href={item.href} onClick={(e) => { e.preventDefault(); handleLinkClick(item.href); }} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 relative overflow-hidden group ${isItemActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'}`}>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={false} />
                  
                  <motion.div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200 relative z-10 shrink-0 ${isItemActive ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground group-hover:text-primary group-hover:bg-primary/5'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  
                  <AnimatePresence>
                    {isExpanded && <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden tracking-tight relative z-10 font-semibold">{item.title}</motion.span>}
                  </AnimatePresence>
                </a>
            </div>
          );
        })}
      </nav>

      <div className={`border-t border-border/10 p-4 transition-all duration-300 ${!isExpanded && "px-2"}`}>
        <AnimatePresence>
          {isExpanded ? (
            <motion.div key="expanded-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-border/50 shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-sm shrink-0">{getUserInitials()}</div>
                <div className="flex flex-col items-start min-w-0"><span className="text-sm font-bold truncate w-full text-foreground">{user?.name || 'Vendor'}</span><span className="text-[10px] font-bold text-muted-foreground uppercase truncate w-full tracking-widest">{user?.role || 'Vendor'}</span></div>
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-3 hover:text-white bg-destructive/5 hover:bg-destructive text-destructive font-bold transition-all duration-300 rounded-xl h-10 border border-destructive/10" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />Logout Account
              </Button>
            </motion.div>
          ) : (
            <motion.div key="collapsed-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
              <Button variant="ghost" size="sm" className="h-12 w-12 p-0 text-destructive hover:text-destructive-foreground hover:bg-destructive rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border border-destructive/10" onClick={handleLogout} title="Logout"><LogOut className="h-5 w-5" /></Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VendorSidebar;
