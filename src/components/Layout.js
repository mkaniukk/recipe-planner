import React from 'react';
import { Link } from "react-router-dom";
import { NavItem } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 className="display-1">RECIPE PLANNER</h1>
            </div>
            <div>
                <nav className="m-3 navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav ml-auto">
                            <a className="nav-item nav-link active" href="recipe">Shopping List</a>
                            <a className="nav-item nav-link" href="/">Shopping Cart</a>
                        </ul>
                    </div>
                    <ul className="navbar-nav ml-auto">
                        <a className="nav-item nav-link" href="/">Settings</a>
                    </ul>
                </nav>
            </div>
            <main className="col-11">{children}</main>
        </>
    )
}

export default Layout;