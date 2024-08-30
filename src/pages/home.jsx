import { useState } from "react";
import { TaskForm } from "../components/taskForm";
import { TaskList } from "../components/taskList";

export const Home = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [reloadTasks, setReloadTasks] = useState(false);

  const handleTaskUpdated = () => {
    setSelectedTaskId(null); // Deselecciona la tarea después de actualizarla
    setReloadTasks(!reloadTasks); // Cambia el estado para recargar las tareas
  };

  return (
    <div>
      <TaskForm taskId={selectedTaskId} onTaskUpdated={handleTaskUpdated} />
      <TaskList onEditTask={setSelectedTaskId} reload={reloadTasks} />
    </div>
  );
};
