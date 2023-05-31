import React, { useState } from 'react';
import './checkoutForm.css';

const CheckoutForm = ({amount, onSubmit }) => {
    // State variables to track form input values
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    // State variable to track form validation errors
    const [errors, setErrors] = useState({ firstName: false, lastName: false, email: false });

    // Function to validate the form
    const validateForm = () => {
        const newErrors = {
            firstName: firstName.trim() === '',
            lastName: lastName.trim() === '',
            email: email.trim() === '',
        };
        setErrors(newErrors);
        // Check if there are no errors in the form
        return Object.values(newErrors).every((error) => !error);
    };
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate the form
        if (!validateForm()) {
            return; // Stop form submission if there are errors
        }
        // Call the onSubmit function with form data
        onSubmit({
            email: email,
            firstName: firstName,
            lastName: lastName,
            payment: amount,
        });
        // Reset form input values
        setFirstName('');
        setLastName('');
        setEmail('');
    };
    // Function to handle first name input change
    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
        // Clear the error for first name
        setErrors({ ...errors, firstName: false });
    };
    // Function to handle last name input change
    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
        // Clear the error for last name
        setErrors({ ...errors, lastName: false });
    };
    // Function to handle email input change
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setErrors({ ...errors, email: false });
    };

    return (
        <div className="col-md-8 mb-4">
            <div className="card p-4">
                <div className="row mb-3">
                    <div className="col-md-6 mb-2">
                        <div className={`form-group`}>
                            <input
                                type="text"
                                id="firstName"
                                className="form-control"
                                value={firstName}
                                onChange={handleChangeFirstName}
                            />
                            <label className="form-label" htmlFor="firstName">
                                First name
                            </label>
                            {errors.firstName && <p className="error-message">Please enter your first name</p>}
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className={`form-group `}>
                            <input
                                type="text"
                                id="lastName"
                                className="form-control"
                                value={lastName}
                                onChange={handleChangeLastName}
                            />
                            <label className="form-label" htmlFor="lastName">
                                Last name
                            </label>
                            {errors.lastName && <p className="error-message">Please enter your last name</p>}
                        </div>
                    </div>
                </div>
                <div className={`form-group mb-4 `}>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <label className="form-label" htmlFor="email">
                        Email address
                    </label>
                    {errors.email && <p className="error-message">Please enter your email address</p>}
                </div>
                <h4 className="mb-4"></h4>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                    Complete Purchase
                </button>
            </div>
        </div>
    );

};

export default CheckoutForm;
