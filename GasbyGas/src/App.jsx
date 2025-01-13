import { useState } from 'react'
import './App.css'
import Overview from "./Components/OutletManager/Overview";  
import CustomerOrders from "./Components/OutletManager/customerOrders";  
import CustomerTable from "./Components/OutletManager/Tables/customerTable";  


function App() {

  return (
    <>
      <CustomerTable/>
    </>
  )
}

export default App
