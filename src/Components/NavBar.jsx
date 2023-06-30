import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navigation = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <NavLink to="/Home" className="logo">
                    YumFood
                </NavLink>
            </div>
            <div className="navbar-right">
                <NavLink to="/MyOrders" className="nav-button">
                    My Orders
                </NavLink>
                <NavLink  className="nav-button">
                    <ShoppingCartIcon className="white-icon" />
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
