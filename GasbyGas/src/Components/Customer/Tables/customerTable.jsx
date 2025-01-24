import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg';

const CustomerTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const customerid = localStorage.getItem('customerId'); // Use 'customerId' (uppercase I)
      if (!customerid) {
        console.error("Customer ID not found in localStorage");
        setError('Customer ID not found. Please log in again.');
        setIsLoading(false);
        return;
      }

      console.log(`Fetching orders for customer ID: ${customerid}`);

      try {
        const response = await fetch(`http://localhost:5001/customer-orders/${customerid}`);
        console.log("Response received:", response);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch data. Response status:", response.status, "Response text:", errorText);
          throw new Error(`Failed to fetch data: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log("Data received:", data);

        if (data.message) {
          console.log("No orders found for this customer");
          setTableData([]);
          setError(data.message);
        } else {
          console.log("Orders data set to state");
          setTableData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    return (
      row.id.toString().toLowerCase().includes(normalizedSearch) ||
      row.customer.toLowerCase().includes(normalizedSearch)
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