import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, addNewTask, deleteTask } from './services/api';

export const fetchTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    return await fetchTasks();
  }
);

export const addTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async (task) => {
    return await addNewTask(task);
  }
);

export const removeTaskAsync = createAsyncThunk(
  'tasks/removeTask',
  async (id) => {
    await deleteTask(id);
    return id;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeTaskAsync.fulfilled, (state, action) => {
        return state.filter(task => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer; 