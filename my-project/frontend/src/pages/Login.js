import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);  

    try {
      const res = await api.post('/login/', form);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <button className='rebutton' type="submit">Login</button>
        <button className='rebutton' onClick={() => navigate("/register")}>Register</button>
      </form>
    </div>
  );
}

export default Login;