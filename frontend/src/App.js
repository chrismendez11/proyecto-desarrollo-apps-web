import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import TodoForm from './components/TodoForm';
import TaskList from './components/TaskList';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import './styles/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksAsync, addTaskAsync, removeTaskAsync } from './tasksSlice';
import { fetchGoalsAsync, addGoalAsync, removeGoalAsync } from './goalsSlice';

function App() {
  const tasks = useSelector(state => state.tasks);
  const goals = useSelector(state => state.goals);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    dispatch(fetchTasksAsync());
    dispatch(fetchGoalsAsync());
  }, [dispatch]);

  const handleAddTask = (task) => {
    dispatch(addTaskAsync(task));
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTaskAsync(id));
  };

  const handleAddGoal = (goal) => {
    dispatch(addGoalAsync(goal));
  };

  const handleRemoveGoal = (id) => {
    dispatch(removeGoalAsync(id));
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
        {activeTab === 'tasks' ? (
          <Row>
            <Col xs={12} md={6} className="form-column">
              <TodoForm addTask={handleAddTask} />
            </Col>
            <Col xs={12} md={6} className="tasks-column">
              <TaskList 
                tasks={tasks} 
                removeTask={handleRemoveTask}
              />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs={12} md={6} className="form-column">
              <GoalForm addGoal={handleAddGoal} />
            </Col>
            <Col xs={12} md={6} className="goals-column">
              <GoalList 
                goals={goals} 
                removeGoal={handleRemoveGoal}
              />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App; 