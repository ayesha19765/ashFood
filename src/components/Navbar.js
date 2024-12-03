import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar(props) {
    const [cartView, setCartView] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    localStorage.setItem('temp', 'first');
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const loadCart = () => {
        setCartView(true);
    };

    const items = useCart();

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="nav-container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">
                        AshFoods
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleNavbar}
                        aria-controls="navbarSupportedContent"
                        aria-expanded={!collapsed}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            {localStorage.getItem('token') && (
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 active" aria-current="page" to="/myorder">
                                        My Orders
                                    </Link>
                                </li>
                            )}
                        </ul>
                        {!localStorage.getItem('token') ? (
                            <form className="d-flex">
                                <Link className="btn text-success mx-1" to="/login" id="login-signup">
                                    Login
                                </Link>
                                <Link className="btn text-success mx-1" to="/signup" id="login-signup">
                                    Signup
                                </Link>
                            </form>
                        ) : (
                            <div>
                                <div className="btn bg-white text-success mx-2" id="login-signup" onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>
                                {cartView && (
                                    <Modal onClose={() => setCartView(false)}>
                                        <Cart />
                                    </Modal>
                                )}
                                <button onClick={handleLogout} className="btn bg-white text-success" id="login-signup">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
