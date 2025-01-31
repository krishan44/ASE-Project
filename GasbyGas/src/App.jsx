import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Components/AdminAuth/AuthContext';
import './App.css';

import Login from './Components/Login/Login';
import Registration from './Components/Login/Registration';
import Verify from './Components/Login/VerificationFlow';
import Overview from "./Components/OutletManager/Overview";
import CustomerOrders from "./Components/OutletManager/customerOrders";
import Customers from "./Components/OutletManager/customers";
import ManageStock from "./Components/OutletManager/manageStock";
import BusinessOrders from "./Components/OutletManager/BusinessOrder";
import StockOrders from "./Components/OutletManager/StockOrder";
import Delete from "./Components/OutletManager/Notifications/delete";
import Waitlist from './Components/OutletManager/Waitlist';
import StockOrderRequests from './Components/Admin/StockOrder';
import AccountManage from './Components/Admin/manageAccount';
import OutletManage from './Components/Admin/OutletManagers';
import AdminOutlet from './Components/Admin/Outlets';
import Report from './Components/Admin/Report';
import OrderHistory from './Components/Customer/OrderHistory';
import CusOrders from './Components/Customer/cusOrders';
import CusProfile from './Components/Customer/CustomerProfile';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Verify" element={<Verify />} />

          {/* Outlet Manager Routes */}
          <Route 
            path="/outlet-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['outlet_manager']}>
                <Overview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute allowedRoles={['outlet_manager']}>
                <CustomerOrders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <ProtectedRoute allowedRoles={['outlet_manager']}>
                <Customers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manage_accounts" 
            element={
              <ProtectedRoute allowedRoles={['outlet_manager']}>
                <ManageStock />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/business_orders" 
            element={
              <ProtectedRoute allowedRoles={['outlet_manager']}>
                <BusinessOrders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/stock_orders" 
            element={
              <ProtectedRoute allowedRoles={['outlet_manager']}>
                <StockOrders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/delete" 
            element={
              <ProtectedRoute allowedRoles={['outlet_manager']}>
                <Delete />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/waitlist_manage" 
            element={
              <ProtectedRoute allowedRoles={['outlet_manager']}>
                <Waitlist />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/stock_requests" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <StockOrderRequests />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/account_manage" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AccountManage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Report />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/outlet_manager" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <OutletManage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/outlet" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminOutlet />
              </ProtectedRoute>
            } 
          />

          {/* Customer Routes */}
          <Route 
            path="/customer/overview" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CusOrders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/order_history" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <OrderHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/profile" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CusProfile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;