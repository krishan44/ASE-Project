import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Overview from "./Components/OutletManager/Overview";
import CustomerOrders from "./Components/OutletManager/customerOrders";
import CustomerTable from "./Components/OutletManager/Tables/customerTable";
import BusinessOrders from "./Components/OutletManager/BusinessOrder";
import StockOrders from "./Components/OutletManager/StockOrder";
import Delete from "./Components/OutletManager/Notifications/delete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/BusinessOrders" element={<BusinessOrders />} />
        <Route path="/StockOrders" element={<StockOrders />} />
        <Route path="/Delete" element ={<Delete/>}/>
      </Routes>
    </Router>
  );
}

export default App;
