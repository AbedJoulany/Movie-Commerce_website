import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css'
const MainPage = () => {
    return (
        <div className="main-page">
            <h1 className="main-page__title">Welcome to Movie Store</h1>
            <p className="main-page__description">Explore our collection of movies and enjoy your shopping experience!</p>
            <Link to="/search" className="btn btn-primary main-page__btn">Go Shopping</Link>
        </div>
    );
};

export default MainPage;
