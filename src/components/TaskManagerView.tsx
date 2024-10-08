import React from "react";
import { ButtonGroup, Button } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task } from "../interfaces/Task";

interface TaskManagerViewProps {
  tasks: Task[]; // Danh sách các nhiệm vụ
  setTasks: (tasks: Task[]) => void; // Hàm cập nhật các nhiệm vụ
  addTask: (title: string) => Promise<void>; // Hàm thêm nhiệm vụ mới
  toggleTaskCompletion: (id: string) => void; // Hàm thay đổi trạng thái hoàn thành của nhiệm vụ
  filter: string; // Trạng thái bộ lọc
  setFilter: (filter: string) => void; // Hàm thay đổi bộ lọc
}

const TaskManagerView: React.FC<TaskManagerViewProps> = ({
  tasks,
  setTasks,
  addTask,
  toggleTaskCompletion,
  filter,
  setFilter,
}) => {
  const handleAddTask = async (title: string) => {
    try {
      await addTask(title);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const getFilteredTasks = () => {
    if (filter === "Completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "Incomplete") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Task Manager</h1>
      <TaskForm addTask={handleAddTask} />
      <ButtonGroup variant="outlined" style={{ marginBottom: "20px" }}>
        <Button onClick={() => setFilter("All")} variant={filter === "All" ? "contained" : "outlined"}>
          All
        </Button>
        <Button onClick={() => setFilter("Completed")} variant={filter === "Completed" ? "contained" : "outlined"}>
          Completed
        </Button>
        <Button onClick={() => setFilter("Incomplete")} variant={filter === "Incomplete" ? "contained" : "outlined"}>
          Incomplete
        </Button>
      </ButtonGroup>
      <TaskList tasks={getFilteredTasks()} setTasks={setTasks} toggleTaskCompletion={toggleTaskCompletion} />
    </div>
  );
};

export default TaskManagerView;
