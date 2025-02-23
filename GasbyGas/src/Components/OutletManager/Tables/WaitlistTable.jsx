import React, { useState, useEffect } from 'react';
import style from './WaitTable.module.css';
import search from '../../../assets/table/search.svg';

const WaitlistTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatusRowId, setActiveStatusRowId] = useState(null);

  // Retrieve branch name from localStorage
  const branchName = localStorage.getItem('branch');

  // Fetch waitlist orders based on the logged-in outlet's branch
  useEffect(() => {
    if (!branchName) {
      setError('Branch information not found in localStorage.');
      setIsLoading(false);
      return;
    }

    const fetchWaitlistOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5001/waitlist-orders/${branchName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTableData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching waitlist orders:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaitlistOrders();
  }, [branchName]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // Handle search input
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle view button click
  const handleView = (type, data) => {
    setPopupType(type);
    setPopupData(data);
  };

  // Close popup
  const closePopup = () => {
    setPopupData(null);
    setPopupType(null);
  };

  // Handle status change
  const handleStatusChange = async (rowId, newStatus) => {
    try {
      // Find the row in the table data
      const row = tableData.find((row) => row.id === rowId);
      if (!row) {
        throw new Error('Order not found');
      }
  
      // Determine if the order is a customer order or business order
      const isCustomerOrder = row.type === 'customer'; // Use the 'type' field to determine the order type
      const endpoint = isCustomerOrder
        ? `http://localhost:5001/customer-orders/${rowId}` // Endpoint for customer orders
        : `http://localhost:5001/business-orders/${rowId}`; // Endpoint for business orders
  
      // Make the API call to update the status
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
  
      // Update the local state if the API call is successful
      const updatedData = tableData.map((row) =>
        row.id === rowId ? { ...row, Status: newStatus } : row
      );
      setTableData(updatedData);
      setActiveStatusRowId(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again later.');
    }
  };

  
  // Toggle status options
  const toggleStatusOptions = (rowId) => {
    setActiveStatusRowId(activeStatusRowId === rowId ? null : rowId);
  };

  // Filter data based on search value
  const filteredData = tableData.filter((row) => {
    const normalizedSearch = searchValue.toLowerCase().trim();
    return (
      row.id.toString().toLowerCase().includes(normalizedSearch) ||
      row.customer.toLowerCase().includes(normalizedSearch)
    );
  });

  // Sort data based on sort configuration
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

  return (
    <div className={style.App}>
      <main className={style.table} id="customers_table">
        <TableHeader searchValue={searchValue} handleSearch={handleSearch} />
        <TableBody
          data={sortedData}
          handleSort={handleSort}
          sortConfig={sortConfig}
          handleView={handleView}
          handleStatusChange={handleStatusChange}
          toggleStatusOptions={toggleStatusOptions}
          activeStatusRowId={activeStatusRowId}
        />
      </main>

      {/* Popup for Orders */}
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

// TableHeader Component (unchanged)
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

// Get status class based on status value
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'cancelled':
      return style.cancelled;
    case 'confirmed':
      return style.confirmed;
    case 'waiting':
      return style.waiting;
    default:
      return '';
  }
};

// TableBody Component
const TableBody = ({
  data,
  handleSort,
  sortConfig,
  handleView,
  handleStatusChange,
  toggleStatusOptions,
  activeStatusRowId
}) => (
  <section className={style.table__body}>
    <table>
      <thead>
        <tr>
          {['Order ID', 'Customer', 'Order', 'Order Date', 'Status', 'Total'].map((key) => (
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
                  className={`${style.status} ${getStatusClass(row.Status)}`}
                  onClick={() => toggleStatusOptions(row.id)}
                >
                  {row.Status}
                </p>
                {activeStatusRowId === row.id && (
                  <div className={style.statusOptions}>
                    {['Completed', 'Cancelled', 'Arrived', 'Confirmed'].map((status) => (
                      <p
                        key={status}
                        className={`${style.status} ${getStatusClass(status)}`}
                        onClick={() => handleStatusChange(row.id, status)}
                      >
                        {status}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </td>
            <td>{row.Total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default WaitlistTable;