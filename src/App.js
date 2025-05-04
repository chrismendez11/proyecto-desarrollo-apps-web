import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import TodoForm from './components/TodoForm';
import TaskList from './components/TaskList';
import './styles/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask } from './tasksSlice';

function App() {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('tasks');

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
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
            <TodoForm addTask={handleAddTask} />
          </Col>
          <Col xs={12} md={activeTab === 'tasks' ? 12 : 6} className="tasks-column">
            <TaskList 
              tasks={tasks} 
              removeTask={handleRemoveTask}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App; 