import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import style from './StockTable.module.css';
import search from '../../../assets/table/search.svg';
const StockTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, customer: 'Zinzu Chan Lee', order: ["2.5 Kg : 2 ", " 5  Kg  : 2 ", "12.5 Kg : 2"], Date: '2022-12-17', Status: 'Delayed', Total: '$128.90', DeliverDate: '2022-12-17'},
    { id: 2, customer: 'Chan Lee', order: ["2.5 Kg : 10", " 5  Kg : 12", "12.5 Kg : 12"], Date: '2023-08-27', Status: 'Cancelled', Total: '$5350.50' , DeliverDate: '2022-12-17'},
    { id: 3, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '2023-03-14', Status: 'Confirmed', Total: '$210.40', DeliverDate: '2022-12-17'},
    { id: 4, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '2023-03-14', Status: 'Confirmed', Total: '$210.40', DeliverDate: '2022-12-17' },
    { id: 5, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '2023-03-14', Status: 'Delivered', Total: '$210.40', DeliverDate: '2022-12-17' },
  ]);
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
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

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  const handleDateChange = (id, newDate) => {
    setTableData(prevData =>
      prevData.map(row => 
        row.id === id ? { ...row, DeliverDate: newDate } : row
      )
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setTableData(prevData =>
      prevData.map(row => 
        row.id === id ? { ...row, Status: newStatus } : row
      )
    );
  };

  const closePopup = () => {
    setSelectedOrder(null);
  };

  const filteredData = tableData.filter(row => {
    const normalizedSearch = searchValue.toLowerCase().trim();
    return row.id.toString().toLowerCase().includes(normalizedSearch) ||
           row.customer.toLowerCase().includes(normalizedSearch);
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

      return direction === 'asc' 
        ? aValue < bValue ? -1 : 1
        : aValue > bValue ? -1 : 1;
    }
    return 0;
  });

  const OrderPopup = ({ order }) => {
    const [editDeliverDate, setDeliverDate] = useState(order.DeliverDate);
    const [editStatus, setEditStatus] = useState(order.Status);
    
    const handleSave = () => {
      handleDateChange(order.id, editDeliverDate);
      handleStatusChange(order.id, editStatus);
      closePopup();
    };

    return (
      <div className={style.popupOverlay}>
        <div className={style.popup}>
          <div className={style.popupContent}>
            <h3 className={style.popupTitle}>Order Details</h3>
            
            {/* Order items display */}
            <div className={style.orderItems}>
              {order.order.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            {/* Status Selection */}
            <div className={style.inputGroup}>
              <label>Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className={style.selectField}
              >
                {['Delivered', 'Cancelled', 'Delayed', 'Confirmed'].map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className={style.inputGroup}>
              <label>Order Date</label>
              <div className={style.dateInputContainer}>
                <input
                  type="date"
                  value={editDeliverDate}
                  onChange={(e) => setDeliverDate(e.target.value)}
                  className={style.dateField}
                />
                <Calendar className={style.calendarIcon} size={20} />
              </div>
            </div>

            {/* Customer Info */}
            <div className={style.orderInfo}>
              <div className={style.infoRow}>
                <span>Customer:</span>
                <span>{order.customer}</span>
              </div>
              <div className={style.infoRow}>
                <span>Total Amount:</span>
                <span>{order.Total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={style.buttonGroup}>
              <button onClick={closePopup} className={style.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleSave} className={style.saveBtn}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={style.App}>
      <main className={style.table} id="customers_table">
        {/* Search Header */}
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

        {/* Table Body */}
        <section className={style.table__body}>
          <table>
            <thead>
              <tr>
                {['Order ID', 'Customer', 'Order', 'Order Date', 'Status', 'Total', 'Deliver Date'].map((header) => (
                  <th
                    key={header}
                    onClick={() => handleSort(header)}
                    className={sortConfig?.key === header ? sortConfig.direction : ''}
                  >
                    <div className={style.headerCell}>
                      {header}
                      {sortConfig?.key === header && (
                        <span className={style.iconArrow}>
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.customer}</td>
                  <td>
                    <button
                      onClick={() => handleView(row)}
                      className={style.viewBtn}
                    >
                      View
                    </button>
                  </td>
                  <td>{row.Date}</td>
                  <td>
                    <span>
                      {row.Status}
                    </span>
                  </td>
                  <td>{row.Total}</td>
                  <td>{row.DeliverDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Order Popup */}
      {selectedOrder && <OrderPopup order={selectedOrder} />}
    </div>
  );
};

export default StockTable;