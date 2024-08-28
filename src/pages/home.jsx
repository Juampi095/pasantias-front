import { useState } from "react";
import { TaskForm } from "../components/taskForm";
import { TaskList } from "../components/taskList";

export const Home = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskUpdated = () => {
    setSelectedTaskId(null);
  };

  return (
    <div>
      <TaskForm taskId={selectedTaskId} onTaskUpdated={handleTaskUpdated} />
      <TaskList onEditTask={selectedTaskId} />
    </div>
  );
};
