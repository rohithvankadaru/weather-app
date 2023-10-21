import React, { useState } from 'react';
import { SignUp } from './components/SignUp';
import './App.css'
import { Login } from './components/Login';
import { DashBoard } from './components/DashBoard';

export const App = () => {

    const[token, setToken] = useState('');

    return(
        <div>
            <SignUp setToken={setToken}/>
            <Login setToken={setToken}/>
            <DashBoard token={token}/>
        </div>
    )
}