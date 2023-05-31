import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styles
const Navbar = ({ cartItemCount }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Movie Store
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">
                                Search
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart&nbsp;
                                <span><i className="fas fa-shopping-cart"></i></span>
                                <span className="badge rounded-pill badge-notification bg-danger">{cartItemCount}</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/checkout">
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
