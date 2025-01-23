import React, { useState } from "react";
import style from "./customerOrders.module.css";
import MainDashboard from "./MainDashboard";
import CustomerTable from "./Tables/customerTable";
import AddNew from "./Tables/addNew";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import AlertTitle from '@mui/material/AlertTitle';
import Delete from "./Notifications/delete";

function CustomerOrders() {
    const [selectedOption, setSelectedOption] = useState("Customer Orders");
    const [isAddNewVisible, setIsAddNewVisible] = useState(false); // Manage AddNew popup visibility
    const [isAlertVisible, setIsAlertVisible] = useState(false); // Manage alert visibility
    const [isDelAlertVisible, setisDelAlertVisible] = useState(false); // Manage Delete Alert

    // Replace 'Outlet1' with the actual branch from the logged-in user
    const loggedInUserBranch = 'Kandy';

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
                        <button className={style.delBtn} onClick={handleDeleteClick}>Delete</button>
                    </div>
                    <div className={style.table}>
                        {/* Pass the branch prop to CustomerTable */}
                        <CustomerTable branch={loggedInUserBranch} />
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

export default CustomerOrders;