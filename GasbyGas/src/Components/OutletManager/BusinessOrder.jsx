import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import style from "./customerOrders.module.css";
import MainDashboard from "./MainDashboard";
import edit from "../../assets/table/edit.svg";
import BusinessTable from "./Tables/Business"

function BusinessOrders(){
    const [selectedOption, setSelectedOption] = useState("Business Orders"); 
    const [selectedOrders, setSelectedOrders] = useState(null);
    

    return(
        <>
            <div className={style.customerOrders}>
                <div className={style.sidepanel}>
                    <MainDashboard selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                </div>
                <div className={style.customerOrderContent}>
                    <div className={style.sectionName}>
                        <h2>Business Orders</h2>
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
                    <BusinessTable/>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default BusinessOrders;