import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskFormProps {
  addTask: (title: string) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setLoading(true);
      try {
        await addTask(title);
        toast.success(`Task "${title}" added successfully!`);
        setTitle("");
        setError(false);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Failed to add task: ${error.message}`);
        } else {
          toast.error("Failed to add task.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
    >
      <TextField
        label="Add Task"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
        helperText={error ? "Task cannot be empty" : ""}
      />
      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Add Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
