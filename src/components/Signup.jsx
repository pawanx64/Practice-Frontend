import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import AuthContext from './AuthContext';
import api from '../backendCall';

export default function Signup() {
  const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Consume the AuthContext

    useEffect(() => {
        if (isAuthenticated) {
            toast.error('Already logged in');
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
  
  // State for signup data
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('account/signup', signupData);
      if (response.status === 200) {
        toast.success('Signup Successful!');
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
    
    // Reset form after submission
    setSignupData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>SignUp</h2>
          <p>Please enter your credentials</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              value={signupData.username} 
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              value={signupData.email} 
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              value={signupData.password} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" className="login-btn">Sign Up</button>
          <div className="login-links">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
