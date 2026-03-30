import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register/', form);
      navigate('/login');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <form className='form' onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <input name="password2" placeholder="Confirm Password" type="password" onChange={handleChange} />
      <button className='rebutton' type="submit">Register</button>
      <button className='rebutton' onClick={() => navigate("/login")}>Login</button>
    </form>
    </div>
  );
}

export default Register;