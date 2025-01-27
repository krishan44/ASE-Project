import React, { useState, useEffect } from 'react';
import style from './StockTable.module.css';
import search from '../../../assets/table/search.svg';
import edit from '../../../assets/table/edit.svg';

const StockTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all outlet orders from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/outlet-orders-admin`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const rawData = await response.json();
        
        // Transform the data to match the expected structure
        const transformedData = rawData.map(item => ({
          id: item.orderid,
          customer: item.outname,
          order: [  // Create an array of order details
            `2.5kg Cylinder: ${item.twoandhalfkg}`,
            `5kg Cylinder: ${item.fivekg}`,
            `12kg Cylinder: ${item.twelevekg}`,
            `37kg Cylinder: ${item.thirtysevenkg}`
          ].filter(order => {
            // Extract the quantity from the string (e.g., "2.5kg Cylinder: 0")
            const quantity = order.split(': ')[1];
            // Only include if quantity is not 0 or null
            return quantity && quantity !== '0';
          }),
          Date: item.orderedon,  // Changed from ordereddate to orderedon
          Status: item.status,
          Total: typeof item.total === 'number' ? 
            item.total.toLocaleString('en-US', { 
              style: 'currency', 
              currency: 'LKR' 
            }) : item.total,
          createdDate: item.createdon,  // Added new fields
          completedDate: item.completedon,
          outletId: item.outid
        }));
    
        setTableData(transformedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

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

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/outlet-orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          completedon: newStatus.toLowerCase() === 'completed' ? new Date().toISOString() : null,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
  
      // Update the local state if the API call is successful
      setTableData((prevData) =>
        prevData.map((row) =>
          row.id === id ? { 
            ...row, 
            Status: newStatus, 
            completedDate: newStatus.toLowerCase() === 'completed' ? 
              new Date().toISOString().split('T')[0] : row.completedDate 
          } : row
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
    if (!row || !row.id || !row.customer || !row.Status) return false;
  
    const normalizedSearch = searchValue.toLowerCase().trim();
    const excludedStatuses = ['cancelled', 'completed', 'waiting']; 
  
    return (
      row.id.toString().toLowerCase().includes(normalizedSearch) ||
      row.customer.toLowerCase().includes(normalizedSearch)
    ) && !excludedStatuses.includes(row.Status.toLowerCase());
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
          {['Token', 'Customer', 'Order', 'Order Date', 'Status', 'Total'].map((key) => (
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
                    {['Delayed', 'Cancelled', 'Confirmed'] // Include all statuses in the dropdown
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
           
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default StockTable;