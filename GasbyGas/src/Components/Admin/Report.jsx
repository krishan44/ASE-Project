import { useState } from "react";
import style from "./OutletManagers.module.css";
import MainDashboard from "./MainDashboard";
import TimelineTable from "./Tables/TimelineTables";


function OutletManager(){
    const [selectedOption, setSelectedOption] = useState("Report Generation");

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
                        <h2>Report</h2>
                    </div>
                    <hr />
                    <div className={style.table}>
                        <TimelineTable />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OutletManager;