import React from 'react';
import { Link } from "react-router-dom";
import { NavItem } from 'react-bootstrap';
import recipe from '../recipe.png'

const Layout = ({ children }) => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={recipe} height="60px" />
                <h1 className="display-1">RECIPE PLANNER</h1>
            </div>
            <div>
                <nav className="m-5 navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-item nav-link active" to="/">Recipe List</Link>
                            <Link className="nav-item nav-link" to="/shoppingList">Shopping Cart</Link>
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