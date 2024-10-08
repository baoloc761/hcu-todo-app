import React from "react";
import TaskManagerView from "./components/TaskManagerView";
import { useTaskManager } from "./hooks/useTaskManager";
import "./api/mockApi";

const App: React.FC = () => {
  const { tasks, filter, setFilter, addTask, toggleTaskCompletion , setTasks} =
    useTaskManager();

  return (
    <TaskManagerView
      tasks={tasks}
      addTask={addTask}
      toggleTaskCompletion={toggleTaskCompletion}
      filter={filter}
      setFilter={setFilter}
      setTasks={setTasks}
    />
  );
};

export default App;
