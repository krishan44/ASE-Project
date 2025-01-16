import React, { useState } from 'react';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg';
import edit from '../../../assets/table/edit.svg';

const CustomerTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, customer: 'Zinzu Chan Lee', order: ["2.5 Kg : 2 ", " 5  Kg  : 2 ", "12.5 Kg : 2"], Date: '17 Dec, 2022', Status: 'Picked', Total: '$128.90', Tank: 'Tank 1', contact: '07723112123' },
    { id: 2, customer: 'Chan Lee', order: ["2.5 Kg : 10", " 5  Kg : 12", "12.5 Kg : 12"], Date: '27 Aug, 2023', Status: 'Cancelled', Total: '$5350.50', Tank: 'Tank 2', contact: '07723112123' },
    { id: 3, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '14 Mar, 2023', Status: 'Arrived', Total: '$210.40', Tank: 'Tank 3', contact: '07723112123' },
    { id: 4, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '14 Mar, 2023', Status: 'Arrived', Total: '$210.40', Tank: 'Tank 3', contact: '07723112123' },
    { id: 5, customer: 'Ass Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '14 Mar, 2023', Status: 'Arrived', Total: '$210.40', Tank: 'Tank 3', contact: '07723112123' },
    // Add more rows as needed
  ]);
  const [sortConfig, setSortConfig] = useState(null);
  const [editingStatusId, setEditingStatusId] = useState(null);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusChange = (id, newStatus) => {
    setTableData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, Status: newStatus } : row
      )
    );
    setEditingStatusId(null);
  };

  const filteredData = tableData.filter(row => {
    const normalizedSearch = searchValue.toLowerCase().trim();
    return (
      row.id.toString().toLowerCase().includes(normalizedSearch) ||
      row.customer.toLowerCase().includes(normalizedSearch)
    );
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig) {
      const { key, direction } = sortConfig;
      let aValue = a[key];
      let bValue = b[key];
  
      // Handle specific cases for numbers and dates
      if (key === 'id') { // Numeric sorting for Token
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      } else if (key === 'Date') { // Date sorting for Order Date
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
  
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  

  const orderBodyTemplate = (rowData) => {
    return (
      <div className={style.orderItems}>
        {rowData.order.map((item, index) => (
          <div key={index} className={style.orderItem}>{item}</div>
        ))}
      </div>
    );
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'arrived':
        return { backgroundColor: '#4379F2' };
      case 'cancelled':
        return { backgroundColor: '#F95454' };
      default:
        return {};
    }
  };

  return (
    <div className={style.App}>
      <main className={style.table} id="customers_table">
        <TableHeader searchValue={searchValue} handleSearch={handleSearch} />
        <TableBody data={sortedData} handleSort={handleSort} sortConfig={sortConfig} orderBodyTemplate={orderBodyTemplate} getStatusStyle={getStatusStyle} handleStatusChange={handleStatusChange} editingStatusId={editingStatusId} setEditingStatusId={setEditingStatusId} />
      </main>
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
      <img src={search} alt="search icon" className={style.searchIcon}/>
    </div>
  </section>
);

const TableBody = ({ data, handleSort, sortConfig, orderBodyTemplate, getStatusStyle, handleStatusChange, editingStatusId, setEditingStatusId }) => (
  <section className={style.table__body}>
    <table>
      <thead>
        <tr>
          {['Token', 'Customer', 'Order', 'Order Date', 'Status', 'Total', 'Tank', ' '].map(key => (
            <th
              key={key}
              onClick={() => handleSort(key)}
              className={sortConfig?.key === key ? sortConfig.direction : ''}
              style={{ textTransform: 'none' }} 
            >
              {key}
              <span className={style.iconArrow}>{sortConfig?.key === key && (sortConfig.direction === 'asc' ? '↑' : '↓')}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id} style={{ backgroundColor: index % 2 === 0 ? 'transparent' : '#0000000b' }}>
            <td>{row.id}</td>
            <td>{row.customer}</td>
            <td>{orderBodyTemplate(row)}</td>
            <td>{row.Date}</td>
            <td>
              <div className={style.statusContainer}>
                <p
                  className={`${style.status} ${style[row.Status.toLowerCase()]}`}
                  style={getStatusStyle(row.Status)}
                  onMouseEnter={() => editingStatusId === row.id && setEditingStatusId(row.id)}
                >
                  {row.Status}
                </p>
                {editingStatusId === row.id && (
                  <div className={style.statusOptions}>
                    {['Picked', 'Cancelled', 'Arrived'].filter(status => status !== row.Status).map(status => (
                      <p
                        key={status}
                        className={`${style.status} ${style[status.toLowerCase()]}`}
                        style={getStatusStyle(status)}
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
            <td>{row.Tank}</td>
            <td>
              <img src={edit} alt="edit icon" className={style.editIcon} onClick={() => setEditingStatusId(row.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default CustomerTable;
