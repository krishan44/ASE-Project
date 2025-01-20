import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/apiService";
import style from "./outletManager.module.css";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBTable, MDBTableHead, MDBTableBody
} from "mdb-react-ui-kit";

// Main Component
function OutletManager() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.get("/admin/get/managers");
        setTableData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = () => {
    navigate("/details");
  };

  return (
    <div >
      <h1>Customers</h1>
      {/* Form */}
      <Form />

      {/* Table */}

      <div  className={style.tableContainer}>
        <MDBTable hover>
          <MDBTableHead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Outlet Name</th>
              <th scope="col">User</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Roles</th>
              <th scope="col">Created Date</th>
              <th scope="col">Modified Date</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {tableData.map((oulet) => (
              <tr key={oulet.id}>
                <th scope="row">{oulet.id}</th>
                <td>{oulet.outletName}</td>
                <td>{oulet.userName}</td>
                <td>{oulet.email || "N/A"}</td>
                <td>{oulet.phone}</td>
                <td>{oulet.role}</td>
                <td>{oulet.createdDatetime}</td>
                <td>{oulet.modifiedDatetime}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

// Form Component
function Form({ onSubmit }) {
  const initialFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Form Data:", formData);
    onSubmit && onSubmit(formData); // Call onSubmit if provided
    setFormData(initialFormData); // Clear form fields
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBValidation noValidate onSubmit={handleSubmit}>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </MDBCol>
          </MDBRow>

          <MDBInput
            wrapperClass="mb-4"
            label="Company Name"
            id="form6Example3"
          />
          <MDBInput wrapperClass="mb-4" label="Address" id="form6Example4" />
          <MDBInput
            wrapperClass="mb-4"
            type="email"
            label="Email"
            id="form6Example5"
          />
          <MDBInput
            wrapperClass="mb-4"
            type="tel"
            label="Phone"
            id="form6Example6"
          />

          <MDBInput
            wrapperClass="mb-4"
            textarea
            rows={4}
            label="Additional Information"
            id="form6Example7"
          />

          <MDBCheckbox
            wrapperClass="d-flex justify-content-center mb-4"
            id="form6Example8"
            label="Create an account?"
            defaultChecked
          />

          <MDBBtn className="mb-4" type="submit" block>
            Place Order
          </MDBBtn>
        </MDBValidation>
      </MDBCardBody>
    </MDBCard>
  );
}

export default OutletManager;
