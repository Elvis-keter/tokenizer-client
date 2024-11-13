import { useState } from 'react';
import { register } from '../api/Auth';
import "../../css/styles.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPasswordStrength, setShowPasswordStrength] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handlePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    if (password.match(/[^$&+,:;=?@#|'<>.-^*()%!]/)) strength += 1;

    switch(strength) {
      case 1 :
        return {color: 'red', strength: 'Very weak'};
      case 2 :
        return {color: 'orange', strength: 'Weak'};
      case 3 :
        return {color: 'yellow', strength: 'Normal'};
      case 4 :
        return {color: 'purple', strength: 'Strong'};
      case 5 :
        return {color: 'blue', strength: 'Very strong'};
      case 6:
        return {color: 'green', strength: 'Secure'};
      default :
        return {color:'', strength:''}
    }
  };

  const handlePasswordChange = (e) => {
    let newPassword = e.target.value;
    setPassword(newPassword);

    let passwordDetails = handlePassword(newPassword);
    setShowPasswordStrength(passwordDetails);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/signup', {
        username, password, email
      });

      if(response.status === 200) {
        setShowPopup(true);
        
      }
    } catch (error) {
      console.error('Signup error', error);
      alert('Error signing up. Please try again.');
    }
  };

  const popupVisible = () => {
    setShowPopup(false);
    navigate('/login');
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='header'>
        <h2>Register</h2>
        <a href='login'>Go to Login</a>
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
        onChange={handlePasswordChange}
        placeholder="Password" 
      />
      {showPasswordStrength && (
        <p style={{color:showPasswordStrength.color}}>
          {showPasswordStrength.strength}
        </p>
      )}
      <input 
        type="email" 
        name="email"
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"           
      />
      <button className='submit' type="submit">Sign Up</button>

      {showPopup && (
        <div className='popup'>
          <p>Please check your email for verification</p>
          <button onClick={popupVisible}>X</button>
        </div>
      )}
    </form>
  );
}

export default Register;
