const { pool } = require('../config/db');

class Goal {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM goals ORDER BY createdAt DESC');
      return rows;
    } catch (error) {
      console.error('Error al obtener metas:', error);
      throw error;
    }
  }

  static async add(goal) {
    try {
      const { id, title, description, targetDate } = goal;
      const query = 'INSERT INTO goals (id, title, description, targetDate) VALUES (?, ?, ?, ?)';
      const [result] = await pool.query(query, [id, title, description, targetDate]);
      
      if (result.affectedRows === 1) {
        return goal;
      }
      throw new Error('No se pudo agregar la meta');
    } catch (error) {
      console.error('Error al agregar meta:', error);
      throw error;
    }
  }

  static async remove(id) {
    try {
      const query = 'DELETE FROM goals WHERE id = ?';
      const [result] = await pool.query(query, [id]);
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar meta:', error);
      throw error;
    }
  }
}

module.exports = Goal; 