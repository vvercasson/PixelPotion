import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../model/User';

import './LoginPage.css'

export const LoginPage: React.FC = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const user = createUser(loginUsername, loginUsername);

        auth?.signIn(user, () => {
            navigate('/'); // Redirect to the homepage after login
        });
    };

    const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(registerPassword !== registerPasswordConfirm) {
            alert('Passwords do not match');
            return;
        }

        // Clear inputs
        setRegisterUsername('');
        setRegisterPassword('');
        setRegisterPasswordConfirm('');

        alert('Registration complete')
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    return (
        <div className='main_container'>
            <div className='login_container'>
                <h2 className='txt txt_login'>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input className='input inp_username' type="text" value={loginUsername} onChange={handleInputChange(setLoginUsername)} placeholder="Username" required/>
                    <input className='input inp_password'type="password" value={loginPassword} onChange={handleInputChange(setLoginPassword)} placeholder="Password" required/>
                    <button className='btn btn_login'type="submit">Login</button>
                </form>
            </div>
            <div className='register_container'>
                <h2 className='txt txt_register'>Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <input className='input inp_username' type="text" value={registerUsername} onChange={handleInputChange(setRegisterUsername)} placeholder="Username" required/>
                    <input className='input inp_password' type="password" value={registerPassword} onChange={handleInputChange(setRegisterPassword)} placeholder="Password" required/>
                    <input className='input inp_password' type="password" value={registerPasswordConfirm} onChange={handleInputChange(setRegisterPasswordConfirm)} placeholder="Password" required/>
                    <button className='btn btn_register' type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};