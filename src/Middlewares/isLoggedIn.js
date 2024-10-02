import axios from 'axios';
import api from '../backendCall';

// Function to check if the user is an loggedin
export const isLoggedIn = async () => {
    try {
        const res = await axios.get('https://practice-backend-lilac.vercel.app/account/isLoggedIn', {
            withCredentials: true
        });
        return res.status === 200;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Redirect to login or take appropriate action
            console.error("User is not authorized, redirecting to login...");
        } else {
            console.error("Error checking login status:", error);
        }
        return false;
    }
};