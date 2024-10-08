// src/hooks/useTaskManager.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "../interfaces/Task";
import { TokenEnum } from "../enums/tokenEnum";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const token = TokenEnum.AUTH_TOKEN;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [token]);

  const addTask = async (title: string): Promise<void> => {
    try {
      const response = await axios.post(
        "/tasks/post",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newTask = response.data;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      };
      try {
        const response = await axios.put(`/tasks/${id}`, updatedTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedTasks = tasks.map((task) =>
          task.id === id ? response.data : task
        );
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    setTasks,
    filter,
    setFilter,
    addTask,
    toggleTaskCompletion,
  };
};