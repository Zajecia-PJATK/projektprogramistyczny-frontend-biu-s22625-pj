import React, { useContext, useMemo } from 'react';
import { AppContext } from './TodoList';
import TaskItem from './TaskItem';

function TaskList({ searchTerm, filter }) {
  const { tasks, dispatch } = useContext(AppContext);

  const toggleTaskCompletion = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: taskId });
  };

  const editTask = (taskId, title, dueDate) => {
    dispatch({ type: 'EDIT_TASK', payload: { id: taskId, title, dueDate } });
  };

  const saveTask = (taskId, title, dueDate) => {
    dispatch({ type: 'SAVE_TASK', payload: { id: taskId, title, dueDate } });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const filteredTasks = useMemo(() => {
    const filterTasks = (task) => {
      if (filter === 'all') {
        return true;
      } else if (filter === 'completed') {
        return task.completed;
      } else if (filter === 'uncompleted') {
        return !task.completed;
      }
      return false;
    };

    const searchTasks = (task) => {
      return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    return tasks.filter(filterTasks).filter(searchTasks);
  }, [tasks, filter, searchTerm]);

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
          saveTask={saveTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
