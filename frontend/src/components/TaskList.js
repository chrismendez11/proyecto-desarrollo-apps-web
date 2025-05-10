import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/TaskList.css';

function TaskList({ tasks, removeTask }) {
  const formatDate = (dateString) => {
    return dateString;
  };

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <strong>Name</strong>
              <div className="task-name">{task.task}</div>
            </div>
            <div className="task-body">
              <strong>Description</strong>
              <div className="task-description">{task.description}</div>
            </div>
            <div className="task-footer">
              <strong>Due Date:</strong> {formatDate(task.dueDate)}
            </div>
            <Button 
              variant="remove" 
              className="remove-button"
              onClick={() => removeTask(task.id)}
            >
              Remover
            </Button>
          </div>
        ))
      ) : (
        <p className="no-tasks">No hay tareas agregadas</p>
      )}
    </div>
  );
}

export default TaskList; 