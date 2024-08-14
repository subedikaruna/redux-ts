import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setToken } from './authSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://courier-api.alphalaunch.net/api/login', {
        username,
        password,
      });
  
      console.log('API Response:', response.data); // Log the entire response
      const token = response.data.token;
  
      if (!token) {
        console.error('Token is undefined');
      } else {
        console.log('Token:', token);
        dispatch(setToken(token));
        navigate('/user-list');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
