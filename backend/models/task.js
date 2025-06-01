const { pool } = require('../config/db');

class Task {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM tasks ORDER BY createdAt DESC');
      return rows;
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      throw error;
    }
  }

  static async add(task) {
    try {
      const { id, task: taskName, description, dueDate } = task;
      const query = 'INSERT INTO tasks (id, task, description, dueDate) VALUES (?, ?, ?, ?)';
      const [result] = await pool.query(query, [id, taskName, description, dueDate]);
      
      if (result.affectedRows === 1) {
        return task;
      }
      throw new Error('No se pudo agregar la tarea');
    } catch (error) {
      console.error('Error al agregar tarea:', error);
      throw error;
    }
  }

  static async remove(id) {
    try {
      const query = 'DELETE FROM tasks WHERE id = ?';
      const [result] = await pool.query(query, [id]);
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw error;
    }
  }
}

module.exports = Task; 