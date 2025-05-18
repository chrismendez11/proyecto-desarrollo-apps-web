const API_URL = 'http://localhost:5001';
const API_KEY = 'todo-list-api-key';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': API_KEY
};

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/getTasks`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener tareas');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const addNewTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/addTask`, {
      method: 'POST',
      headers,
      body: JSON.stringify(task)
    });
    
    if (!response.ok) {
      throw new Error('Error al agregar tarea');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/removeTask/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar tarea');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const fetchGoals = async () => {
  try {
    const response = await fetch(`${API_URL}/getGoals`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener metas');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching goals:', error);
    return [];
  }
};

export const addNewGoal = async (goal) => {
  try {
    const response = await fetch(`${API_URL}/addGoal`, {
      method: 'POST',
      headers,
      body: JSON.stringify(goal)
    });
    
    if (!response.ok) {
      throw new Error('Error al agregar meta');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding goal:', error);
    throw error;
  }
};

export const deleteGoal = async (id) => {
  try {
    const response = await fetch(`${API_URL}/removeGoal/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar meta');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
}; 