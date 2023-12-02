import axios from 'axios';
import React, { useContext, useState } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {

    const {setToken} = useContext(userContext);

    const [user, setUser] = useState({
        name: '', email: '', password: '', cpassword: ''
    });

    const { name, email, password, cpassword } = user;
    const navigate = useNavigate();

    function handleInput(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();

        //validations
        if (!(name && email && password && cpassword)) {
            alert('All fields are required');
        }
        else if (password !== cpassword) {
            alert('password and cpassword must match');
        }
        else {
            axios.post('https://instagram-express-app.vercel.app/api/auth/signup', { name, email, password })
                .then(response => {

                    setToken(response.data.data.token);
                    localStorage.setItem('token', response.data.data.token);
                    navigate('/dashboard')
                })
                .catch(error => console.log(error.response.data.message));
        }

    }

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter name' name='name' onInput={handleInput} />
                <input type="email" placeholder='Enter email' name='email' onInput={handleInput} />
                <input type="password" placeholder='Enter password' name='password' onInput={handleInput} />
                <input type="password" placeholder='confirm your password' name='cpassword' onInput={handleInput} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}