import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteTask, getTasks } from "../services/taskServices";

export const TaskList = ({ onEditTask, reload }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, [reload]); // Recarga las tareas cuando cambia `reload`

  const loadTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "No se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminalo!",
      cancelButtonAriaLabel: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id).then(() => {
          loadTasks();
          Swal.fire("Eliminar tarea", "La tarea ha sido eliminada!", "success");
        });
      }
    });
  };

  return (
    <div className="task-list">
      <div className="task-header">
        <div className="task-column">Tarea</div>
        <div className="description-column">Descripción</div>
        <div className="actions-column">Acciones</div>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className="task-row">
          <div className="task-column">{task.title}</div>
          <div className="description-column">{task.description}</div>
          <div className="actions-column">
            <button onClick={() => onEditTask(task.id)} className="button-edit">
              Editar
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="button-delete"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
