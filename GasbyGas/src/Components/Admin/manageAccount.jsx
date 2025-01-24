import { useState } from "react";
import style from "./manageAccounts.module.css";
import MainDashboard from "./MainDashboard";
import order from "../../assets/Pannel/order.svg";
import stock from "../../assets/Pannel/stock.svg";
import orderstock from "../../assets/Pannel/orderstock.svg";
import waitlist from "../../assets/Pannel/waitlist.svg";
import { useNavigate } from "react-router-dom";

function manageAccount() {
    const [selectedOption, setSelectedOption] = useState("Account Manage");
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('/customers');
    };

    const outleManager = () => {
        navigate('/outlet_manager');
    };

    return (
        <>
            <div className={style.manageAccount}>
                <div className={style.sidepanel}>
                    <MainDashboard selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                </div>
                <div className={style.manageAcoountContent}>
                    <div className={style.SectionHead}>

                    </div>
                    <h2 className={style.sectionName}>Overview</h2>
                    <hr />

                    <div className={style.cards}>
                        <div className={style.card} onClick={handleCardClick}>
                            <img src={order} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Customers</span>
                        </div>

                        <div className={style.card} onClick={outleManager}>
                            <img src={order} alt="order Icon" className={style.icon} />
                            <span className={style.cardTitle}>Outlet Managers</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default manageAccount