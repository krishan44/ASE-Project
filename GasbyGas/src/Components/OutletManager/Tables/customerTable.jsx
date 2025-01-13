import React, { useState, useEffect } from 'react';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg';
import edit from '../../../assets/table/edit.svg';

const CustomerTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, customer: 'Zinzu Chan Lee', order: ["2.5 Kg : 2 ", " 5  Kg : 2 ", "12.5 Kg : 2"], Date: '17 Dec, 2022', Status: 'Delivered', Total: '$128.90', Tank: 'Tank 1', contact: '07723112123' },
    { id: 2, customer: 'Zinzu Chan Lee', order: ["2.5 Kg : 10", " 5  Kg : 12", "12.5 Kg : 12"], Date: '27 Aug, 2023', Status: 'Cancelled', Total: '$5350.50', Tank: 'Tank 2', contact: '07723112123' },
    { id: 3, customer: 'Zinzu Chan Lee', order: ["2.5 Kg : 23", " 5  Kg : 22", "12.5 Kg : 22"], Date: '14 Mar, 2023', Status: 'Shipped', Total: '$210.40', Tank: 'Tank 3', contact: '07723112123' },
    // Add more rows as needed
  ]);
  const [sortConfig, setSortConfig] = useState(null);

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredData = tableData.filter(row =>
    row.id.toString().toLowerCase().includes(searchValue) ||
    row.customer.toLowerCase().includes(searchValue)
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig) {
      if (sortConfig.key === 'Order') {
        const aOrderTotal = a.order.reduce((sum, item) => sum + parseInt(item.split(':')[1].trim()), 0);
        const bOrderTotal = b.order.reduce((sum, item) => sum + parseInt(item.split(':')[1].trim()), 0);
        if (aOrderTotal < bOrderTotal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aOrderTotal > bOrderTotal) return sortConfig.direction === 'asc' ? 1 : -1;
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      }
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

  return (
    <div className={style.App}>
      <main className={style.table} id="customers_table">
        <TableHeader searchValue={searchValue} handleSearch={handleSearch} />
        <TableBody data={sortedData} handleSort={handleSort} sortConfig={sortConfig} orderBodyTemplate={orderBodyTemplate} />
      </main>
    </div>
  );
};

const TableHeader = ({ searchValue, handleSearch }) => (
  <section className={style.table__header}>
    <div className={style.inputGroup}>
      <input
        type="search"
        placeholder="Search Data..."
        value={searchValue}
        className={style.searchField}
        onChange={handleSearch}
      />
      <img src={search} alt="search icon" className={style.searchIcon}/>
    </div>
  </section>
);

const TableBody = ({ data, handleSort, sortConfig, orderBodyTemplate }) => (
  <section className={style.table__body}>
    <table>
      <thead>
        <tr>
          {['Token', 'Customer', 'Order', 'Order Date', 'Status', 'Total', 'Tank', ' '].map(key => (
            <th
              key={key}
              onClick={() => handleSort(key)}
              className={sortConfig?.key === key ? sortConfig.direction : ''}
              style={{ textTransform: 'none' }} // Ensure text transform is none
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
              <p className={`${style.status} ${style[row.Status.toLowerCase()]}`}>{row.Status}</p>
            </td>
            <td>{row.Total}</td>
            <td>{row.Tank}</td>
            <td>
              <img src={edit} alt="edit icon" className={style.editIcon}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default CustomerTable;
