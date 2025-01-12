import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import style from "./customerOrders.module.css"
import MainDashboard from "./MainDashboard"

function customerOrders(){
    const [selectedOption, setSelectedOption] = useState("Customer Orders"); 
    const orders = [
        { id: 1, customer_name: "John Doe", order_date: "2023-01-01", status: "Pending", amount: "$100.00" },
        { id: 2, customer_name: "Jane Smith", order_date: "2023-01-02", status: "Completed", amount: "$150.00" },
        { id: 3, customer_name: "Alice Johnson", order_date: "2023-01-03", status: "Pending", amount: "$200.00" },
        { id: 4, customer_name: "Bob Brown", order_date: "2023-01-04", status: "Cancelled", amount: "$50.00" },
        { id: 5, customer_name: "Charlie Davis", order_date: "2023-01-05", status: "Completed", amount: "$300.00" },
        { id: 6, customer_name: "Diana Evans", order_date: "2023-01-06", status: "Pending", amount: "$400.00" }
    ];

    return(
        <>
            <div className={style.customerOrders}>
                <div className={style.sidepanel}>
                    <MainDashboard selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                </div>
                <div className={style.customerOrderContent}>
                    <div className={style.sectionName}>
                        <h2>Customer Orders</h2>
                    </div>
                    <hr />
                    <div className={style.btns}>
                        <div>
                            <button className={style.addBtn}>Add</button>
                            <button className={style.delBtn}>Delete</button>
                        </div>
                            <button className={style.UpdateBtn}>Update</button>
                    </div>
                    <div className={style.table}>
                        <DataTable value={orders} paginator rows={6}>
                            <Column field="id" header="ID" sortable></Column>
                            <Column field="customer_name" header="Customer Name" sortable></Column>
                            <Column field="order_date" header="Order Date" sortable></Column>
                            <Column field="status" header="Status" sortable></Column>
                            <Column field="amount" header="Amount" sortable></Column>
                            <Column header="Actions" body={(rowData) => (
                                <>
                                    <button className={style.addBtn}>Edit</button>
                                    <button className={style.delBtn}>Delete</button>
                                </>
                            )}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default customerOrders