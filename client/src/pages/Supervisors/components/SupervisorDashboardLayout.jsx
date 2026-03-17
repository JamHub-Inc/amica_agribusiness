import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SupervisorSidebar from './SupervisorSidebar';
import SupervisorHeader from './SupervisorHeader';

export default function SupervisorDashboardLayout({ children, title }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.pathname !== prevLocation.pathname) {
      setIsLoading(true);
      setPrevLocation(location);
    }
  }, [location, prevLocation]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="h-screen flex overflow-hidden bg-muted/10">
      <div className="h-screen flex-shrink-0 overflow-hidden hidden md:block">
        <SupervisorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />
      
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] md:hidden ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <SupervisorSidebar isOpen={true} setIsOpen={setIsSidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="flex-shrink-0 relative z-20">
          <SupervisorHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6 lg:p-8 relative no-scrollbar">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-primary/20 border-t-primary shadow-sm bg-transparent"></div>
            </div>
          ) : (
            <div className="max-w-[1600px] mx-auto w-full pb-20 fade-in-up animate">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
