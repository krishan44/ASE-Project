import React, { useState, useRef, useEffect } from "react";
import style from "./login.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBTypography, MDBInput, MDBValidation } from 'mdb-react-ui-kit';
import ApiService from "../../services/apiService";
import { useAuth } from '../AdminAuth/AuthContext';
import { useNavigate } from 'react-router-dom';
import useErrorHandler from "../Util/useErrorHandler";
import { useToast } from '../Util/ToastContext';

function Login({ onSubmit }) {
    const { showToast } = useToast();
    const initialFormData = {
        username: "",
        password: "",
    };
    const [loginSuccess, setLoginSuccess] = useState(false); // Track login success state
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);
    const formRef = useRef(null); // Ref to reset the form
    const { handleError } = useErrorHandler();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.username || !formData.password) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        onSubmit && onSubmit(formData); // Call onSubmit if provided

        try {
            const response = await ApiService.post('/auth/admin/login', formData);
            const token = response.authToken;
            login(token);
            // console.log("Login successful, token:", token);
            setLoginSuccess(true);
        } catch (error) {
            handleError(error);
            console.error("Login failed:", error); // Log the error for debugging
        }
    };

    // Trigger toast and navigate to dashboard when login is successful
    useEffect(() => {
        if (loginSuccess) {
            showToast('Login Successful', 'success');
            setTimeout(() => {
                navigate('/dashboard'); // Navigate after a delay to ensure toast shows
            }, 1000); // Delay navigation by 1 second
        }
    }, [loginSuccess, showToast, navigate]);

    // Reset form fields and validation
    useEffect(() => {
        if (formRef.current) {
            formRef.current.reset();
        }
    }, [loginSuccess]);

    return (
        <MDBContainer fluid className={`p-3 my-5 ${style.hcustom}`}>
            <ToastContainer /> {/* Toast container to render the toasts */}
            <MDBValidation noValidate onSubmit={handleSubmit} ref={formRef}>
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                    </MDBCol>
                    <MDBCol col='4' md='6'>
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <MDBTypography className="display-3 pb-3 mb-3 lead fw-normal mb-0 me-3">Gaz by Gaz Admin</MDBTypography>
                        </div>
                        <div className={`d-flex align-items-center my-4 ${style.divider}`}>
                            <p className="text-center fw-bold mx-3 mb-0">Login for Admin</p>
                        </div>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Email address'
                            id='formControlLg'
                            size="lg"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <MDBInput wrapperClass='mb-4'
                            label='Password'
                            id='formControlLg'
                            type='password'
                            size="lg"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="d-flex justify-content-between mb-4">
                            <a href="!#">Forgot password?</a>
                        </div>
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg' type="submit">Login</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBValidation>
        </MDBContainer>
    );
}

export default Login;
