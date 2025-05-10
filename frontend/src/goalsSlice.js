import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGoals, addNewGoal, deleteGoal } from './services/api';

export const fetchGoalsAsync = createAsyncThunk(
  'goals/fetchGoals',
  async () => {
    return await fetchGoals();
  }
);

export const addGoalAsync = createAsyncThunk(
  'goals/addGoal',
  async (goal) => {
    return await addNewGoal(goal);
  }
);

export const removeGoalAsync = createAsyncThunk(
  'goals/removeGoal',
  async (id) => {
    await deleteGoal(id);
    return id;
  }
);

const goalsSlice = createSlice({
  name: 'goals',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalsAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addGoalAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeGoalAsync.fulfilled, (state, action) => {
        return state.filter(goal => goal.id !== action.payload);
      });
  },
});

export default goalsSlice.reducer; 