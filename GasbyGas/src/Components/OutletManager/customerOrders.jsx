import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import style from "./customerOrders.module.css";
import MainDashboard from "./MainDashboard";
import edit from "../../assets/table/edit.svg";

function customerOrders(){
    const [selectedOption, setSelectedOption] = useState("Customer Orders"); 
    const orders = [
        { id: 1, customer_name: "John Doe", order: ["Item 1", "Item 2", "Item 3"], order_date: "2023-01-01", status: "Pending", amount: "$100.00" },
        { id: 2, customer_name: "Jane Smith", order: ["Item 4", "Item 5", "Item 6"], order_date: "2023-01-02", status: "Completed", amount: "$150.00" },
        { id: 3, customer_name: "Alice Johnson", order: ["Item 7", "Item 8", "Item 9"], order_date: "2023-01-03", status: "Pending", amount: "$200.00" },
        { id: 4, customer_name: "Bob Brown", order: ["Item 10", "Item 11", "Item 12"], order_date: "2023-01-04", status: "Cancelled", amount: "$50.00" },
        { id: 5, customer_name: "Charlie Davis", order: ["Item 13", "Item 14", "Item 15"], order_date: "2023-01-05", status: "Completed", amount: "$300.00" },
        { id: 6, customer_name: "Diana Evans", order: ["Item 16", "Item 17", "Item 18"], order_date: "2023-01-06", status: "Pending", amount: "$400.00" }
    ];

    const orderBodyTemplate = (rowData) => {
        return (
            <div className={style.orderItems}>
                {rowData.order.map((item, index) => (
                    <div key={index} className={style.orderItem}>{item}</div>
                ))}
            </div>
        );
    };

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
                            <Column field="order" header="Order" body={orderBodyTemplate} sortable></Column>
                            <Column field="order_date" header="Order Date" sortable></Column>
                            <Column field="status" header="Status" sortable></Column>
                            <Column field="amount" header="Amount" sortable></Column>
                            <Column header="" body={(rowData) => (
                                <>
                                    <img src={edit} alt="edit icon" className={style.editIcon}/>
                                </>
                            )}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default customerOrders;