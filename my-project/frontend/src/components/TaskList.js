function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="list-contain">
      <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
          <div>
          <button className="libtn" onClick={() => onEdit(task)}>Edit</button>
          <button className="libtn" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default TaskList;