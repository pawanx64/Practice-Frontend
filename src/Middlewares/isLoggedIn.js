import axios from 'axios';
import api from '../backendCall';
const token = localStorage.getItem('token');
// Function to check if the user is an loggedin
export const isLoggedIn = async () => {
    try {
        const res = await axios.get('https://practice-backend-lilac.vercel.app/account/isLoggedIn', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.status === 200;
    } catch (error) {
        console.error("Error checking login status:", error);
        return false;
    }
};