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

  return (
    <li className="flex items-center justify-between py-2 bg-blue-100 rounded-md px-4">
      <div className="flex justify-between flex items-center">
        {isEdited ? (
          <div className="flex">
            <div className="flex justify-between flex items-center">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                ref={titleInputRef}
                className="mr-2 border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="date"
                value={updatedDueDate}
                onChange={(e) => setUpdatedDueDate(e.target.value)}
                className="mr-2 border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <span className={`${task.completed ? 'line-through' : ''} flex-grow`}>{task.title}</span>
            <span className="ml-4">{task.dueDate}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between flex items-center">
        <input
          type="checkbox"
          onChange={() => toggleTaskCompletion(task.id)}
          checked={task.completed}
        />
        {isEdited ? (
          <button onClick={handleSaveClick} className="text-blue-500 hover:text-blue-700 ml-4">
            <FaSave />
          </button>
        ) : (
          <button onClick={handleEditClick} className="text-blue-500 hover:text-blue-700 ml-4">
            <FaEdit />
          </button>
        )}
        <button onClick={handleDeleteClick} className="text-red-500 hover:text-red-700 ml-4">
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
