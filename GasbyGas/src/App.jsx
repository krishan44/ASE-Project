import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Verify" element={<Verify />} />

        {/* Outlet Manager Routes */}
        <Route path="/outlet-dashboard" element={<Overview />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/manage_accounts" element={<ManageStock />} />
        <Route path="/business_orders" element={<BusinessOrders />} />
        <Route path="/stock_orders" element={<StockOrders />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/waitlist_manage" element={<Waitlist />} />

        {/* Admin Routes */}
        <Route path="/admin/stock_requests" element={<StockOrderRequests />} />
        <Route path="/admin/account_manage" element={<AccountManage />} />
        <Route path="/admin/reports" element={<Report />} />
        <Route path="/admin/outlet_manager" element={<OutletManage />} />
        <Route path="/admin/outlet" element={<AdminOutlet />} />

        {/* Customer Routes */}
        <Route path="/customer/overview" element={<CusOrders />} />
        <Route path="/customer/order_history" element={<OrderHistory />} />
        <Route path="/customer/profile" element={<CusProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
