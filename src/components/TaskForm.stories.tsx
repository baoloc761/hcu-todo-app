import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { Task } from "../interfaces/Task";
import { v4 as uuid4 } from "uuid";

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export default {
  title: "TaskForm",
  component: TaskForm,
};

export const Default = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage());

  const addTask = async (title: string) => {
    const newTask: Task = {
      id: uuid4(),
      title: title,
      completed: false,
    };
    
    const updatedTasks = [...tasks, newTask];
    console.log('check-updatedTasks', updatedTasks);
    
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ul>
    </>
  );
};
