import React, { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setIsUrgent(Boolean(task.isUrgent));
    } else {
      setTitle('');
      setDescription('');
      setIsUrgent(false);
    }
  }, [task]);

 /* const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      isUrgent,
    };

    onSave(task.id ? { ...taskData, id: task.id } : taskData);
  };*/

  // src/components/TaskForm.js

const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!title.trim()) {
    return;
  }

  const taskData = {
    title: title.trim(),
    description: description.trim(),
    isUrgent,
  };

  // FIX: Check if 'task' exists before checking for 'task.id'
  if (task && task.id) {
    // This is an EDIT operation
    onSave({ ...taskData, id: task.id });
  } else {
    // This is a CREATE operation
    onSave(taskData);
  }
};

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <div className="task-form-header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="btn-icon" onClick={onCancel}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows="3"
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isUrgent"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
            />
            <label htmlFor="isUrgent">Mark as Urgent</label>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <FiSave /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
