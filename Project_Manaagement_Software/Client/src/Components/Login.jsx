import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {

        event.preventDefault(); // Prevent default form submission behavior

        const data = { email: email, password: password };

        // http://10.0.2.63:8000/login
        Axios.post('http://127.0.0.1:8000/login', data, { withCredentials: true })
            .then(response => {
                // Handle successful response
                // axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
                console.log('Data sent');
                console.log('Response data:', response.data);

                if (response.data.message === 'Login Successfully') {
                    const token = response.data.token;
                    localStorage.setItem('token', token);

                    const userData = { name: response.data.userData.name, email: response.data.userData.email, role: response.data.userData.role };
                    navigate('/',{ state: { userData: userData } });
                }
            })
            .catch(error => {
                console.error('Error occurred during login:', error);
            });

    }

    function handleChange(event) {
        switch (event.target.type) {
            case 'email': setEmail(event.target.value); break;
            case 'password': setPassword(event.target.value); break;
            default: return null;
        }
    }

    return (
        <>
            <div id="login">
                <h2><span class="fontawesome-lock"></span>Sign In</h2>

                <form method="POST">

                    <fieldset>
                        <p><label for="email">E-mail address</label></p>
                        <p><input type="email" id="email" placeholder='Enter your email' onChange={handleChange} /></p>
                        <p><label for="password" >Password</label></p>
                        <p><input type="password" id="password" placeholder='Enter your password' onChange={handleChange} /></p>
                        <p><input type="submit" value="Sign In" onClick={handleSubmit} /></p>
                    </fieldset>

                </form>
                <div>Don't have an account? <Link to='/Register'>Register</Link></div>
            </div>
        </>
    )
}

export default Login;


