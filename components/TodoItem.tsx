
import React from 'react';
import { Todo, Priority } from '../types';
import { ClockIcon, CalendarIcon, EditIcon, TrashIcon, FolderIcon } from './icons';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  const styles = {
    [Priority.High]: 'bg-red-100 text-red-700',
    [Priority.Medium]: 'bg-yellow-100 text-yellow-700',
    [Priority.Low]: 'bg-green-100 text-green-700',
  };
  const colorDot = {
    [Priority.High]: 'bg-red-500',
    [Priority.Medium]: 'bg-yellow-500',
    [Priority.Low]: 'bg-green-500',
  }

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[priority]}`}>
      <span className={`w-2 h-2 rounded-full ${colorDot[priority]}`}></span>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </div>
  );
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const projectColors: { [key: string]: string } = {
      purple: 'bg-purple-100 text-purple-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      pink: 'bg-pink-100 text-pink-700',
  }
    
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-200/80 transition-all duration-300 hover:shadow-md hover:border-gray-300/80">
      <button onClick={() => onToggle(todo.id)} className="flex-shrink-0 group">
        <div className={`w-6 h-6 rounded-full border-2 ${todo.completed ? 'bg-green-400 border-green-400' : 'border-gray-300 group-hover:border-green-400'} flex items-center justify-center transition-colors duration-200`}>
          {todo.completed && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
        </div>
      </button>

      <div className="flex-grow mx-4">
        <p className={`text-base font-medium text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}`}>{todo.text}</p>
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-gray-500 text-xs mt-1">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" />
            <span>Created {todo.createdAt}</span>
          </div>
          {todo.dueDate && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Due {todo.dueDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <PriorityBadge priority={todo.priority} />
        {todo.project && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${projectColors[todo.project.color] || 'bg-gray-100 text-gray-700'}`}>
            <FolderIcon className="w-3.5 h-3.5" />
            {todo.project.name}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-6 text-gray-400">
        <button className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors duration-200"><EditIcon className="w-5 h-5" /></button>
        <button onClick={() => onDelete(todo.id)} className="p-1 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200"><TrashIcon className="w-5 h-5" /></button>
      </div>
    </div>
  );
};

export default TodoItem;
