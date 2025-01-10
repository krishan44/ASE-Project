import style from "./Overview.module.css"
import MainDashboard from "./MainDashboard"
import order from "../../assets/Pannel/order.svg";
import Customer from "../../assets/Pannel/customer.svg";
import dashboard from "../../assets/Pannel/dashboard.svg";
import report from "../../assets/Pannel/report.svg";
import stock from "../../assets/Pannel/stock.svg";
import orderstock from "../../assets/Pannel/orderstock.svg";
import waitlist from "../../assets/Pannel/waitlist.svg";

function Overview(){
    return(
        <>
            <div className={style.Overview}>
                <div className={style.sidePannel}>
                    <MainDashboard/>
                </div>
                <div className={style.overviewContent}>
                    <h2 className={style.sectionName}>Overview</h2>
                    <div className={style.cards}>
                        <div className={style.card}>
                            <img src={order} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Total Customer Orders</span>
                            <span className={style.number}>43</span>
                            <span>New Orders This Month</span>
                            <span className={style.newOrders}><span>+</span>43</span>
                        </div>
                        <div className={style.card}>
                            <img src={order} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Total Business Orders</span>
                            <span className={style.number}>43</span>
                            <span>New Orders This Month</span>
                            <span className={style.newOrders}><span>+</span>43</span>
                        </div>
                        <div className={style.card}>
                            <img src={order} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Total Stock Orders</span>
                            <span className={style.number}>43</span>
                            <span>New Orders This Month</span>
                            <span className={style.newOrders}><span>+</span>43</span>
                        </div>
                        <div className={style.card}>
                            <img src={order} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Waitlist Number</span>
                            <span className={style.number}>43</span>
                            <span>New Orders This Month</span>
                            <span className={style.newOrders}><span>+</span>43</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview

