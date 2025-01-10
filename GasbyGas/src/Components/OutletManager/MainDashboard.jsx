import style from "./MainDashboard.module.css"
import order from "../../assets/Pannel/order.svg";
import Customer from "../../assets/Pannel/customer.svg";
import dashboard from "../../assets/Pannel/dashboard.svg";
import report from "../../assets/Pannel/report.svg";
import stock from "../../assets/Pannel/stock.svg";
import orderstock from "../../assets/Pannel/orderstock.svg";
import waitlist from "../../assets/Pannel/waitlist.svg";
import logOut from "../../assets/Pannel/logOut.svg";

function MainDashboard(){
    return(
        <>
            <div className={style.Maindashboard}>
                <div className={style.sidePannel}>
                    <div className={style.head}>
                        <div className={style.logo}>GasbyGas</div>
                        <span>Outlet</span>
                    </div>
                    <div className={style.routes}>
                        <div className={style.optionContainer}>
                            <img src={dashboard} alt="" className={style.panelIcon}/>
                            <span className={`${style.option}`}>Overview</span> 
                            {/* selected is using to show that this section has been selected ${style.selected}  */}
                        </div>
                        <div className={style.optionContainer}>
                            <img src={order} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Customer Orders</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={orderstock} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Business Orders</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={stock} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Stock Orders</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={waitlist} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Waitlist Manage</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={Customer} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Account Manage</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={report} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Report Generation</span>
                        </div>
                    </div>
                    <div className={style.Logout}>
                        <span >Logout </span>
                        <img src={logOut} className={style.logOutI} alt="LogOut icon" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainDashboard