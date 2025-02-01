import React, { useState, useEffect } from "react";
import style from "./manageStock.module.css";
import MainDashboard from "./MainDashboard";
import { Package, RefreshCcw, Loader2 } from "lucide-react";

const StockManagement = () => {
  const [selectedOption, setSelectedOption] = useState("Stock Manage");
  const [stockLevels, setStockLevels] = useState({
    "2.5Kg": 0,
    "5Kg": 0,
    "12.5Kg": 0,
    "37.5Kg": 0,
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const branchName = localStorage.getItem('branch');

  useEffect(() => {
    if (!branchName) {
      setError('Branch information not found in localStorage.');
      return;
    }

    const fetchStockLevels = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/stock-levels/${branchName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stock levels');
        }
        const data = await response.json();
        setStockLevels(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching stock levels:', error);
        setError('Failed to fetch stock levels. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStockLevels();
  }, [branchName]);

  const handleStockChange = (weight, value) => {
    setStockLevels((prev) => ({
      ...prev,
      [weight]: Number(value),
    }));
  };

  const handleUpdateStock = async () => {
    if (!branchName) {
      alert("Branch information is missing. Please log in again.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5001/update-stock/${branchName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockLevels }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from backend:", result);

      setStockLevels({
        "2.5Kg": 0,
        "5Kg": 0,
        "12.5Kg": 0,
        "37.5Kg": 0,
      });

      setLastUpdated(new Date().toLocaleString());
      alert("Stock updated successfully!");
    } catch (error) {
      console.error("Error updating stock:", error);
      setError("Failed to update stock. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        <div className={style.stockHeader}>
          <h2 className={style.sectionName}>Stock Management</h2>
          <hr />
        </div>

        {error && (
          <div className={style.errorMessage}>
            {error}
          </div>
        )}

        <div className={`${style.stockManagement} ${isLoading ? style.loadingState : ''}`}>
          {Object.keys(stockLevels).map((weight) => (
            <div key={weight} className={style.stockInputGroup}>
              <div className={style.stockLabelContainer}>
                <Package className={style.stockIcon} />
                <label className={style.stockLabel}>{weight} Stock</label>
              </div>
              <div className={style.stockInputContainer}>
                <input
                  type="number"
                  min="0"
                  value={stockLevels[weight]}
                  onChange={(e) => handleStockChange(weight, e.target.value)}
                  className={style.stockInput}
                  disabled={isLoading}
                />
                <span className={style.stockUnit}>Units</span>
              </div>
            </div>
          ))}

          <div className={style.stockUpdateContainer}>
            {lastUpdated && (
              <div className={style.lastUpdatedText}>
                Last Updated: {lastUpdated}
              </div>
            )}
            <button
              onClick={handleUpdateStock}
              className={style.updateStockButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${style.updateIcon} ${style.spinIcon}`} />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCcw className={style.updateIcon} />
                  Update Stock
                </>
              )}
            </button>
          </div>

          {isLoading && (
            <div className={style.loadingOverlay}>
              <Loader2 className={style.spinIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockManagement;