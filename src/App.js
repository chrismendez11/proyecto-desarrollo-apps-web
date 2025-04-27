import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import TodoForm from './components/TodoForm';
import TaskList from './components/TaskList';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <Container>
          <Nav className="nav-tabs">
            <Nav.Item>
              <Nav.Link 
                className={activeTab === 'tasks' ? 'active' : ''} 
                onClick={() => setActiveTab('tasks')}
              >
                Tasks
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                className={activeTab === 'goals' ? 'active' : ''} 
                onClick={() => setActiveTab('goals')}
              >
                Goals
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </header>
      <Container className="app-container">
        <Row>
          <Col xs={12} md={activeTab === 'tasks' ? 12 : 6} className="form-column">
            <TodoForm addTask={addTask} />
          </Col>
          <Col xs={12} md={activeTab === 'tasks' ? 12 : 6} className="tasks-column">
            <TaskList 
              tasks={tasks} 
              removeTask={removeTask}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App; 