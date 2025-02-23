import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/AdminAuth/AuthContext';
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
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={style.Maindashboard}>
      <div className={style.sidePannel}>
          <div className={style.head}>
            <div className={style.logo}>GasbyGas</div>
            <div><span>Outlet</span></div>
          </div>
        
        <div className={style.routes}>
          {/* <Link to="/outlet_manager" className={style.optionContainer} onClick={() => setSelectedOption("Overview")}>
            <img src={dashboard} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Overview" ? style.selected : ""}`}>Overview</span>
          </Link> */}
          <Link to="/orders" className={style.optionContainer} onClick={() => setSelectedOption("Customer Orders")}>
            <img src={order} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Customer Orders" ? style.selected : ""}`}>Customer Orders</span>
          </Link>
          <Link to="/business_orders" className={style.optionContainer} onClick={() => setSelectedOption("Business Orders")}>
            <img src={orderstock} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Business Orders" ? style.selected : ""}`}>Business Orders</span>
          </Link>          
          <Link to="/stock_orders" className={style.optionContainer} onClick={() => setSelectedOption("Stock Orders")}>
            <img src={stock} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Stock Orders" ? style.selected : ""}`}>Stock Orders</span>
          </Link>          
          <Link to="/waitlist_manage" className={style.optionContainer} onClick={() => setSelectedOption("Waitlist Manage")}>
            <img src={waitlist} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Waitlist Manage" ? style.selected : ""}`}>Waitlist Manage</span>
          </Link>  
          <Link to="/manage_accounts" className={style.optionContainer} onClick={() => setSelectedOption("Account Manage")}>
          <img src={Customer} alt="" className={style.panelIcon} />
            <span className={`${style.option} ${selectedOption === "Account Manage" ? style.selected : ""}`}>Stock Manage</span>
          </Link>
      
          <div className={style.Logout} onClick={handleLogout}>
            <span>Logout</span>
            <img src={logOut} className={style.logOutI} alt="LogOut icon" />
          </div>
        </div>
          </div>
        </div>
  );
}

export default MainDashboard;