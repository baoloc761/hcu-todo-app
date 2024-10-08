import React from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Task } from "../interfaces/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskListProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  toggleTaskCompletion: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, toggleTaskCompletion }) => {
  const handleCheckboxChange = (task: Task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);

    const message = task.completed
      ? `Task "${task.title}" marked as incomplete.`
      : `Task "${task.title}" marked as complete.`;
    toast(message, { type: task.completed ? "warning" : "success" });

    toggleTaskCompletion(task.id);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>Task</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task)}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default TaskList;
