import React from "react";
import { IoSettingsSharp } from 'react-icons/io5';
import { BiImport } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
const Navbar = () => {
    return (
        <div className="bg-secondary">
            <nav className="navbar navbar-expand bg-body-tertiary navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">minemosin</a>
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" style={{ 'fontSize': '20px' }} aria-current="page" href="#"><AiOutlinePlusCircle /></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ 'fontSize': '20px' }} aria-current="page" href="#"><BiImport /></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ 'fontSize': '20px' }} aria-current="page" href="#"><IoSettingsSharp /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;