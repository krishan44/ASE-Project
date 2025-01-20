import style from "./customers.module.css";
import React, { useEffect, useState } from 'react';
import ApiService from "../../services/apiService";

function customers(){

     // State to store API data
  const [tableData, setTableData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.get('/users'); // Call the GET method
        setTableData(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []); // Run only once when the component mounts

  const handleCardClick = () => {
    navigate('/details');
  };

    return (
        <div>
 
          <div className={style.cardContainer}>
            <div className={style.card}>
              <h2>Card Title</h2>
              <p>Click this card to navigate to another page.</p>
            </div>
          </div>
    
          <div className={style.tableContainer}>
            <h1>Customers</h1>
            <table className={style.table}>
              <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
            </tr>
          </thead>
              <tbody>
              {tableData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company?.name || 'N/A'}</td>
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default customers;