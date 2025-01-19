import React, { useState } from 'react';
import { Box, Typography, Stack, TextField } from '@mui/material';
import WaitlistTable from "./Tables/WaitlistTable"
import MainDashboard from "./MainDashboard";
import style from "./customerOrders.module.css";

function Waitlist(){
    const [selectedOption, setSelectedOption] = useState("Waitlist Manage"); 
    const [selectedOrders, setSelectedOrders] = useState(null);
    

    return(
        <>
            <div className={style.customerOrders}>
                <div className={style.sidepanel}>
                    <MainDashboard selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                </div>
                <div className={style.customerOrderContent}>
                    <div className={style.sectionName}>
                        <h2>Waitlist Orders</h2>
                    </div>
                    <hr />
                    <div className={style.btns}>
                        <div>
                            <button className={style.addBtn}>Add</button>
                            <button className={style.UpdateBtn}>Save</button>
                        </div>
                            <button className={style.delBtn}>Delete</button>
                    </div>
                    <div className={style.table}>
                    <WaitlistTable/>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Waitlist;
