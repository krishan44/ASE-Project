import React, { useState, useEffect } from "react";
import style from "./customerOrders.module.css";
import MainDashboard from "./MainDashboard";
import WaitlistTable from "./Tables/WaitlistTable";

function Waitlist() {
  const [selectedOption, setSelectedOption] = useState("Waitlist Manage");
  const [loggedInUserBranch, setLoggedInUserBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const branch = localStorage.getItem("userBranch");
    if (branch) {
      setLoggedInUserBranch(branch);
      setError(null);
    } else {
      setError("Branch information not found. Please log in again.");
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className={style.customerOrders}>
        <div className={style.sidepanel}>
          <MainDashboard
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className={style.customerOrderContent}>
          <div className={style.sectionName}>
            <h2>Waitlist Orders</h2>
          </div>
          <hr />
          <div className={style.table}>
            {/* Show loading or error message while fetching the branch */}
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              /* Pass the dynamic branch prop to WaitlistTable */
              <WaitlistTable branch={loggedInUserBranch} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Waitlist;