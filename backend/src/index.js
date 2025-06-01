const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initializeDatabase } = require('../config/db');
const Task = require('../models/task');
const Goal = require('../models/goal');

const app = express();
const PORT = process.env.PORT || 5001;
const API_KEY = process.env.API_KEY || 'todo-list-api-key';

app.use(express.json());
app.use(cors());

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers.authorization;
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Acceso no autorizado. Se requiere API Key válida.' });
  }
  
  next();
};

app.use(authMiddleware);

app.get('/getTasks', async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

app.post('/addTask', async (req, res) => {
  try {
    const task = req.body;
    
    if (!task.task || !task.dueDate) {
      return res.status(400).json({ error: 'Se requiere nombre de tarea y fecha límite' });
    }
    
    const newTask = {
      ...task,
      id: Date.now().toString()
    };
    
    const savedTask = await Task.add(newTask);
    res.status(200).json(savedTask);
  } catch (error) {
    console.error('Error al agregar tarea:', error);
    res.status(500).json({ error: 'Error al agregar tarea' });
  }
});

app.delete('/removeTask/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Task.remove(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
});

app.get('/getGoals', async (req, res) => {
  try {
    const goals = await Goal.getAll();
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error al obtener metas:', error);
    res.status(500).json({ error: 'Error al obtener metas' });
  }
});

app.post('/addGoal', async (req, res) => {
  try {
    const goal = req.body;
    
    if (!goal.title) {
      return res.status(400).json({ error: 'Se requiere título para la meta' });
    }
    
    const newGoal = {
      ...goal,
      id: Date.now().toString()
    };
    
    const savedGoal = await Goal.add(newGoal);
    res.status(200).json(savedGoal);
  } catch (error) {
    console.error('Error al agregar meta:', error);
    res.status(500).json({ error: 'Error al agregar meta' });
  }
});

app.delete('/removeGoal/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Goal.remove(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Meta no encontrada' });
    }
    
    res.status(200).json({ message: 'Meta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar meta:', error);
    res.status(500).json({ error: 'Error al eliminar meta' });
  }
});

async function startServer() {
  const dbInitialized = await initializeDatabase();
  
  if (!dbInitialized) {
    console.error('Error al inicializar la base de datos. El servidor no se iniciará.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
}

startServer(); 