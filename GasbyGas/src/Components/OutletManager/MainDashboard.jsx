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
import { useAuth } from '../../Components/AdminAuth/AuthContext';

function MainDashboard({ selectedOption, setSelectedOption }) {

  const { logout } = useAuth();

  return (
    <div className={style.Maindashboard}>
      <div className={style.sidePannel}>
        <div className={style.card}>
          <div className={style.head}>
            <button onClick={logout} className={style.logOutBtn} >Logout
              <img src={logOut} className={style.logOutI} alt="LogOut icon" />
            </button>
            <div className={style.logo}>GasbyGas</div>
          </div>
        </div>
        <div className={style.routes}>
          <Link to="/" className={style.optionContainer} onClick={() => setSelectedOption("Overview")}>
            <img src={dashboard} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Overview" ? style.selected : ""}`}>Overview</span>
          </Link>
          <Link to="/orders" className={style.optionContainer} onClick={() => setSelectedOption("Customer Orders")}>
            <img src={order} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Customer Orders" ? style.selected : ""}`}>Customer Orders</span>
          </Link>
          <div className={style.optionContainer} onClick={() => setSelectedOption("Business Orders")}>
            <img src={orderstock} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Business Orders" ? style.selected : ""}`}>Business Orders</span>
          </div>
          <div className={style.optionContainer} onClick={() => setSelectedOption("Stock Orders")}>
            <img src={stock} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Stock Orders" ? style.selected : ""}`}>Stock Orders</span>
          </div>
          <div className={style.optionContainer} onClick={() => setSelectedOption("Waitlist Manage")}>
            <img src={waitlist} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Waitlist Manage" ? style.selected : ""}`}>Waitlist Manage</span>
          </div>
          <Link to="/manage_accounts" className={style.optionContainer} onClick={() => setSelectedOption("Account Manage")}>
            <img src={order} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Account Manage" ? style.selected : ""}`}>Account Manage</span>
          </Link>
          <div className={style.optionContainer} onClick={() => setSelectedOption("Report Generation")}>
            <img src={report} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Report Generation" ? style.selected : ""}`}>Report Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;