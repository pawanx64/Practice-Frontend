import axios from 'axios';
import api from '../backendCall';

// Function to check if the user is an admin
export const CheckIsAdmin = async () => {
    try {
        const res = await axios.get('https://practice-backend-lilac.vercel.app/account/isAdmin');
        if (res.status === 200) {
            return res.data.isAdmin;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
};