import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import AuthContext from './AuthContext'
import api from '../backendCall';

export default function Login() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            toast.error('Already logged in');
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // State for login data
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in...');

        try {
            const res = await api.post('account/login', loginData);              
            if (res.status === 200) {
                setIsAuthenticated(true);
                navigate('/');
                toast.success('Login Successful !!!');
            }
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }

        // Reset form after submission
        setLoginData({
            username: "",
            password: "",
        });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h2>Login</h2>
                    <p>Please enter your credentials</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={loginData.username}
                            required 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={loginData.password} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                    <hr />
                    <div className="login-links">
                        <a href="#">Forgot Password?</a>
                        <p>
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
