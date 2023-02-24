import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//react-icons
import { BiImport } from 'react-icons/bi'
import { AiFillPlusCircle, AiFillHome } from 'react-icons/ai'
import { BsFillGearFill } from 'react-icons/bs'

const Navbar = () => {
    const navbarInfoText = useSelector(state => state.navbar.navbarInfoText);
    return (
        <div className="bg-secondary fixed-top">
            <nav className="navbar navbar-expand bg-body-tertiary navbar-dark container">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">minemosin</Link>
                    <span>{navbarInfoText}</span>
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" style={{ 'fontSize': '20px' }} aria-current="page" to="/"><AiFillHome /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ 'fontSize': '20px' }} aria-current="page" to="/new-list"><AiFillPlusCircle /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ 'fontSize': '20px' }} aria-current="page" to="/import"><BiImport /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{ 'fontSize': '20px' }} aria-current="page" to="/settings"><BsFillGearFill /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;