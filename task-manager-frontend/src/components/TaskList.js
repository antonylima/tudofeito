import React, { useState } from 'react';
import { FiPlus, FiFilter } from 'react-icons/fi';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import useTasks from '../hooks/useTasks';

const TaskList = () => {
  const { tasks, loading, error, addTask, updateTask, deleteTask, completeTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData.id) {
        await updateTask(taskData.id, taskData);
      } else {
        await addTask(taskData);
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await completeTask(id);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h1>Task Manager</h1>
        <div className="task-list-actions">
          <div className="filter-buttons">
            <button
              className={`btn-filter ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`btn-filter ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`btn-filter ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <button className="btn-primary" onClick={handleAddTask}>
            <FiPlus /> Add Task
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found. Create your first task!</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onComplete={handleCompleteTask}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default TaskList;
