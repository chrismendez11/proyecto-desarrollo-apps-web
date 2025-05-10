import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/TaskList.css';

function GoalList({ goals, removeGoal }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return dateString;
  };

  return (
    <div className="task-list">
      {goals.length > 0 ? (
        goals.map(goal => (
          <div key={goal.id} className="task-card">
            <div className="task-header">
              <strong>Título</strong>
              <div className="task-name">{goal.title}</div>
            </div>
            {goal.description && (
              <div className="task-body">
                <strong>Descripción</strong>
                <div className="task-description">{goal.description}</div>
              </div>
            )}
            {goal.targetDate && (
              <div className="task-footer">
                <strong>Fecha Objetivo:</strong> {formatDate(goal.targetDate)}
              </div>
            )}
            <Button 
              variant="remove" 
              className="remove-button"
              onClick={() => removeGoal(goal.id)}
            >
              Remover
            </Button>
          </div>
        ))
      ) : (
        <p className="no-tasks">No hay metas agregadas</p>
      )}
    </div>
  );
}

export default GoalList; 