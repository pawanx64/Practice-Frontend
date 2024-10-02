import React, { useEffect, useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { isLoggedIn } from '../Middlewares/isLoggedIn';
import { CheckIsAdmin } from '../Middlewares/isAdmin';
import AuthContext from './AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkAdminStatus = async () => {
        try {
            let adminRes = await CheckIsAdmin();
            setIsAdmin(adminRes);
        } catch (error) {
            console.error("Error checking admin status:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            checkAdminStatus();
        }
    }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  const handleHome = (e) => {
    e.preventDefault();
    navigate('/');
  }

  const handleDash = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get(`account/logout`, { withCredentials: true });
      if (res.status === 200) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        toast.success("You are Logged Out !!!");
        navigate('/login');
      }
    } catch (error) {
      toast.error("Server Error");
      console.error("Logout error:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" onClick={handleHome}>Home</Button>
          {!isAuthenticated && <Button color="inherit" onClick={handleLogin}>Login</Button>}
          {isAuthenticated && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
          {isAdmin && <Button color="inherit" onClick={handleDash}>DashBoard</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
