import React, { useState } from 'react';
import style from './StockTable.module.css';
import search from '../../../assets/table/search.svg';
import edit from '../../../assets/table/edit.svg';

const StockTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, customer: 'Zinzu Chan Lee', order: ["2.5 Kg : 2 ", " 5  Kg  : 2 ", "12.5 Kg : 2"], Date: '17 Dec, 2022', Status: 'Delayed', Total: '$128.90'},
    { id: 2, customer: 'Chan Lee', order: ["2.5 Kg : 10", " 5  Kg : 12", "12.5 Kg : 12"], Date: '27 Aug, 2023', Status: 'Cancelled', Total: '$5350.50' },
    { id: 3, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '14 Mar, 2023', Status: 'Confirmed', Total: '$210.40'},
    { id: 4, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '14 Mar, 2023', Status: 'Confirmed', Total: '$210.40' },
    { id: 5, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '14 Mar, 2023', Status: 'Delivered', Total: '$210.40' },
  ]);
  const [sortConfig, setSortConfig] = useState(null);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [popupData, setPopupData] = useState(null); // State for popup data
  const [popupType, setPopupType] = useState(null); // State for popup type ('Orders' or 'Tank')

  // Handle search input
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setTableData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Status: newStatus } : row))
    );
    setEditingStatusId(null);
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
          handleStatusChange={handleStatusChange}
          editingStatusId={editingStatusId}
          setEditingStatusId={setEditingStatusId}
          handleView={handleView} // Pass handleView to TableBody
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
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'delayed':
      return style.delayed; // CSS class for Delayed
    case 'cancelled':
      return style.cancelled; // CSS class for Cancelled
    case 'confirmed':
      return style.confirmed; // CSS class for Confirmed
    case 'delivered':
      return style.delivered; // CSS class for Delivered
    default:
      return '';
  }
};
const TableBody = ({
  data,
  handleSort,
  sortConfig,
  handleStatusChange,
  editingStatusId,
  setEditingStatusId,
  handleView, // Receive handleView from parent
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
                  onClick={() => setEditingStatusId(row.id)}
                >
                  {row.Status}
                </p>
                {editingStatusId === row.id && (
                  <div className={style.statusOptions}>
                    {['Delivered', 'Cancelled', 'Delayed', 'Confirmed']
                      .filter((status) => status.toLowerCase() !== row.Status.toLowerCase())
                      .map((status) => (
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

export default StockTable;