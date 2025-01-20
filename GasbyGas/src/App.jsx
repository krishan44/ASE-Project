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
import Login from './Components/Admin/login';
import { ToastProvider } from './Components/Util/ToastContext';
import CustomerTable from "./Components/OutletManager/Tables/customerTable";
import BusinessOrders from "./Components/OutletManager/BusinessOrder";
import StockOrders from "./Components/OutletManager/StockOrder";
import Delete from "./Components/OutletManager/Notifications/delete";
import Waitlist from './Components/OutletManager/Waitlist';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login/admin" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Overview />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <CustomerOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <PrivateRoute>
                  <Customers />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage_accounts"
              element={
                <PrivateRoute>
                  <ManageAccounts />
                </PrivateRoute>
              }
            />
            <Route
              path="/outlet_manager"
              element={
                <PrivateRoute>
                  <OutletManager />
                </PrivateRoute>
              }
            />
            <Route path="/"
              element={
                <PrivateRoute>
                  <Overview />
                </PrivateRoute>
              }
            />

            <Route path="/orders"
              element={
                <PrivateRoute>
                  <CustomerOrders />
                </PrivateRoute>} />

            <Route path="/BusinessOrders"
              element={
                <PrivateRoute>
                  <BusinessOrders />
                </PrivateRoute>} />

            <Route path="/StockOrders"
              element={<PrivateRoute><StockOrders
              /></PrivateRoute>} />

            <Route path="/Delete"
              element={<PrivateRoute><Delete /></PrivateRoute>}
            />

            <Route path="/Waitlist Manage"
              element={<PrivateRoute><Waitlist /></PrivateRoute>}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
