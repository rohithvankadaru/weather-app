import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/userContext';


let newToken;
export const DashBoard = () => {

    const [joke, setJoke] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { token, setToken } = useContext(userContext);

    if (!token) {
        newToken = localStorage.getItem('token');
    }
    else {
        newToken = token;
    }

    useEffect(() => {
        getZukuJoke();
    }, [token]);

    async function getZukuJoke() {

        const response = await axios.get('https://instagram-express-app.vercel.app/api/auth/zuku', {
            headers: {
                authorization: `Bearer ${newToken}`
            }
        })
        try {
            setJoke(response.data.data.message);
            setErrorMessage('');
        }
        catch {
            setErrorMessage(response.data.message);
        }
    }

    async function handleLogout() {

        const response = await axios.delete('https://instagram-express-app.vercel.app/api/auth/logout', {
            headers: {
                authorization: `Bearer ${newToken}`
            }
        })

        try {
            setJoke('');
            localStorage.removeItem('token');
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <div>
            <h1>DashBoard {errorMessage}</h1>
            <h3>{joke}</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}