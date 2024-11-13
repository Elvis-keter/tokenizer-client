import React, {useState} from 'react'
import { login } from '../api/Auth';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../../css/styles.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:5050/authenticate', {
                    username: username,
                    password: password
                });
                console.log(response.data);
                localStorage.setItem('jwt', response.data.token);
                navigate('/dashboard');
                console.log(localStorage.getItem('jwt'));
                console.log(localStorage.getItem('token'));
            } catch(error) {
                console.log('Login failed', error.response.data);
            }
        };

        return (
            <form className='form' onSubmit={handleSubmit}>
                <div className='header'>
                    <h2>Login</h2>
                    <a href='register'>Go back to sign up</a>
                </div>
                <input 
                    type="text" 
                    name="username"
                    required 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username" 
                />
                <input 
                    type="password" 
                    name="password"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                />
                <button className='submit' type="submit">Login</button>
            </form>
        );
}

export default Login
