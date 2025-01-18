import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import style from "./customerOrders.module.css";
import MainDashboard from "./MainDashboard";
import edit from "../../assets/table/edit.svg";
import StockTable from "./Tables/stockTable"

function StockOrders(){
    const [selectedOption, setSelectedOption] = useState("Stock Orders"); 
    const [selectedOrders, setSelectedOrders] = useState(null);
    

    return(
        <>
            <div className={style.customerOrders}>
                <div className={style.sidepanel}>
                    <MainDashboard selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                </div>
                <div className={style.customerOrderContent}>
                    <div className={style.sectionName}>
                        <h2>Stock Orders</h2>
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
                    <StockTable/>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default StockOrders;