import { useState } from "react";
import style from "./Outlets.module.css";
import MainDashboard from "./MainDashboard";
import OutletManagement from "./OutletManage/OutletManagement";


function OutletManager(){
    const [selectedOption, setSelectedOption] = useState("OtManagement");

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
                        <h2>Outlets</h2>
                    </div>
                    <hr />
                    <div className={style.table}>
                        <OutletManagement />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OutletManager;