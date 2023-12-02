import axios from 'axios';
import React, { useContext, useState } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const { setToken } = useContext(userContext);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');


    const { email, password } = user;
    const navigate = useNavigate();

    function inputHandler(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    function submitHandler(event) {
        event.preventDefault();

        if (!(email && password)) {
            alert('all fields are required')
        }
        else {
            axios.post('https://instagram-express-app.vercel.app/api/auth/login', {
                email,
                password
            })
                .then(response => {
                    setToken(response.data.data.token);
                    localStorage.setItem('token', response.data.data.token);
                    setErrorMessage('');
                    navigate('/dashboard')
                })
                .catch(error => {
                    setErrorMessage(error.response.data.message);
                })
        }
    }



    return (
        <div>
            <h1>Login {errorMessage}</h1>
            <form onSubmit={submitHandler}>
                <input type="email" name="email" placeholder='Enter your email' onInput={inputHandler} />
                <input type="password" name="password" placeholder='password' onInput={inputHandler} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}