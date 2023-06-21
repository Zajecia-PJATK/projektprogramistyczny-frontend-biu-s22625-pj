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
      <div className="max-w-xl mx-auto p-4 space-y-4">

  <h1 className="text-4xl font-bold mb-4 text-center py-4">Todo List App</h1>






  <div className="flex flex-col items-center mb-2">
  <div className="flex justify-between w-full">
    <input
      type="text"
      placeholder="Nowe zadanie"
      value={newTask}
      onChange={(event) => setNewTask(event.target.value)}
      ref={newTaskInputRef}
      className="border border-gray-300 rounded-md px-2 py-1 mr-2 w-3/5 h-10"
    />

    <input
      type="date"
      value={newTaskDate}
      onChange={(event) => setNewTaskDate(event.target.value)}
      className="border border-gray-300 rounded-md px-2 py-1 w-2/5 h-10"
    />
  </div>
  <button
    onClick={addTask}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 w-full"
  >
    Dodaj nowe zadanie
  </button>

</div>




<div className="flex justify-beetween">
  <input
    type="text"
    placeholder="Szukaj zadania"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    className="border border-gray-300 rounded-md mr-20 px-2 w-full h-10"
  />
  <select
    value={filter}
    onChange={(event) => setFilter(event.target.value)}
    className="border border-gray-300 rounded-md ml-20 px-2 w-full h-10"
  >
    <option value="all">Wszystkie</option>
    <option value="completed">Ukończone</option>
    <option value="uncompleted">Nieukończone</option>
  </select>
</div>




        <TaskList tasks={tasks} searchTerm={searchTerm} filter={filter} dispatch={dispatch} />
        <div className="flex mb-2 space-x-2 mr-10">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={exportToCsv}
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          Eksportuj do CSV
        </button>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default TodoList;
export { AppContext };
