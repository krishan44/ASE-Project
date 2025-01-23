import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Components/AdminAuth/AuthContext';
import PrivateRoute from './Components/AdminAuth/PrivateRoute';
import Overview from "./Components/OutletManager/Overview";
import CustomerOrders from "./Components/OutletManager/customerOrders";
import Customers from "./Components/OutletManager/customers";
// import CustomerTable from "./Components/OutletManager/Tables/customerTable";
import ManageAccounts from "./Components/OutletManager/manageAccount";
import OutletManager from "./Components/OutletManager/outletManager";
import Login from './Components/Login/Login';
import Registration from './Components/Login/Registration';
import Verify from './Components/Login/VerificationFlow';
import { ToastProvider } from './Components/Util/ToastContext';
import CustomerTable from "./Components/OutletManager/Tables/customerTable";
import BusinessOrders from "./Components/OutletManager/BusinessOrder";
import StockOrders from "./Components/OutletManager/StockOrder";
import Delete from "./Components/OutletManager/Notifications/delete";
import Waitlist from './Components/OutletManager/Waitlist';
import AdminOverview from './Components/Admin/Overview';
import StockOrderRequests from './Components/Admin/StockOrder';
import AccountManage from './Components/Admin/manageAccount';
import AdminReports from './Components/Admin/AdminReport';

function App() {
  return (
    // <ToastProvider>
    //   <AuthProvider>
    //     <Router>
    //       <Routes>
    //         {/* Public Routes */}
    //         <Route path="/login/admin" element={<Login />} />

    //         {/* Protected Routes */}
    //         <Route
    //           path="/dashboard"
    //           element={
    //             <PrivateRoute>
    //               <Overview />
    //             </PrivateRoute>
    //           }
    //         />
    //         <Route
    //           path="/orders"
    //           element={
    //             <PrivateRoute>
    //               <CustomerOrders />
    //             </PrivateRoute>
    //           }
    //         />
    //         <Route
    //           path="/customers"
    //           element={
    //             <PrivateRoute>
    //               <Customers />
    //             </PrivateRoute>
    //           }
    //         />
    //         <Route
    //           path="/manage_accounts"
    //           element={
    //             <PrivateRoute>
    //               <ManageAccounts />
    //             </PrivateRoute>
    //           }
    //         />
    //         <Route
    //           path="/outlet_manager"
    //           element={
    //             <PrivateRoute>
    //               <OutletManager />
    //             </PrivateRoute>
    //           }
    //         />
    //         <Route path="/"
    //           element={
    //             <PrivateRoute>
    //               <Overview />
    //             </PrivateRoute>
    //           }
    //         />

    //         <Route path="/orders"
    //           element={
    //             <PrivateRoute>
    //               <CustomerOrders />
    //             </PrivateRoute>} />

    //         <Route path="/BusinessOrders"
    //           element={
    //             <PrivateRoute>
    //               <BusinessOrders />
    //             </PrivateRoute>} />

    //         <Route path="/StockOrders"
    //           element={<PrivateRoute><StockOrders
    //           /></PrivateRoute>} />

    //         <Route path="/Delete"
    //           element={<PrivateRoute><Delete /></PrivateRoute>}
    //         />

    //         <Route path="/Waitlist Manage"
    //           element={<PrivateRoute><Waitlist /></PrivateRoute>}
    //         />
    //       </Routes>
    //     </Router>
    //   </AuthProvider>
    // </ToastProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/manage_accounts" element={<ManageAccounts />} />
        <Route path="/outlet_manager" element={<OutletManager />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/business_orders" element={<BusinessOrders />} />
        <Route path="/stock_orders" element={<StockOrders />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/waitlist_manage" element={<Waitlist />} />

        <Route path="/admin/dashboard" element={<AdminOverview />} />
        <Route path="/admin/stock_requests" element={<StockOrderRequests />} />
        <Route path="/admin/account_manage" element={<AccountManage />} />
        <Route path="/admin/reports" element={<AdminReports />} />

      </Routes>
    </Router>
  );
}

export default App;
