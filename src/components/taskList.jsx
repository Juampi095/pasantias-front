import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "../services/taskServices";

export const TaskList = ({ onEditTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const handleDelete = (id) => {
    deleteTask(id).then(loadTasks);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => onEditTask(task.id)} className="button-edit">
            Edit
          </button>
          <button
            onClick={() => handleDelete(task.id)}
            className="button-delete"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
