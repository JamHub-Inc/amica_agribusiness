import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Homepage/Landing'
import Login from './pages/Auth/LoginPage/Login'
import Register from './pages/Auth/SignUpPage/Register'
import VerifyEmail from './pages/Auth/VerifyEmail/VerifyEmail'
import ProtectedRoute from './components/sections/ProtectedRoute'
import FarmersDashboard from './pages/Farmers/FarmersDashboard'
import AIFarmingAdvisor from './pages/Farmers/AIFarmingAdvisor'
import Reports from './pages/Farmers/Reports'
import MyProduce from './pages/Farmers/MyProduce'
import Loans from './pages/Farmers/Loans'
import MarketPrices from './pages/Farmers/MarketPrices'
import AIPriceInsights from './pages/Farmers/AIPriceInsights'
import Profile from './pages/Farmers/Profile'
import SettingsPage from './pages/Farmers/Settings'
import MarketDemand from './pages/Farmers/MarketDemand'
import SACCOAffiliation from './pages/Farmers/SACCOAffiliation'

// Vendor / Sales Personnel Pages
import VendorDashboard from './pages/Vendors/VendorDashboard'
import ProduceMarketplace from './pages/Vendors/ProduceMarketplace'
import PurchaseOrders from './pages/Vendors/PurchaseOrders'
import MyPurchases from './pages/Vendors/MyPurchases'
import MarketPricesVendor from './pages/Vendors/MarketPrices'
import DemandListings from './pages/Vendors/DemandListings'
import FarmerDirectory from './pages/Vendors/FarmerDirectory'
import Negotiations from './pages/Vendors/Negotiations'
import VendorProfile from './pages/Vendors/VendorProfile'
import VendorSettings from './pages/Vendors/VendorSettings'

// Administrator Pages
import AdminDashboard from './pages/Administrator/AdminDashboard'
import UserManagement from './pages/Administrator/UserManagement'
import ProduceManagement from './pages/Administrator/ProduceManagement'
import MarketPriceManagement from './pages/Administrator/MarketPriceManagement'
import LoanManagement from './pages/Administrator/LoanManagement'
import SACCOManagement from './pages/Administrator/SACCOManagement'
import AdminReports from './pages/Administrator/AdminReports'
import ContentManagement from './pages/Administrator/ContentManagement'
import NotificationsManagement from './pages/Administrator/NotificationsManagement'
import SystemSettings from './pages/Administrator/SystemSettings'
import ActivityLogs from './pages/Administrator/ActivityLogs'
import AdminProfile from './pages/Administrator/AdminProfile'

