import { useEffect, useState } from "react";
import { createTask, getTask, updateTask } from "../services/taskServices";

export const TaskForm = ({ taskId, onTaskUpdated }) => {
  const [task, setTask] = useState({ title: "", description: "" }); //comienza vacio

  useEffect(() => {
    if (taskId) {
      getTask(taskId).then(({ data }) => setTask(data));
    }
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value }); //explicacion mas abajo
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Evita que se envie vacio
    if (taskId) {
      updateTask(taskId, task).then(() => onTaskUpdated());
    } else {
      createTask(task).then(() => onTaskUpdated());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <button
        type="submit"
        className={taskId ? "button-edit" : "button-create"}
      >
        {taskId ? "Actualizar tarea" : "Crear tarea"}
      </button>
    </form>
  );
};
