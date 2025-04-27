import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import '../styles/Todo.css';

function Todo({ todo, toggleComplete, deleteTodo }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOverdue = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && !todo.completed;
  };

  return (
    <ListGroup.Item className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-checkbox">
          <Form.Check
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
        </div>
        <div className="todo-text">
          <p className="task-text">{todo.task}</p>
          <p className="due-date">
            {isOverdue(todo.dueDate) && !todo.completed && 
              <span className="overdue-badge">¡Vencida!</span>
            }
            <span className="date-text">Fecha límite: {formatDate(todo.dueDate)}</span>
          </p>
        </div>
        <div className="todo-actions">
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => deleteTodo(todo.id)}
            className="delete-btn"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default Todo; 