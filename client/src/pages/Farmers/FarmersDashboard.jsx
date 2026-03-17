import React from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { useAuth } from '../../context/AuthContext';
import AIAdvisor from '../../components/sections/AIAdvisor';

import WelcomeBlock from './components/WelcomeBlock';
import DashboardStats from './components/DashboardStats';
import YieldAnalytics from './components/YieldAnalytics';
import WeatherForecast from './components/WeatherForecast';
import MarketPricesComponent from './components/MarketPricesComponent';
import LoanStatus from './components/LoanStatus';

export default function FarmersDashboard() {
  const { user } = useAuth();

  return (
    <FarmerDashboardLayout title="Overview">
      <div className="space-y-6">
        <WelcomeBlock />
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <YieldAnalytics />
          </div>

          {/* Side Info Cards */}
          <div className="space-y-6">
            <WeatherForecast />
            <MarketPricesComponent />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIAdvisor location={user?.location} />
          <LoanStatus />
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
