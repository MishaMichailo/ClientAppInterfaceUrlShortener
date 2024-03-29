import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Registrationstyle.css';
import  { BASE_URL }  from   './axiosService.js' ;
import Clock from "./Clock.js"; 


const Registration = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const backToLoginPage = () => {
    navigate('/', { replace: true });
  };

  const isPasswordValid = (password) => {
    return password.length >= 10 && password.length <= 16 && /[a-zA-Z]/.test(password);
  };

  const handleRegistration = () => {
    const { password } = formData;

    if (!isPasswordValid(password)) {
      setRegistrationError('Password must be between 10 and 16 characters and contain one Upper and one Lower letters.');
      return;
    }
    axios.post(
      BASE_URL + 'Registration/registration',
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const token = response.data.token; 
          const userId = response.data.Id;
          localStorage.setItem('token', token); 
          localStorage.setItem('Id', userId);
          console.log('Registration successful');
          setRegistrationError(null);
          navigate('/', { replace: true });
        } else {
          console.error('Registration failed');
          if (response.data === "User with this username already exists.") {
            setRegistrationError("User with this username already exists.");
          }else{

            setRegistrationError(null);
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setRegistrationError('Error during registration(Please create passwrod not less than 10 and not gross than 16');
      });
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <div className="form-group-registration">
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group-registration">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group-registration">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="container">
      <button onClick ={backToLoginPage} id = "previous">Return </button>
      <button onClick={handleRegistration} id = "registration">Register</button>
      </div>
      {registrationError && (
        <div className="error-message-registration">
          {registrationError}
        </div>
      )}
   
    <Clock />
    </div>
  );
};

export default Registration;