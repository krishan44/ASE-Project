import React, { useState, useEffect } from "react";
import style from "./customerOrders.module.css";
import MainDashboard from "./MainDashboard";
import CustomerTable from "./Tables/customerTable";
import AddNew from "./Tables/addNew";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Delete from "./Notifications/delete";

function CustomerOrders() {
  const [selectedOption, setSelectedOption] = useState("Customer Orders");
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isDelAlertVisible, setisDelAlertVisible] = useState(false);
  const [loggedInUserBranch, setLoggedInUserBranch] = useState(null); // State for the logged-in user's branch
  const [isLoading, setIsLoading] = useState(true); // Loading state
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
    setIsLoading(false);
  }, []);

  const handleAddClick = () => {
    setIsAddNewVisible(true);
  };

  const handleCloseAddNew = () => {
    setIsAddNewVisible(false);
  };

  const handleSaveClick = () => {
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000);
  };

  const handleDeleteClick = () => {
    setisDelAlertVisible(true);
  };

  const handleDeleteClose = () => {
    setisDelAlertVisible(false);
  };

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
            <h2>Customer Orders</h2>
          </div>
          <hr />
          <div className={style.btns}>
            <div>
              <button className={style.addBtn} onClick={handleAddClick}>
                Add
              </button>
              <button className={style.UpdateBtn} onClick={handleSaveClick}>
                Save
              </button>
            </div>
            <button className={style.delBtn} onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
          <div className={style.table}>
            {/* Show loading or error message while fetching the branch */}
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              /* Pass the dynamic branch prop to CustomerTable */
              <CustomerTable branch={loggedInUserBranch} />
            )}
          </div>
          {/* Alert for Save button */}
          {isAlertVisible && (
            <div className={style.alertContainer}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success Alert with an encouraging title.
              </Alert>
            </div>
          )}

          {/* Delete Confirmation Popup */}
          {isDelAlertVisible && (
            <div className={style.DelpopupOverlay}>
              <div className={style.DelpopupContent}>
                <Delete onClose={handleDeleteClose} />
                <button className={style.closeBtn} onClick={handleDeleteClose}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup for AddNew */}
      {isAddNewVisible && (
        <div className={style.popupOverlay}>
          <div className={style.popupContent}>
            <AddNew />
            <button className={style.closeBtn} onClick={handleCloseAddNew}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerOrders;