import React, { useState, useEffect } from "react";
import style from "./cusOrders.module.css";
import MainDashboard from "./CustomerDashboard";
import CustomerTable from './Tables/customerTable';
import AddNew from "./Tables/addNew";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';

function CusOrders() {
    const [selectedOption, setSelectedOption] = useState("Overview");
    const [isAddNewVisible, setIsAddNewVisible] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [hasPendingOrder, setHasPendingOrder] = useState(false);

    // Check for pending or waiting orders
    const checkPendingOrders = (tableData) => {
        return tableData.some(order => 
            order.Status.toLowerCase() === 'pending' || 
            order.Status.toLowerCase() === 'waiting'
        );
    };

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

    // Function to update pending order status
    const updatePendingStatus = (hasActivePendingOrder) => {
        setHasPendingOrder(hasActivePendingOrder);
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
                        <h2>My Orders</h2>
                    </div>
                    <hr />
                    <div className={style.btns}>
                        <div>
                            <button 
                                className={`${style.addBtn} ${hasPendingOrder ? style.disabled : ''}`}
                                onClick={handleAddClick}
                                disabled={hasPendingOrder}
                                title={hasPendingOrder ? "Cannot place new order while having pending or waiting orders" : "Place new order"}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                    <div className={style.table}>
                        <CustomerTable onOrderStatusChange={updatePendingStatus} />
                    </div>
                    {isAlertVisible && (
                        <div className={style.alertContainer}>
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                Order updated.
                            </Alert>
                        </div>
                    )}
                </div>
            </div>

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

export default CusOrders;