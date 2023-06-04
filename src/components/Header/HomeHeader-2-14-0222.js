import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
//import {header} from "reactstrap";

import hsimagel from "../../assets/img/home/sabsaath-logo.png";

const HomeHeader = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container">
                    <img className="navbar-brand" src={hsimagel} alt="..." />
                    <ul className="nav justify-content-end">
                        <li className="nav-item"><a className="nav-link login-btn" href="/Login">LogIn</a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default HomeHeader