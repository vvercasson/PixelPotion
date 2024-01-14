import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { postUser } from '../services/api/usersAPI';

import './LoginPage.css';

export const RegisterPage: React.FC = () => {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (registerPassword !== registerPasswordConfirm) {
            alert('Passwords do not match');
            return;
        }

        postUser(registerUsername, registerPassword).then((user) => {
            if (user) {
                alert('Registration complete')
                auth.signIn(user, () => {
                    navigate('/login');
                });
            }
        }).catch((error) => {
            alert(error);
        });
    };
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    return (
        <div className='main_container'>
            <div className='register_container'>
                <h2 className='txt txt_register'>Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <input className='input inp_username' type="text" value={registerUsername} onChange={handleInputChange(setRegisterUsername)} placeholder="Username" required />
                    <input className='input inp_password' type="password" value={registerPassword} onChange={handleInputChange(setRegisterPassword)} placeholder="Password" required />
                    <input className='input inp_password' type="password" value={registerPasswordConfirm} onChange={handleInputChange(setRegisterPasswordConfirm)} placeholder="Password" required />
                    <button className='btn btn_register' type="submit">Register</button>
                </form>
            </div>
            <div className='login_redirect'>
                <p className='txt txt_login_redirect'>Already have an account?</p>
                <a className='txt txt_login_redirect' href='/login'>Login</a>
            </div>
        </div>
        
        )
    };