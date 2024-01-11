import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { fetchUser} from '../services/api/usersAPI';

import './LoginPage.css'

export const LoginPage: React.FC = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchUser(loginUsername, loginPassword).then((user) => {
            if (user) {
                auth.signIn(user, () => {
                    navigate('/');
                });
            } else {
                alert('Invalid username or password');
            }
        });
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    return (
        <div className='main_container'>
            <div className='login_container'>
                <h2 className='txt txt_login'>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input className='input inp_username' type="text" value={loginUsername} onChange={handleInputChange(setLoginUsername)} placeholder="Username" required />
                    <input className='input inp_password' type="password" value={loginPassword} onChange={handleInputChange(setLoginPassword)} placeholder="Password" required />
                    <button className='btn btn_login' type="submit">Login</button>
                </form>
            </div>
            <div className='redirect_register'>
                <p className='txt txt_redirect'>Don't have an account?</p>
                <a className='txt txt_redirect' href='/register'>Register</a>
            </div>
        </div>
    );
};