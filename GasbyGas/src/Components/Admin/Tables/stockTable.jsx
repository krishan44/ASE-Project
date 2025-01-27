import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg';

// Move TableHeader component outside
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

// Move TableBody component outside
const TableBody = ({
  data,
  handleSort,
  sortConfig,
  handleView,
  getStatusStyle,
  editingStatus,
  setEditingStatus,
  handleStatusChange,
  statusOptions
}) => (
  <section className={style.table__body}>
    <table>
      <thead>
        <tr>
          {['Order ID', 'Outlet Name', 'Order', 'Ordered On', 'Status', 'Total'].map((key) => (
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
            key={row.orderid}
            style={{ backgroundColor: index % 2 === 0 ? 'transparent' : '#0000000b' }}
          >
            <td>{row.orderid}</td>
            <td>{row.outname}</td>
            <td>
              <button className={style.viewBtn} onClick={() => handleView('Orders', row)}>
                View
              </button>
            </td>
            <td>{row.orderedon}</td>
            <td>
              <div className={style.statusContainer}>
                {editingStatus === row.orderid ? (
                  <select
                    className={style.statusSelect}
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.orderid, e.target.value)}
                    onBlur={() => setEditingStatus(null)}
                    autoFocus
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p
                    className={`${style.status} ${style[row.status.toLowerCase()]}`}
                    style={getStatusStyle(row.status)}
                    onClick={() => setEditingStatus(row.orderid)}
                  >
                    {row.status}
                  </p>
                )}
              </div>
            </td>
            <td>{row.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

const StockTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);

  // Define available status options
  const statusOptions = ['Arrived', 'Confirmed', 'Cancelled', 'Delayed', 'Pending'];

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'outlet-orders-admin';
      console.log('Fetching all orders');
  
      try {
        const response = await fetch(`http://localhost:5001/${endpoint}`);
        console.log('Response received:', response);
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch data. Response status:', response.status, 'Response text:', errorText);
          throw new Error(`Failed to fetch data: ${response.status} ${errorText}`);
        }
  
        const data = await response.json();
        console.log('Data received:', data);
  
        if (data.message) {
          console.log('No orders found');
          setTableData([]);
          setError(data.message);
        } else {
          console.log('Orders data set to state');
          setTableData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/update-order-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setTableData(prevData =>
        prevData.map(row =>
          row.orderid === orderId ? { ...row, status: newStatus } : row
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setEditingStatus(null);
    }
  };

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

  const formatOrderDetails = (row) => {
    const orderDetails = [];
    
    if (row.twoandhalfkg > 0) {
      orderDetails.push(`2.5 KG Cylinders: ${row.twoandhalfkg}`);
    }
    if (row.fivekg > 0) {
      orderDetails.push(`5 KG Cylinders: ${row.fivekg}`);
    }
    if (row.twelevekg > 0) {
      orderDetails.push(`12.5 KG Cylinders: ${row.twelevekg}`);
    }
    if (row.thirtysevenkg > 0) {
      orderDetails.push(`37.5 KG Cylinders: ${row.thirtysevenkg}`);
    }

    return orderDetails.length > 0 ? orderDetails : ['No cylinders ordered'];
  };

  const handleView = (type, data) => {
    if (type === 'Orders') {
      const orderDetails = formatOrderDetails(data);
      setPopupData(orderDetails);
    } else {
      setPopupData(Array.isArray(data) ? data : [data]);
    }
    setPopupType(type);
  };

  const closePopup = () => {
    setPopupData(null);
    setPopupType(null);
  };

  const filteredData = tableData.filter((row) => {
    const normalizedSearch = searchValue.toLowerCase().trim();
    const validStatuses = ['arrived', 'waiting', 'pending', 'confirmed'];

    return (
      (row.orderid.toString().toLowerCase().includes(normalizedSearch) ||
        row.outname.toLowerCase().includes(normalizedSearch)) &&
      validStatuses.includes(row.status.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig) {
      const { key, direction } = sortConfig;
      let aValue = a[key];
      let bValue = b[key];

      if (key === 'orderid') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      } else if (key === 'createdon' || key === 'orderedon' || key === 'completedon') {
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
      case 'confirmed':
        return { backgroundColor: '#2196F3' };
      case 'delayed':
        return { backgroundColor: '#FF9800' };
      case 'pending':
        return { backgroundColor: '#FFC107' };
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
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            handleStatusChange={handleStatusChange}
            statusOptions={statusOptions}
          />
        )}
      </main>

      {popupData && (
        <div className={style.popupOverlay}>
          <div className={style.popup}>
            <div className={style.popupContent}>
              <h3 className={style.popupTitle}>
                {popupType === 'Orders' ? 'Order Details' : 'Tank Details'}
              </h3>
              <div className={style.popupDetails}>
                {popupData.map((item, index) => (
                  <p key={index} className={style.popupItem}>{item}</p>
                ))}
              </div>
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

// Define PropTypes
TableHeader.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  handleSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object,
  handleView: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func.isRequired,
  editingStatus: PropTypes.number,
  setEditingStatus: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  statusOptions: PropTypes.array.isRequired,
};

export default StockTable;