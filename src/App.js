import React, { useState } from 'react';
import { SignUp } from './components/SignUp';
import './App.css'
import { Login } from './components/Login';
import { DashBoard } from './components/DashBoard';
import { Route, Routes } from 'react-router-dom';

export const App = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<DashBoard />} />
            </Routes>
        </div>
    )
}