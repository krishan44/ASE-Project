import { useState } from "react";
import style from "./Overview.module.css"
import MainDashboard from "./MainDashboard"
import order from "../../assets/Pannel/order.svg";
import stock from "../../assets/Pannel/stock.svg";
import orderstock from "../../assets/Pannel/orderstock.svg";
import waitlist from "../../assets/Pannel/waitlist.svg";
import PointStylingChart from "./PointStylingChart";

function Overview() {
    const [selectedOption, setSelectedOption] = useState("Overview"); 
    return (
        <>
            <div className={style.Overview}>
                <div className={style.sidePannel}>
                    <MainDashboard selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                </div>
                <div className={style.overviewContent}>
                    <div className={style.SectionHead}>
                    </div>
                        <h2 className={style.sectionName}>Overview</h2>
                        <hr />
                    
                    <div className={style.cards}>
                        <div className={style.card}>
                            <img src={order} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Total Customer Orders</span>
                            <span className={style.number}>43</span>
                            <span>New Orders This Month</span>
                            <span className={style.newOrders}><span>+</span>43</span>
                        </div>
                        <div className={style.card}>
                            <img src={orderstock} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Total Business Orders</span>
                            <span className={style.number}>121</span>
                            <span>New Orders This Month</span>
                            <span className={style.newOrders}><span>+</span>32</span>
                        </div>
                        <div className={style.card}>
                            <img src={stock} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Total Stock Orders</span>
                            <span className={style.number}>43</span>
                            <span>Next Order Day</span>
                            <span className={style.newOrders}>Monday</span>
                        </div>
                        <div className={style.card}>
                            <img src={waitlist} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Waitlist Number</span>
                            <span className={style.number}>81</span>
                            <span>New Orders This Month</span>
                            <span className={style.newOrders}><span>+</span>23</span>
                        </div>
                    </div>
                    <div className={style.chartContainer}>
                        <h3 className={style.chartTitle}>Monthly Sales Data</h3>
                        <PointStylingChart />  
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview