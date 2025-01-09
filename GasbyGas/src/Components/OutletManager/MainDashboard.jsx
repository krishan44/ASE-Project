import style from "./MainDashboard.module.css"
import order from "../../assets/Pannel/order.svg";

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
                        <span className={`${style.option} ${style.selected}`}>Overview</span>
                        <span className={style.option}>Customer Orders</span>
                        <span className={style.option}>Business Orders</span>
                        <span className={style.option}>Stock Orders</span>
                        <span className={style.option}>Waitlist Manage</span>
                        <span className={style.option}>Account Manage</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainDashboard