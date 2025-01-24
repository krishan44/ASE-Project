import React, { useState } from 'react';
import style from "./manageStock.module.css";
import MainDashboard from "./MainDashboard";
import order from "../../assets/Pannel/order.svg";
import stock from "../../assets/Pannel/stock.svg";
import { useNavigate } from "react-router-dom";

function StockManagement() {
  const [selectedOption, setSelectedOption] = useState("Stock Management");
  const [stockLevels, setStockLevels] = useState({
    '2.5Kg': 0,
    '5Kg': 0,
    '12.5Kg': 0,
    '37.5Kg': 0
  });

  const navigate = useNavigate();

  const handleStockChange = (weight, value) => {
    setStockLevels(prev => ({
      ...prev,
      [weight]: Number(value)
    }));
  };

  const handleUpdateStock = () => {
    // Implement stock update logic here
    console.log('Updated Stock Levels:', stockLevels);
    // You might want to call an API or dispatch an action to update stock
  };

  const handleCardClick = () => {
    navigate('/customers');
  };

  const outleManager = () => {
    navigate('/outlet_manager');
  };

  return (
    <div className={style.manageAccount}>
      <div className={style.sidepanel}>
        <MainDashboard 
          selectedOption={selectedOption} 
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className={style.manageAcoountContent}>
        <h2 className={style.sectionName}>Stock Management</h2>
        <hr/>
        
        <div className={style.stockManagement}>
          {Object.keys(stockLevels).map((weight) => (
            <div key={weight} className={style.stockInputGroup}>
              <label className={style.stockLabel}>{weight} Stock</label>
              <div className={style.stockInputContainer}>
                <input 
                  type="number" 
                  min="0" 
                  value={stockLevels[weight]} 
                  onChange={(e) => handleStockChange(weight, e.target.value)}
                  className={style.stockInput}
                />
                <span className={style.stockUnit}>Units</span>
              </div>
            </div>
          ))}
          
          <button 
            onClick={handleUpdateStock} 
            className={style.updateStockButton}
          >
            Update Stock
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockManagement;