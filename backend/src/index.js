const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

let tasks = [];
let goals = [];

const API_KEY = 'todo-list-api-key';

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers.authorization;
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Acceso no autorizado. Se requiere API Key válida.' });
  }
  
  next();
};

app.use(authMiddleware);

app.get('/getTasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/addTask', (req, res) => {
  const task = req.body;
  
  if (!task.task || !task.dueDate) {
    return res.status(400).json({ error: 'Se requiere nombre de tarea y fecha límite' });
  }
  
  const newTask = {
    ...task,
    id: Date.now().toString()
  };
  
  tasks.push(newTask);
  res.status(200).json(newTask);
});

app.delete('/removeTask/:id', (req, res) => {
  const id = req.params.id;
  const initialLength = tasks.length;
  
  tasks = tasks.filter(task => task.id !== id);
  
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  
  res.status(200).json({ message: 'Tarea eliminada correctamente' });
});

app.get('/getGoals', (req, res) => {
  res.status(200).json(goals);
});

app.post('/addGoal', (req, res) => {
  const goal = req.body;
  
  if (!goal.title) {
    return res.status(400).json({ error: 'Se requiere título para la meta' });
  }
  
  const newGoal = {
    ...goal,
    id: Date.now().toString()
  };
  
  goals.push(newGoal);
  res.status(200).json(newGoal);
});

app.delete('/removeGoal/:id', (req, res) => {
  const id = req.params.id;
  const initialLength = goals.length;
  
  goals = goals.filter(goal => goal.id !== id);
  
  if (goals.length === initialLength) {
    return res.status(404).json({ error: 'Meta no encontrada' });
  }
  
  res.status(200).json({ message: 'Meta eliminada correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 