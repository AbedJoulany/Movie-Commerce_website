// App.js
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Navbar from './component/navbar/Navbar';
import MainContent from './component/MainContent';

// App component
const App = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);
    // Function to fetch cart items from the server
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('/api/cart');
            setCartItems(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    // Function to clear the cart
    const clearCart = async () => {
        try {
            await axios.delete('/api/cart');
            setCartItems([]);
        } catch (error) {
            console.log(error);
        }
    };
    // Function to calculate the total amount of items in the cart
    const calculateTotalAmount = (items) => {
        return items.reduce((acc, item) => acc + item.price, 0);
    };

    return (
        <Router>
            <div>
                <Navbar cartItemCount={cartItems.length} />
                <MainContent cartItems={cartItems}
                             clearCart = {clearCart}
                             fetchCartItems={fetchCartItems}
                             calculateTotalAmount = {calculateTotalAmount}
                />
            </div>
        </Router>
    );
};

export default App;
