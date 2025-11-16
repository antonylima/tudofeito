import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import { format } from 'date-fns';

const TaskItem = ({ task, onEdit, onDelete, onComplete }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await onComplete(task.id);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className={`task-item ${task.isUrgent ? 'urgent' : ''} ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span className="task-date">
            Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}
          </span>
          {task.isUrgent && <span className="task-urgent-badge">Urgent</span>}
        </div>
      </div>
      <div className="task-actions">
        {!task.isCompleted && (
          <>
            <button
              className="btn-icon"
              onClick={() => onEdit(task)}
              title="Edit task"
            >
              <FiEdit2 />
            </button>
            <button
              className="btn-icon btn-complete"
              onClick={handleComplete}
              disabled={isCompleting}
              title="Mark as completed"
            >
              <FiCheck />
            </button>
          </>
        )}
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
