import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function TaskForm({ onSubmit, initialData = {} }) {
  const navigate = useNavigate();
  const safeData = initialData || {};
  const [form, setForm] = useState({
    title: safeData.title || '',
    description: safeData.description || '',
    completed: safeData.completed || false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', completed: false });
  };
  const handleLogout = () => {
    localStorage.clear(); // remove access & refresh tokens
    navigate("/login");   // redirect to login page
  };

  return (
    <div className='tsk-container'>
      <form className='ds-form' onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <label>
        Completed:
        <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
      </label>
      <button className='cre-button' type="submit">{safeData.title ? 'Update' : 'Create'}</button>
      <button className='cre-button' onClick={handleLogout}>Logout</button>
    </form>
    </div>
  );
}

export default TaskForm;