import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

describe('TaskForm component', () => {
  test('displays error message when task is empty', async () => {
    const addTask = jest.fn().mockResolvedValue(undefined);
    render(<TaskForm addTask={addTask} />);

    fireEvent.submit(screen.getByRole('button', { name: /Add Task/i }));

    expect(await screen.findByText(/Task cannot be empty/i)).toBeInTheDocument();
    expect(addTask).not.toHaveBeenCalled();
  });

  test('calls addTask when form is submitted with valid task', async () => {
    const addTask = jest.fn().mockResolvedValue(undefined);
    render(<TaskForm addTask={addTask} />);

    fireEvent.change(screen.getByLabelText(/Add Task/i), { target: { value: 'New Task' } });
    fireEvent.submit(screen.getByRole('button', { name: /Add Task/i }));

    await waitFor(() => {
      expect(addTask).toHaveBeenCalledWith('New Task');
      expect(screen.getByLabelText(/Add Task/i)).toHaveValue('');
      expect(toast.success).toHaveBeenCalledWith('Task "New Task" added successfully!');
    });
  });

  test('displays error message when addTask fails', async () => {
    const addTask = jest.fn().mockRejectedValue(new Error('Network error'));
    render(<TaskForm addTask={addTask} />);

    fireEvent.change(screen.getByLabelText(/Add Task/i), { target: { value: 'New Task' } });
    fireEvent.submit(screen.getByRole('button', { name: /Add Task/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to add task: Network error');
    });
  });

  test('clears the input field after valid task submission', async () => {
    const addTask = jest.fn().mockResolvedValue(undefined);
    render(<TaskForm addTask={addTask} />);

    fireEvent.change(screen.getByLabelText(/Add Task/i), { target: { value: 'New Task' } });
    fireEvent.submit(screen.getByRole('button', { name: /Add Task/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Add Task/i)).toHaveValue('');
    });
  });
});
