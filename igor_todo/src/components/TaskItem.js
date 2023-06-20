import React, { useState, useRef, useEffect } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

function TaskItem({ task, toggleTaskCompletion, saveTask, deleteTask }) {
  const [isEdited, setIsEdited] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDueDate, setUpdatedDueDate] = useState(task.dueDate);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isEdited) {
      titleInputRef.current.focus();
    }
  }, [isEdited]);

  const handleEditClick = () => {
    setIsEdited(true);
  };

  const handleSaveClick = () => {
    saveTask(task.id, updatedTitle, updatedDueDate);
    setIsEdited(false);
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
  };

console.log(task)

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />

      {isEdited ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            ref={titleInputRef}
          />
          <input
            type="date"
            value={updatedDueDate}
            onChange={(e) => setUpdatedDueDate(e.target.value)}
          />
          <button onClick={handleSaveClick}>
            <FaSave />
          </button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <span>{task.dueDate}</span>
          <button onClick={handleEditClick}>
            <FaEdit />
          </button>
        </>
      )}

      <button onClick={handleDeleteClick}>
        <FaTrash />
      </button>
    </li>
  );
}

export default TaskItem;
