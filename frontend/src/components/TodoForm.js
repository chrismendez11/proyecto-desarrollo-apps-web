import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/TodoForm.css';

function TodoForm({ addTask }) {
  const [task, setTask] = useState({
    id: '',
    task: '',
    description: '',
    dueDate: '',
  });

  const handleNameChange = (e) => {
    setTask({ ...task, task: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setTask({ ...task, description: e.target.value });
  };

  const handleDateChange = (e) => {
    setTask({ ...task, dueDate: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.task.trim() && task.dueDate) {
      addTask({ ...task, id: Date.now() });
      setTask({ ...task, task: '', description: '', dueDate: '' });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <strong>Name</strong>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={task.task}
            onChange={handleNameChange}
            required
            className="form-input"
          />
        </Form.Group>

        <div className="form-header">
          <strong>Description</strong>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={task.description}
            onChange={handleDescriptionChange}
            className="form-input"
          />
        </Form.Group>

        <div className="form-header">
          <strong>Due Date</strong>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            type="date"
            value={task.dueDate}
            onChange={handleDateChange}
            required
            className="form-input"
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="add-button"
        >
          ADD GOAL
        </Button>
      </Form>
    </div>
  );
}

export default TodoForm; 