import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Overview from "./Components/OutletManager/Overview";
import CustomerOrders from "./Components/OutletManager/customerOrders";
import CustomerTable from "./Components/OutletManager/Tables/customerTable";
import BusinessOrders from "./Components/OutletManager/BusinessOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/BusinessOrders" element={<BusinessOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
