import React, { useState, useEffect } from "react";
import style from "./customerOrders.module.css";
import MainDashboard from "./MainDashboard";
import Business from "./Tables/Business";
import AddNew from "./Tables/addNewBusiness";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';
import Delete from "./Notifications/deleteBusiness";

function BusinessOrders() {
    const [selectedOption, setSelectedOption] = useState("Business Orders");
    const [isAddNewVisible, setIsAddNewVisible] = useState(false); // Manage AddNew popup visibility
    const [isAlertVisible, setIsAlertVisible] = useState(false); // Manage alert visibility
    const [isDelAlertVisible, setisDelAlertVisible] = useState(false); // Manage Delete Alert
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
        setIsAddNewVisible(true); // Show the AddNew popup
    };

    const handleCloseAddNew = () => {
        setIsAddNewVisible(false); // Close the AddNew popup
    };

    const handleSaveClick = () => {
        setIsAlertVisible(true); // Show the alert
        setTimeout(() => setIsAlertVisible(false), 3000); // Hide the alert after 3 seconds
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
                        <h2>Business Orders</h2>
                    </div>
                    <hr />
                    
                    <div className={style.table}>
                        {/* Show loading or error message while fetching the branch */}
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p style={{ color: "red" }}>{error}</p>
                        ) : (
                            /* Pass the dynamic branch prop to Business */
                            <Business branch={loggedInUserBranch} />
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
                                <button
                                    className={style.closeBtn}
                                    onClick={handleDeleteClose}
                                >
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
                        <button
                            className={style.closeBtn}
                            onClick={handleCloseAddNew}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default BusinessOrders;