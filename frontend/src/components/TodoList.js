import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Todo from './Todo';
import '../styles/TodoList.css';

function TodoList({ todos, toggleComplete, deleteTodo }) {
  // Separar tareas por estado: completadas y pendientes
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list-container">
      <h2 className="list-title">Tareas pendientes</h2>
      
      {pendingTodos.length > 0 ? (
        <ListGroup className="todo-list">
          {pendingTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ListGroup>
      ) : (
        <p className="no-tasks-message">No hay tareas pendientes.</p>
      )}

      {completedTodos.length > 0 && (
        <>
          <h2 className="list-title completed-title">Tareas completadas</h2>
          <ListGroup className="todo-list">
            {completedTodos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
}

export default TodoList; 