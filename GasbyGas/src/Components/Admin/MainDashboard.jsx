import { Link } from 'react-router-dom';
import style from "./MainDashboard.module.css";
import order from "../../assets/Pannel/order.svg";
import Customer from "../../assets/Pannel/customer.svg";
import dashboard from "../../assets/Pannel/dashboard.svg";
import report from "../../assets/Pannel/report.svg";
import stock from "../../assets/Pannel/stock.svg";
import orderstock from "../../assets/Pannel/orderstock.svg";
import waitlist from "../../assets/Pannel/waitlist.svg";
import logOut from "../../assets/Pannel/logOut.svg";
// import { useAuth } from '../../Components/AdminAuth/AuthContext';

function MainDashboard({ selectedOption, setSelectedOption }) {

  // const { logout } = useAuth();

  return (
    <div className={style.Maindashboard}>
      <div className={style.sidePannel}>
        <div className={style.head}>
          <div className={style.logo}>GasbyGas</div>
          <div><span>Admin</span></div>
        </div>

        <div className={style.routes}>
          <Link to="/admin/dashboard" className={style.optionContainer} onClick={() => setSelectedOption("Overview")}>
            <img src={dashboard} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Overview" ? style.selected : ""}`}>Overview</span>
          </Link>
          <Link to="/admin/stock_requests" className={style.optionContainer} onClick={() => setSelectedOption("Stock Orders")}>
            <img src={stock} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Stock Orders" ? style.selected : ""}`}>Order Requests</span>
          </Link>
          <Link to="/admin/account_manage" className={style.optionContainer} onClick={() => setSelectedOption("Account Manage")}>
            <img src={Customer} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Account Manage" ? style.selected : ""}`}>Account Manage</span>
          </Link>
          <Link to="/admin/reports" className={style.optionContainer} onClick={() => setSelectedOption("Report Generation")}>
            <img src={report} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Report Generation" ? style.selected : ""}`}>Report Generation</span>
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

export default MainDashboard;