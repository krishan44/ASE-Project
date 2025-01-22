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


function MainDashboard({ selectedOption, setSelectedOption }) {

  

  return (
    <div className={style.Maindashboard}>
      <div className={style.sidePannel}>
          <div className={style.head}>
            <div className={style.logo}>GasbyGas</div>
            <div><span>Outlet</span></div>
          </div>
        
        <div className={style.routes}>
          <Link to="/dashboard" className={style.optionContainer} onClick={() => setSelectedOption("Overview")}>
            <img src={dashboard} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Overview" ? style.selected : ""}`}>Overview</span>
          </Link>
          <Link to="/orders" className={style.optionContainer} onClick={() => setSelectedOption("Customer Orders")}>
            <img src={order} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Customer Orders" ? style.selected : ""}`}>Customer Orders</span>
          </Link>
          <Link to="/BusinessOrders" className={style.optionContainer} onClick={() => setSelectedOption("Business Orders")}>
            <img src={orderstock} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Business Orders" ? style.selected : ""}`}>Business Orders</span>
          </Link>          
          <Link to="/StockOrders" className={style.optionContainer} onClick={() => setSelectedOption("Stock Orders")}>
            <img src={stock} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Stock Orders" ? style.selected : ""}`}>Stock Orders</span>
          </Link>          
          <Link to="/Waitlist Manage" className={style.optionContainer} onClick={() => setSelectedOption("Waitlist Manage")}>
            <img src={waitlist} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Waitlist Manage" ? style.selected : ""}`}>Waitlist Manage</span>
          </Link>  
          <Link to="/manage_accounts" className={style.optionContainer} onClick={() => setSelectedOption("Account Manage")}>
          <img src={Customer} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Account Manage" ? style.selected : ""}`}>Account Manage</span>
          </Link>
          <div className={style.optionContainer} onClick={() => setSelectedOption("Report Generation")}>
            <img src={report} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Report Generation" ? style.selected : ""}`}>Report Generation</span>
          </div>
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