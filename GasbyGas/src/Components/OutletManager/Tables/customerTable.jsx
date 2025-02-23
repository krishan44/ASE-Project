import React, { useState, useEffect } from 'react';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg';
import edit from '../../../assets/table/edit.svg';

const CustomerTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve branch from localStorage
  const branchName = localStorage.getItem('branch');
  console.log('Branch Name:', branchName);  

  // Fetch data from Flask backend
  useEffect(() => {
    if (!branchName) {
      setError('Branch information not found in localStorage.');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/customer-orders/${branchName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTableData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [branchName]); // Re-fetch data if branch changes

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/customer-orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          completeddate: newStatus.toLowerCase() === 'completed' ? new Date().toISOString() : null,
          completeddate: newStatus.toLowerCase() === 'arrived' ? new Date().toISOString() : null,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
  
      // Update the local state if the API call is successful
      setTableData((prevData) =>
        prevData.map((row) =>
          row.id === id ? { ...row, Status: newStatus, completeddate: newStatus.toLowerCase() === 'completed' ? new Date().toISOString() : row.completeddate } : row
        )
      );
      setEditingStatusId(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again later.');
    }
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

  // Filter data based on search value and exclude 'Cancelled', 'Completed', and 'Waiting' statuses
  const filteredData = tableData.filter((row) => {
    const normalizedSearch = searchValue.toLowerCase().trim();
    const excludedStatuses = ['cancelled', 'completed', 'waiting']; // Statuses to exclude
    return (
      (row.id.toString().toLowerCase().includes(normalizedSearch) ||
        row.customer.toLowerCase().includes(normalizedSearch)) &&
      !excludedStatuses.includes(row.Status.toLowerCase()) // Exclude rows with these statuses
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

  // Get status style based on status value
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { backgroundColor: '#4CAF50' }; // Green for Completed
      case 'cancelled':
        return { backgroundColor: '#F44336' }; // Red for Cancelled
      case 'arrived':
        return { backgroundColor: '#4379F2' }; // Blue for Arrived
      case 'confirmed':
        return { backgroundColor: '#FFC107' }; // Yellow for Confirmed
      case 'waiting':
        return { backgroundColor: '#9E9E9E' }; // Gray for Waiting
      case 'pending':
        return { backgroundColor: '#FF9800' }; // Orange for Pending
      default:
        return {};
    }
  };

  return (
    <div className={style.App}>
      <main className={style.table} id="customers_table">
        <TableHeader searchValue={searchValue} handleSearch={handleSearch} />
        <TableBody
          data={sortedData}
          handleSort={handleSort}
          sortConfig={sortConfig}
          handleStatusChange={handleStatusChange}
          editingStatusId={editingStatusId}
          setEditingStatusId={setEditingStatusId}
          handleView={handleView}
          getStatusStyle={getStatusStyle} // Pass getStatusStyle as a prop
        />
      </main>

      {/* Popup for Orders and Tank */}
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

const TableBody = ({
  data,
  handleSort,
  sortConfig,
  handleStatusChange,
  editingStatusId,
  setEditingStatusId,
  handleView,
  getStatusStyle, // Receive getStatusStyle as a prop
}) => (
  <section className={style.table__body}>
    <table>
      <thead>
        <tr>
          {['Token', 'Customer', 'Order', 'Order Date', 'Status', 'Total', 'Tank', ' '].map((key) => (
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
                  style={getStatusStyle(row.Status)} // Use getStatusStyle here
                  onClick={() => setEditingStatusId(row.id)}
                >
                  {row.Status}
                </p>
                {editingStatusId === row.id && (
                  <div className={style.statusOptions}>
                    {['Completed', 'Cancelled', 'Arrived','Confirmed','Waiting'] // Include all statuses in the dropdown
                      .filter((status) => status.toLowerCase() !== row.Status.toLowerCase()) // Exclude the current status
                      .map((status) => (
                        <p
                          key={status}
                          className={`${style.status} ${style[status.toLowerCase()]}`}
                          style={getStatusStyle(status)} // Use getStatusStyle here
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
            <td>
              <button className={style.viewBtn} onClick={() => handleView('Tank', Array.isArray(row.Tank) ? row.Tank : [row.Tank])}>
                View
              </button>
            </td>
            <td>
              <img
                src={edit}
                alt="edit icon"
                className={style.editIcon}
                onClick={() => setEditingStatusId(row.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default CustomerTable;