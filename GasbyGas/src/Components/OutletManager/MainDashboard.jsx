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
                        <div className={style.optionContainer}>
                            <img src={order} alt="" className={style.panelIcon}/>
                            <span className={`${style.option} ${style.selected}`}>Overview</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={order} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Customer Orders</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={order} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Business Orders</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={order} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Stock Orders</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={order} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Waitlist Manage</span>
                        </div>
                        <div className={style.optionContainer}>
                            <img src={order} alt="" className={style.panelIcon}/>
                            <span className={style.option}>Account Manage</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainDashboard