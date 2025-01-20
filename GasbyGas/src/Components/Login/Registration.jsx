import React, { useState } from "react";
import axios from "axios";
import styles from "./RegistrationForm.module.css";

const Registration = ({ closeForm }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        full_name: "",
        date_of_birth: "",
        email: "",
        mobile_number: "",
        gender: "",
        address: "",
        education_level: "",
        major: "",
        learning_speed: "",
        profession: "",
        job_knowledge: "",
        country: "",
        specification: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateStep1 = () => {
        const { full_name, date_of_birth, email, mobile_number, gender, address, education_level, major, learning_speed } = formData;
        const newErrors = {};
        if (!full_name) newErrors.full_name = "Full Name is required.";
        if (!date_of_birth) newErrors.date_of_birth = "Date of Birth is required.";
        if (!email) newErrors.email = "Email Address is required.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email address.";
        if (!mobile_number) newErrors.mobile_number = "Mobile Number is required.";
        else if (!/^\d+$/.test(mobile_number)) newErrors.mobile_number = "Please enter a valid mobile number.";
        if (!gender) newErrors.gender = "Gender is required.";
        if (!address) newErrors.address = "Physical Address is required.";


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const { profession, job_knowledge, country, specification } = formData;
        const newErrors = {};
        if (!profession) newErrors.profession = "Profession Name is required.";
        if (!job_knowledge) newErrors.job_knowledge = "Knowledge about the Profession is required.";
        if (!country) newErrors.country = "Current Country is required.";
        if (!specification) newErrors.specification = "Specification is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (step === 1 && !validateStep1()) return;
        if (step === 2 && !validateStep2()) return;
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        try {
            // Send formData to the backend (Flask API)
            const response = await axios.post("http://localhost:5001/api/submit_registration", formData);
            // Log the response (optional, for debugging)
            console.log('Server Response:', response.data);
            // Handle successful submission
            if (response.status === 200) {
                closeForm();
                alert("Registration submitted successfully!");
            } else {
                alert("There was an error submitting your registration.");
            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error sending data to server:', error);
            alert("There was an error submitting your registration.");
        }
    };

    return (
        <div className={styles.forms}>
            <div className={styles.firstForm}>
                <div className={styles.closeButton} onClick={closeForm}>
                    <i className="uil uil-times"></i>
                </div>
                <form onSubmit={handleSubmit}>
                    {step === 1 ? (
                        <>
                            <div className={styles.details}>
                                <span className={styles.heading}>Registration</span>
                                <span className={styles.title}>Personal Details</span>
                                <div className={styles.fields}>
                                    <div className={styles.inputField}>
                                        <label htmlFor="full-name">Full Name</label>
                                        <input
                                            type="text"
                                            id="full-name"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="Enter your Name"
                                            required
                                        />
                                        {errors.full_name && <p className={styles.errorMessage}>{errors.full_name}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="dob">Date of Birth</label>
                                        <input
                                            type="date"
                                            id="dob"
                                            name="date_of_birth"
                                            value={formData.date_of_birth}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.date_of_birth && <p className={styles.errorMessage}>{errors.date_of_birth}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your Email"
                                            required
                                        />
                                        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="mobile">Mobile Number</label>
                                        <input
                                            type="number"
                                            id="mobile"
                                            name="mobile_number"
                                            value={formData.mobile_number}
                                            onChange={handleChange}
                                            placeholder="Enter Mobile Number"
                                            required
                                        />
                                        {errors.mobile_number && <p className={styles.errorMessage}>{errors.mobile_number}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label>Gender</label>
                                        <div className={styles.radioBtns}>
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="Male"
                                                checked={formData.gender === "Male"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="male">Male</label>
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="Female"
                                                checked={formData.gender === "Female"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="female">Female</label>
                                        </div>
                                        {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="address">Physical Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter your Address"
                                            required
                                        />
                                        {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}
                                    </div>
                                </div>
                            </div>

                          
                        </>
                    );
                        
                   
                </form>
            </div>
        </div>
    );
};

export default Registration;