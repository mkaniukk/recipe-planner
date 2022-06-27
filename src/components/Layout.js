import React from 'react';
import { Link } from "react-router-dom";
import { NavItem } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h1>EGUI React Project</h1>
            </div>
            <div>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <NavItem><Link className="nav-link link-style" to="/">Recipe List</Link> </NavItem>
                    </a>
                </div>
            </nav>
            </div>
            <main className="col-11">{children}</main>
        </>
    )
}

export default Layout;