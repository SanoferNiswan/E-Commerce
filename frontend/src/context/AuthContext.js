import { createContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const navigate = useNavigate(); 
    
    const loginUser = async (email, password) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/dashboard');  // Redirect to dashboard after successful login
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to login: ' + error.message);
        }
    };

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password, password2 })
        });

        if (response.ok) {
            navigate('/login');  // Redirect to login page after successful registration
        } else {
            const errorData = await response.json();
            alert('Registration failed: ' + errorData.detail);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');  // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ user, authTokens, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
