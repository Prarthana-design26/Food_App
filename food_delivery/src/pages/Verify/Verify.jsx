import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css'; // Assuming you have a CSS file for styling
import { StoreContext } from '../../context/StoreContext'; // Assuming StoreContext provides the base URL
import axios from 'axios'; // For making HTTP requests

const Verify = () => {
    // Get search parameters from the URL (session_id and orderId)
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get("session_id");
    const orderId = searchParams.get("orderId");

    const navigate = useNavigate(); // Hook for programmatic navigation
    const { url } = useContext(StoreContext); // Get the base URL from context

    // Function to verify the payment with the backend
    const verifyPayment = async () => {
        try {
            // Make a POST request to your backend's verify-session endpoint
            const response = await axios.post(`${url}/api/order/verify-session`, {
                session_id,
                orderId
            });

            // Check the response from the backend
            if (response.data.success) {
                // If payment is successfully verified, navigate to the user's orders page
                navigate('/myorders');
            } else {
                // If verification fails, navigate to the home page
                navigate('/');
            }
        } catch (err) {
            // Log any errors during the API call and navigate to home page
            console.error("Error verifying payment:", err);
            navigate('/');
        }
    };

    // useEffect hook to run verification when component mounts or search params change
    useEffect(() => {
        // Only attempt to verify if both session_id and orderId are present
        if (session_id && orderId) {
            verifyPayment();
        } else {
            // If essential parameters are missing, navigate to home immediately
            navigate("/");
        }
    }, [session_id, orderId, navigate, url]); // Dependencies for useEffect

    return (
        <div className="verify">
            {/* Simple spinner to indicate loading/processing */}
            <div className="spinner"></div>
            <p>Verifying your payment, please wait...</p>
        </div>
    );
};

export default Verify;
