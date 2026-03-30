import { useState, useEffect } from 'react';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
  try {
    const res = await api.get('/tasks/');
    setTasks(res.data);
  } catch (err) {
    console.error('Error fetching tasks:', err);

    if (err.response?.status === 401) {
      // optional: redirect to login
      console.log('Unauthorized - redirecting...');
    }
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData) => {
  try {
    await api.post('/tasks/', taskData);
    fetchTasks();
  } catch (err) {
    console.error(" BACKEND ERROR:", err.response?.data || err);
  }
};

  const handleUpdate = async (id, taskData) => {
    await api.put(`/tasks/${id}/`, taskData);
    fetchTasks();
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}/`);
    fetchTasks();
  };

  return (
    <div className='container'>
      <h1 className='head'>Dashboard</h1>
      <div className='Form'>
        <TaskForm
        onSubmit={editingTask ? (data) => handleUpdate(editingTask.id, data) : handleCreate}
        initialData={editingTask || {}}
      />
      </div>
      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;