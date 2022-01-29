/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from "react-router-dom";
import authRequests from "../../services/auth.service";

export default function Nav(props: any): JSX.Element {
    const navigate = useNavigate();

    const handleHomeNav = (): void => {
        navigate('/');
    };

    const handleLoginNav = (): void => {
        navigate('/login');
    };

    const handleRegisterNav = (): void => {
        navigate('/register');
    };

    const handleLogout = (): void => {
        authRequests.logout();
        props.setUser(undefined);
        navigate('/');
    };

    const getUserMenuItems = (): JSX.Element => {
        if (props.user) {
            return (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" onClick={handleHomeNav}>Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
            );
        }
        return (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link" onClick={handleLoginNav}>Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={handleRegisterNav}>Register</a>
                </li>
            </ul>
        );
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={handleHomeNav}>Application name</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {getUserMenuItems()}
                </div>
            </div>
        </nav>
    );
}
