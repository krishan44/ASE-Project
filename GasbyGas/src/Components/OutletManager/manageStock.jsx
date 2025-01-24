import React, { useState, useEffect } from "react";
import style from "./manageStock.module.css";
import MainDashboard from "./MainDashboard";
import { Package, RefreshCcw } from "lucide-react";

function StockManagement() {
  const [selectedOption, setSelectedOption] = useState("Stock Management");
  const [stockLevels, setStockLevels] = useState({
    "2.5Kg": 0,
    "5Kg": 0,
    "12.5Kg": 0,
    "37.5Kg": 0,
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loggedInUserBranch, setLoggedInUserBranch] = useState(null); // State for the logged-in user's branch
  const [isLoading, setIsLoading] = useState(false); // Loading state for the update button
  const [error, setError] = useState(null); // Error state

  // Fetch the logged-in user's branch from localStorage when the component mounts
  useEffect(() => {
    const branch = localStorage.getItem("userBranch");
    if (branch) {
      setLoggedInUserBranch(branch);
      setError(null);
    } else {
      setError("Branch information not found. Please log in again.");
    }
  }, []);

  const handleStockChange = (weight, value) => {
    setStockLevels((prev) => ({
      ...prev,
      [weight]: Number(value),
    }));
  };

  const handleUpdateStock = async () => {
    if (!loggedInUserBranch) {
      alert("Branch information is missing. Please log in again.");
      return;
    }

    setIsLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(
        `http://localhost:5001/update-stock/${loggedInUserBranch}`, // Use the full backend URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure the correct content type
          },
          body: JSON.stringify({ stockLevels }), // Send the stock levels as JSON
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse the JSON response
      console.log("Response from backend:", result);

      // Reset the stock levels to 0 after successful update
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
      setIsLoading(false); // Reset loading state
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

        {/* Show error message if branch is not found */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Stock management form */}
        <div className={style.stockManagement}>
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
                />
                <span className={style.stockUnit}>Units</span>
              </div>
            </div>
          ))}

          {/* Update button and last updated timestamp */}
          <div className={style.stockUpdateContainer}>
            {lastUpdated && (
              <div className={style.lastUpdatedText}>
                Last Updated: {lastUpdated}
              </div>
            )}
            <button
              onClick={handleUpdateStock}
              className={style.updateStockButton}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  <RefreshCcw className={style.updateIcon} />
                  Update Stock
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockManagement;