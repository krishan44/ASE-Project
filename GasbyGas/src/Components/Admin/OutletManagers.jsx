import { useState } from "react";
import style from "./OutletManagers.module.css";
import MainDashboard from "./MainDashboard";
import UserManagement from "./UserManage/UserManagement";


function OutletManager(){
    const [selectedOption, setSelectedOption] = useState("OtManagers");

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
                        <h2>Outlet Managers</h2>
                    </div>
                    <hr />
                    <div className={style.table}>
                        <UserManagement />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OutletManager;