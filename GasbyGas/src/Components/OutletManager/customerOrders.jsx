import React, { useState } from "react";
import style from "./customerOrders.module.css";
import MainDashboard from "./MainDashboard";
import CustomerTable from "./Tables/customerTable";
import AddNew from "./Tables/addNew";

function CustomerOrders() {
    const [selectedOption, setSelectedOption] = useState("Customer Orders");
    const [isAddNewVisible, setIsAddNewVisible] = useState(false); // Manage AddNew popup visibility

    const handleAddClick = () => {
        setIsAddNewVisible(true); // Show the AddNew popup
    };

    const handleCloseAddNew = () => {
        setIsAddNewVisible(false); // Close the AddNew popup
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
                            <button className={style.UpdateBtn}>Save</button>
                        </div>
                        <button className={style.delBtn}>Delete</button>
                    </div>
                    <div className={style.table}>
                        <CustomerTable />
                    </div>
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
