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
        const { full_name, date_of_birth, email, mobile_number, gender, address } = formData;
        const newErrors = {};
        if (!full_name) newErrors.full_name = "Full Name is required.";
        if (!date_of_birth) newErrors.date_of_birth = "Date of Birth is required.";
        if (!email) newErrors.email = "Email Address is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address.";
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
        if (!profession) newErrors.profession = "Profession is required.";
        if (!job_knowledge) newErrors.job_knowledge = "Knowledge about the Profession is required.";
        if (!country) newErrors.country = "Country is required.";
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
            const response = await axios.post("http://localhost:5001/api/submit_registration", formData);
            if (response.status === 200) {
                closeForm();
                alert("Registration submitted successfully!");
            }
        } catch (error) {
            console.error('Error sending data:', error);
            alert("Error submitting registration.");
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
                                        />
                                        {errors.full_name && <p className={styles.errorMessage}>{errors.full_name}</p>}
                                    </div>
                                    <button type="button" onClick={nextStep}>Next</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.details}>
                                <span className={styles.title}>Professional Details</span>
                                <div className={styles.fields}>
                                    <div className={styles.inputField}>
                                        <label htmlFor="profession">Profession</label>
                                        <input
                                            type="text"
                                            id="profession"
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleChange}
                                            placeholder="Enter your Profession"
                                        />
                                        {errors.profession && <p className={styles.errorMessage}>{errors.profession}</p>}
                                    </div>
                                    <button type="button" onClick={prevStep}>Back</button>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Registration;
