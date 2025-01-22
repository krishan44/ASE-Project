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

function App() {
  return (

    <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />

            <Route path="/Registration" element={<Registration />} />
            <Route path="/Verify" element={<Verify />} />
            <Route path="/customer-dashboard" element={<Overview />} />
            <Route path="/outlet-dashboard" element={<Delete />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                  <Overview />
              }
            />
            <Route
              path="/orders"
              element={
                  <CustomerOrders />
              }
            />
            <Route
              path="/customers"
              element={
                  <Customers />
              }
            />
            <Route
              path="/manage_accounts"
              element={
                  <ManageAccounts />
              }
            />
            <Route
              path="/outlet_manager"
              element={
                  <OutletManager />
              }
            />
            

            <Route path="/BusinessOrders" element={<BusinessOrders />}/>
            <Route path="/StockOrders" element={<StockOrders/> }/>
            <Route path="/Delete" element={<Delete />}/>
            <Route path="/Waitlist Manage" element={<Waitlist />}/>
          </Routes>
          </Router>
      
  );
}

export default App;
