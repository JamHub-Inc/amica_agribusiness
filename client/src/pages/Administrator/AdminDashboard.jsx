import React from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import AdminWelcomeBlock from './components/AdminWelcomeBlock';
import AdminStats from './components/AdminStats';
import FarmerGrowthChart from './components/FarmerGrowthChart';
import LoanDistribution from './components/LoanDistribution';
import RecentActivity from './components/RecentActivity';

export default function AdminDashboard() {
  return (
    <AdminDashboardLayout title="System Overview">
      <div className="space-y-6">
        <AdminWelcomeBlock />
        <AdminStats />
        <FarmerGrowthChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoanDistribution />
          <RecentActivity />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
