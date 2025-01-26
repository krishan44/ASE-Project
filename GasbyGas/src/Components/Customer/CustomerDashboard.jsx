import { Link } from 'react-router-dom';
import style from "./CustomerDashboard.module.css";
import order from "../../assets/Pannel/order.svg";
import Customer from "../../assets/Pannel/customer.svg";
import dashboard from "../../assets/Pannel/dashboard.svg";
import report from "../../assets/Pannel/report.svg";
import stock from "../../assets/Pannel/stock.svg";
import orderstock from "../../assets/Pannel/orderstock.svg";
import waitlist from "../../assets/Pannel/waitlist.svg";
import logOut from "../../assets/Pannel/logOut.svg";


function CustomerDashboard({ selectedOption, setSelectedOption }) {

  return (
    <div className={style.Maindashboard}>
      <div className={style.sidePannel}>
        <div className={style.head}>
          <div className={style.logo}>GasbyGas</div>
          <div><span>User</span></div>
        </div>

        <div className={style.routes}>
          <Link to="/customer/overview" className={style.optionContainer} onClick={() => setSelectedOption("Overview")}>
            <img src={dashboard} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Overview" ? style.selected : ""}`}>My Orders</span>
          </Link>
          <Link to="/customer/order_history" className={style.optionContainer} onClick={() => setSelectedOption("OrderHistory")}>
            <img src={order} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "OrderHistory" ? style.selected : ""}`}>Order History</span>
          </Link>
          <Link to="/customer/profile" className={style.optionContainer} onClick={() => setSelectedOption("Profile")}>
            <img src={order} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Profile" ? style.selected : ""}`}>My Profile</span>
          </Link>
          <div className={style.Logout}>
            <span>Logout</span>
            <img src={logOut} className={style.logOutI} alt="LogOut icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;