// Supervisor Pages
import SupervisorDashboard from './pages/Supervisors/SupervisorDashboard'
import MemberManagement from './pages/Supervisors/MemberManagement'
import ProduceVerification from './pages/Supervisors/ProduceVerification'
import LoanApprovals from './pages/Supervisors/LoanApprovals'
import SaccoReports from './pages/Supervisors/SaccoReports'
import SupervisorMessages from './pages/Supervisors/SupervisorMessages'
import SupervisorAnnouncements from './pages/Supervisors/SupervisorAnnouncements'
import SaccoSettings from './pages/Supervisors/SaccoSettings'
import SupervisorProfile from './pages/Supervisors/SupervisorProfile'
import SupervisorMarketPrices from './pages/Supervisors/MarketPrices'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Dashboards */}
        <Route path="/farmers-dashboard" element={<ProtectedRoute><FarmersDashboard /></ProtectedRoute>} />
        <Route path="/ai-farming-advisor" element={<ProtectedRoute><AIFarmingAdvisor /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/my-produce" element={<ProtectedRoute><MyProduce /></ProtectedRoute>} />
        <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
        <Route path="/market-demand" element={<ProtectedRoute><MarketDemand /></ProtectedRoute>} />
        <Route path="/market-prices" element={<ProtectedRoute><MarketPrices /></ProtectedRoute>} />
        <Route path="/ai-price-insights" element={<ProtectedRoute><AIPriceInsights /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/sacco-affiliation" element={<ProtectedRoute><SACCOAffiliation /></ProtectedRoute>} />
        
        {/* Vendor/Sales Dashboard Routes */}
        <Route path="/vendor/dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
        <Route path="/vendor/marketplace" element={<ProtectedRoute><ProduceMarketplace /></ProtectedRoute>} />
        <Route path="/vendor/orders" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
        <Route path="/vendor/purchases" element={<ProtectedRoute><MyPurchases /></ProtectedRoute>} />
        <Route path="/vendor/prices" element={<ProtectedRoute><MarketPricesVendor /></ProtectedRoute>} />
        <Route path="/vendor/demand" element={<ProtectedRoute><DemandListings /></ProtectedRoute>} />
        <Route path="/vendor/farmers" element={<ProtectedRoute><FarmerDirectory /></ProtectedRoute>} />
        <Route path="/vendor/messages" element={<ProtectedRoute><Negotiations /></ProtectedRoute>} />
        <Route path="/vendor/profile" element={<ProtectedRoute><VendorProfile /></ProtectedRoute>} />
        <Route path="/vendor/settings" element={<ProtectedRoute><VendorSettings /></ProtectedRoute>} />
        
        {/* Alias for backward compatibility */}
        <Route path="/sales-dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
        
        {/* Supervisor Dashboard Routes */}
        <Route path="/supervisor/dashboard" element={<ProtectedRoute requireSupervisor={true}><SupervisorDashboard /></ProtectedRoute>} />
        <Route path="/supervisor/members" element={<ProtectedRoute requireSupervisor={true}><MemberManagement /></ProtectedRoute>} />
        <Route path="/supervisor/produce" element={<ProtectedRoute requireSupervisor={true}><ProduceVerification /></ProtectedRoute>} />
        <Route path="/supervisor/loans" element={<ProtectedRoute requireSupervisor={true}><LoanApprovals /></ProtectedRoute>} />
        <Route path="/supervisor/market-prices" element={<ProtectedRoute requireSupervisor={true}><SupervisorMarketPrices /></ProtectedRoute>} />
        <Route path="/supervisor/reports" element={<ProtectedRoute requireSupervisor={true}><SaccoReports /></ProtectedRoute>} />
        <Route path="/supervisor/messages" element={<ProtectedRoute requireSupervisor={true}><SupervisorMessages /></ProtectedRoute>} />
        <Route path="/supervisor/announcements" element={<ProtectedRoute requireSupervisor={true}><SupervisorAnnouncements /></ProtectedRoute>} />
        <Route path="/supervisor/settings" element={<ProtectedRoute requireSupervisor={true}><SaccoSettings /></ProtectedRoute>} />
        <Route path="/supervisor/profile" element={<ProtectedRoute requireSupervisor={true}><SupervisorProfile /></ProtectedRoute>} />
        <Route path="/supervisors-dashboard" element={<ProtectedRoute requireSupervisor={true}><SupervisorDashboard /></ProtectedRoute>} />

        {/* System Admin Dashboard Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute requireAdmin={true}><UserManagement /></ProtectedRoute>} />
        <Route path="/admin/produce" element={<ProtectedRoute requireAdmin={true}><ProduceManagement /></ProtectedRoute>} />
        <Route path="/admin/market-prices" element={<ProtectedRoute requireAdmin={true}><MarketPriceManagement /></ProtectedRoute>} />
        <Route path="/admin/loans" element={<ProtectedRoute requireAdmin={true}><LoanManagement /></ProtectedRoute>} />
        <Route path="/admin/sacco" element={<ProtectedRoute requireAdmin={true}><SACCOManagement /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute requireAdmin={true}><AdminReports /></ProtectedRoute>} />
        <Route path="/admin/content" element={<ProtectedRoute requireAdmin={true}><ContentManagement /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute requireAdmin={true}><NotificationsManagement /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute requireAdmin={true}><SystemSettings /></ProtectedRoute>} />
        <Route path="/admin/activity-logs" element={<ProtectedRoute requireAdmin={true}><ActivityLogs /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute requireAdmin={true}><AdminProfile /></ProtectedRoute>} />

        {/* Alias for backward compatibility if needed */}
        <Route path="/super-admin-dashboard" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />

        {/* 404 fallback */}
        <Route path="*" element={<div className="p-8 text-center text-muted-foreground">Page not found</div>} />
      </Routes>
    </AuthProvider>
  )
}
