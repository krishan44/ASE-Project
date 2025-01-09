import { useState } from 'react'
import './App.css'
import MainDashboard from "./Components/OutletManager/MainDashboard";  


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainDashboard/>
    </>
  )
}

export default App
