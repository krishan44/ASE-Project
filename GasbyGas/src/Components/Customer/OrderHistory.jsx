import React, { useState } from "react";
import style from "./OrderHistory.module.css";
import MainDashboard from "./CustomerDashboard";
import OrderHistoryTable from './Tables/OrderHistoryTable';
import AddNew from "./Tables/addNew";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import AlertTitle from '@mui/material/AlertTitle';

function OrderHistory(){
    const [selectedOption, setSelectedOption] = useState("OrderHistory");
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
                        <h2>Orders History</h2>
                    </div>
                    <hr />

                    <div className={style.table}>
                        <OrderHistoryTable />
                    </div>

                    {/* {isDelAlertVisible && (
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
                        
                    )} */}
                </div>
            </div>
        </>
    );
}

export default OrderHistory;