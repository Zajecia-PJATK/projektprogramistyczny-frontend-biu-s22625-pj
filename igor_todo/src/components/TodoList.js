import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import TaskList from './TaskList';
import { saveAs } from 'file-saver';

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'TOGGLE_TASK_COMPLETION':
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'EDIT_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title, dueDate: action.payload.dueDate }
          : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

const initialTasks = [];

const AppContext = React.createContext();

const TodoList = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [newTask, setNewTask] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const newTaskInputRef = useRef(null);

  const addTask = useCallback(() => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: Date.now(),
        title: newTask,
        dueDate: newTaskDate, 
        completed: false,
      };

      dispatch({ type: 'ADD_TASK', payload: newTaskObject });
      setNewTask('');
      setNewTaskDate('');
    }
  }, [newTask, newTaskDate]);

  const exportToCsv = () => {
    const csvData = tasks.map((task) => `${task.title},${task.dueDate},${task.completed ? 'Completed' : 'Not Completed'}`);
    const csvString = 'Task, Due Date, Completed\n' + csvData.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'tasks.csv');
  };

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  return (
    <AppContext.Provider value={{ tasks, dispatch }}>
      <div>
        <h1>Todo List</h1>

        <input
          type="text"
          placeholder="Nowe zadanie"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          ref={newTaskInputRef}
        />

        <input
          type="date"
          value={newTaskDate}
          onChange={(event) => setNewTaskDate(event.target.value)}
        />

        <button onClick={addTask}>Dodaj</button>

        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="all">Wszystkie</option>
          <option value="completed">Ukończone</option>
          <option value="uncompleted">Nieukończone</option>
        </select>

        <input
          type="text"
          placeholder="Szukaj zadania"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <TaskList tasks={tasks} searchTerm={searchTerm} filter={filter} dispatch={dispatch} />

        <button onClick={exportToCsv}>Eksportuj do CSV</button>
      </div>
    </AppContext.Provider>
  );
};

export default TodoList;
export { AppContext };
