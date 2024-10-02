import api from '../backendCall';

// Function to check if the user is an loggedin
export const isLoggedIn = async () => {
    try {
        const res = await api.get('account/isLoggedIn');
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
};