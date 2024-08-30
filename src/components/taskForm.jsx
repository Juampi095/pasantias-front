import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createTask, getTask, updateTask } from "../services/taskServices";

export const TaskForm = ({ taskId, onTaskUpdated }) => {
  const [task, setTask] = useState({ title: "", description: "" }); // comienza vacío

  useEffect(() => {
    if (taskId) {
      getTask(taskId).then(({ data }) => setTask(data));
    }
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value }); // actualización del estado del formulario
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se envíe vacío

    if (taskId) {
      updateTask(taskId, task).then(() => {
        Swal.fire({
          icon: "success",
          title: "Tarea actualizada",
          text: "La tarea se actualizó correctamente.",
          confirmButtonColor: "#2980b9",
        });
        onTaskUpdated();
      });
    } else {
      createTask(task).then(() => {
        Swal.fire({
          icon: "success",
          title: "Tarea creada",
          text: "La tarea se creó correctamente.",
          confirmButtonColor: "#2980b9",
        });
        onTaskUpdated();
      });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        className="task-input"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        className="task-textarea"
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
