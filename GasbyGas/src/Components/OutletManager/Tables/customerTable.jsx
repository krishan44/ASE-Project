import React, { useState, useEffect } from 'react';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg'

const CustomerTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, customer: 'Zinzu Chan Lee', email: 'Seoul', service: '17 Dec, 2022', location: 'Delivered', date: '$128.90', contact: '07723112123' },
    { id: 2, customer: 'Zinzu Chan Lee', email: 'Kathmandu', service: '27 Aug, 2023', location: 'Cancelled', date: '$5350.50', contact: '07723112123' },
    { id: 3, customer: 'Zinzu Chan Lee', email: 'Tokyo', service: '14 Mar, 2023', location: 'Shipped', date: '$210.40', contact: '07723112123' },
    // Add more rows as needed
  ]);
  const [sortConfig, setSortConfig] = useState(null);

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredData = tableData.filter(row =>
    Object.values(row).some(val => val.toString().toLowerCase().includes(searchValue))
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
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className={style.App}>
      <main className={style.table} id="customers_table">
        <TableHeader searchValue={searchValue} handleSearch={handleSearch} />
        <TableBody data={sortedData} handleSort={handleSort} sortConfig={sortConfig} />
      </main>
    </div>
  );
};

const TableHeader = ({ searchValue, handleSearch }) => (
  <section className={style.table__header}>
    <div className={style.inputGroup}>
    <img src={search} alt="search icon" className={style.searchIcon}/>
      <input
        type="search"
        placeholder="Search Data..."
        value={searchValue}
        className={style.searchField}
        onChange={handleSearch}
      />
    </div>
  </section>
);

const TableBody = ({ data, handleSort, sortConfig }) => (
  <section className={style.table__body}>
    <table>
      <thead>
        <tr>
          {['Token', 'Customer', 'Order', 'Order Date', 'Status', 'Total', ' '].map(key => (
            <th
              key={key}
              onClick={() => handleSort(key)}
              className={sortConfig?.key === key ? sortConfig.direction : ''}
            >
              {key.toUpperCase()}
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
            <td>{row.email}</td>
            <td>{row.service}</td>
            <td>
              <p className={`${style.status} ${style[row.location.toLowerCase()]}`}>{row.location}</p>
            </td>
            <td>{row.date}</td>
            <td>{row.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default CustomerTable;
