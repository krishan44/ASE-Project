import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import style from "./stockOrders.module.css";
import MainDashboard from "./MainDashboard";
import edit from "../../assets/table/edit.svg";
import StockTable from "./Tables/stockTable"
import AddNewStock from "./Tables/AddnewStock";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import AlertTitle from '@mui/material/AlertTitle';
import Delete from "./Notifications/delete";

function StockOrders(){
    const [selectedOption, setSelectedOption] = useState("Stock Orders");
    const [isAddNewVisible, setIsAddNewVisible] = useState(false); // Manage AddNew popup visibility
    const [isAlertVisible, setIsAlertVisible] = useState(false); // Manage alert visibility
    const [isDelAlertVisible,setisDelAlertVisible]= useState(false); //Manage Delete Alert


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

    const handleDeleteClick = () =>{
        setisDelAlertVisible(true);
    }

    const handleDeleteClose=()=>{
        setisDelAlertVisible(false);
    }

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
                        <h2>Stock Orders</h2>
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
   
                    </div>
                    <div className={style.table}>
                        <StockTable />
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

                    {isDelAlertVisible && (
                         <div className={style.DelpopupOverlay}>
                         <div className={style.DelpopupContent}>
                             <Delete />
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
                    <div className={style.popupContent} style={{ height: "400px"}}>
                        <AddNewStock />
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

export default StockOrders;