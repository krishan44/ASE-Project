import React, { useState, useEffect } from 'react';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg';
import edit from '../../../assets/table/edit.svg';

const OrderHistoryTable = () => {

    const [searchValue, setSearchValue] = useState('');
    const [tableData, setTableData] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);
    const [popupData, setPopupData] = useState(null); // State for popup data
    const [popupType, setPopupType] = useState(null); // State for popup type ('Orders' or 'Tank')

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

    // Filter data based on search value
    const filteredData = tableData.filter((row) => {
        const normalizedSearch = searchValue.toLowerCase().trim();
        return (
            row.id.toString().toLowerCase().includes(normalizedSearch) ||
            row.customer.toLowerCase().includes(normalizedSearch)
        );
    });

    const handleView = (type, data) => {
        setPopupType(type);
        setPopupData(data);
    };

    // Close popup
    const closePopup = () => {
        setPopupData(null);
        setPopupType(null);
    };

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
                    getStatusStyle={'success'} // Pass getStatusStyle as a prop
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
}

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
                        <td>{row.Status}</td>
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

export default OrderHistoryTable;