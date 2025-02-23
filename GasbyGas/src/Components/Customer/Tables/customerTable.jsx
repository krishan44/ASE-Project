import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg';

const CustomerTable = ({ onOrderStatusChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const customerid = localStorage.getItem('customerId');
      const businessid = localStorage.getItem('businessId');

      console.log('Customer ID from localStorage:', customerid);
      console.log('Business ID from localStorage:', businessid);

      if (!customerid && !businessid) {
        console.error("Customer ID or Business ID not found in localStorage");
        setError('Customer ID or Business ID not found. Please log in again.');
        setIsLoading(false);
        return;
      }

      const endpoint = businessid ? `business-orders/${businessid}` : `customer-orders/${customerid}`;
      console.log(`Fetching orders for ${businessid ? 'business' : 'customer'} ID: ${businessid || customerid}`);

      try {
        const response = await fetch(`http://localhost:5001/${endpoint}`);
        console.log("Response received:", response);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch data. Response status:", response.status, "Response text:", errorText);
          throw new Error(`Failed to fetch data: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log("Data received:", data);

        if (data.message) {
          console.log("No orders found for this user");
          setTableData([]);
          setError(data.message);
          onOrderStatusChange(false);
        } else {
          console.log("Orders data set to state");
          setTableData(data);
          
          // Check for pending or waiting orders
          const hasPendingOrWaiting = data.some(order => 
            order.Status.toLowerCase() === 'pending' || 
            order.Status.toLowerCase() === 'waiting'
          );
          onOrderStatusChange(hasPendingOrWaiting);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to fetch orders. Please try again.');
        onOrderStatusChange(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [onOrderStatusChange]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleView = (type, data) => {
    setPopupType(type);
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupData(null);
    setPopupType(null);
  };

  const filteredData = tableData.filter((row) => {
    const normalizedSearch = searchValue.toLowerCase().trim();
    const validStatuses = ['arrived', 'waiting', 'pending', 'confirmed'];

    return (
      (row.id.toString().toLowerCase().includes(normalizedSearch) ||
        row.customer.toLowerCase().includes(normalizedSearch)) &&
      validStatuses.includes(row.Status.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig) {
      const { key, direction } = sortConfig;
      let aValue = a[key];
      let bValue = b[key];

      if (key === 'id') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      } else if (key === 'Date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'picked':
        return { backgroundColor: '#4CAF50' };
      case 'cancelled':
        return { backgroundColor: '#F44336' };
      case 'arrived':
        return { backgroundColor: '#4379F2' };
      case 'pending':
        return { backgroundColor: '#FFA500' };
      case 'waiting':
        return { backgroundColor: '#FFD700' };
      default:
        return {};
    }
  };

  return (
    <div className={style.App}>
      <main className={style.table} id="customers_table">
        <TableHeader searchValue={searchValue} handleSearch={handleSearch} />
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <TableBody
            data={sortedData}
            handleSort={handleSort}
            sortConfig={sortConfig}
            handleView={handleView}
            getStatusStyle={getStatusStyle}
          />
        )}
      </main>

      {popupData && (
        <div className={style.popupOverlay}>
          <div className={style.popup}>
            <div className={style.popupContent}>
              <h3>{popupType === 'Orders' ? 'Order Details' : 'Tank Details'}</h3>
              {popupType === 'Orders' ? (
                popupData.map((item, index) => <p key={index}>{item}</p>)
              ) : (
                Array.isArray(popupData) ? (
                  popupData.map((item, index) => <p key={index}>{item}</p>)
                ) : (
                  <p>{popupData}</p>
                )
              )}
              <button onClick={closePopup} className={style.closeBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CustomerTable.propTypes = {
  onOrderStatusChange: PropTypes.func.isRequired,
};

const TableHeader = ({ searchValue, handleSearch }) => (
  <section className={style.table__header}>
    <div className={style.inputGroup}>
      <input
        type="search"
        placeholder="Search By ID..."
        value={searchValue}
        className={style.searchField}
        onChange={handleSearch}
      />
      <img src={search} alt="search icon" className={style.searchIcon} />
    </div>
  </section>
);

TableHeader.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

const TableBody = ({
  data,
  handleSort,
  sortConfig,
  handleView,
  getStatusStyle,
}) => (
  <section className={style.table__body}>
    <table>
      <thead>
        <tr>
          {['Token', 'Customer', 'Order', 'Order Date', 'Status', 'Total', 'Tank'].map((key) => (
            <th
              key={key}
              onClick={() => handleSort(key)}
              className={sortConfig?.key === key ? sortConfig.direction : ''}
              style={{ textTransform: 'none' }}
            >
              {key}
              <span className={style.iconArrow}>
                {sortConfig?.key === key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={row.id}
            style={{ backgroundColor: index % 2 === 0 ? 'transparent' : '#0000000b' }}
          >
            <td>{row.id}</td>
            <td>{row.customer}</td>
            <td>
              <button className={style.viewBtn} onClick={() => handleView('Orders', row.order)}>
                View
              </button>
            </td>
            <td>{row.Date}</td>
            <td>
              <div className={style.statusContainer}>
                <p
                  className={`${style.status} ${style[row.Status.toLowerCase()]}`}
                  style={getStatusStyle(row.Status)}
                >
                  {row.Status}
                </p>
              </div>
            </td>
            <td>{row.Total}</td>
            <td>
              <button className={style.viewBtn} onClick={() => handleView('Tank', Array.isArray(row.Tank) ? row.Tank : [row.Tank])}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  handleSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object,
  handleView: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func.isRequired,
};

export default CustomerTable;