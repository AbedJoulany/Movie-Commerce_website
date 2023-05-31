// MainContent.js
import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './searchPage/SearchPage';
import CartPage from './cartPage/CartPage';
import CheckoutPage from './checkoutPage/CheckoutPage';
import MainPage from './mainPage/MainPage';

const MainContent = ({cartItems,clearCart, fetchCartItems, calculateTotalAmount}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    return (
        <div className="">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/search"
                    element={
                        <SearchPage
                            searchResults={searchResults}
                            setSearchResults={setSearchResults}
                            searchHistory={searchHistory}
                            setSearchHistory={setSearchHistory}
                            fetchCartItems = {fetchCartItems}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <CartPage
                            cartItems={cartItems}
                            clearCart={clearCart}
                            fetchCartItems={fetchCartItems}
                            calculateTotalAmount={calculateTotalAmount}
                        />
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <CheckoutPage
                            cartItems={cartItems}
                            clearCart={clearCart}
                            calculateTotalAmount={calculateTotalAmount}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default MainContent;
