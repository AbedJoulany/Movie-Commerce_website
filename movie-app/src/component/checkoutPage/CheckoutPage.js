import React, { useState, useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css'
const CheckoutPage = ({ cartItems, clearCart, calculateTotalAmount }) => {
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // Function to handle form submission
    const handleSubmit = async (formData) => {
        try {
            // Make a POST request to the server with form data
            await axios.post('/debug/purchases', formData);
            clearCart();
            setShowSuccessMessage(true);

        } catch (error) {
            console.log(error);
        }
    };
    // Use effect hook to handle success message display and redirection
    useEffect(() => {
        let timer;
        if (showSuccessMessage) {
            // Set a timer to navigate back to the home page after 5 seconds
            timer = setTimeout(() => {
                navigate('/');
            }, 5000);
        }
        return () => {
            // Clear the timer when the component unmounts
            clearTimeout(timer);
        };
    }, [showSuccessMessage, navigate]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Checkout Page</h2>

            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center' }}>
                    {!showSuccessMessage && <strong>Your cart is empty. Go shop for products.</strong>}
                </p>
            ) : (
                <div className="row">
                    <CheckoutForm amount={calculateTotalAmount(cartItems)} onSubmit={handleSubmit} />
                    <CheckoutSummary cartItems={cartItems} calculateTotalAmount={calculateTotalAmount} />
                </div>
            )}

            {showSuccessMessage && (
                <div className="success-message">
                    <p>Purchase succeeded</p>
                    <p>Redirecting to the home page...</p>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
