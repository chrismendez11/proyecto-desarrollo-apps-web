import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/TodoForm.css';

function GoalForm({ addGoal }) {
  const [goal, setGoal] = useState({
    id: '',
    title: '',
    description: '',
    targetDate: '',
  });

  const handleTitleChange = (e) => {
    setGoal({ ...goal, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setGoal({ ...goal, description: e.target.value });
  };

  const handleDateChange = (e) => {
    setGoal({ ...goal, targetDate: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goal.title.trim()) {
      addGoal({ ...goal, id: Date.now() });
      setGoal({ ...goal, title: '', description: '', targetDate: '' });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <strong>Título de Meta</strong>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={goal.title}
            onChange={handleTitleChange}
            required
            className="form-input"
          />
        </Form.Group>

        <div className="form-header">
          <strong>Descripción</strong>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={goal.description}
            onChange={handleDescriptionChange}
            className="form-input"
          />
        </Form.Group>

        <div className="form-header">
          <strong>Fecha Objetivo</strong>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            type="date"
            value={goal.targetDate}
            onChange={handleDateChange}
            className="form-input"
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="add-button"
        >
          AGREGAR META
        </Button>
      </Form>
    </div>
  );
}

export default GoalForm; 