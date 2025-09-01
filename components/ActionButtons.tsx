
import React from 'react';
import { PlusIcon, ManageIcon } from './icons';

interface ActionButtonsProps {
  onAddTodo: () => void;
  onManageProjects: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAddTodo, onManageProjects }) => {
  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <button 
        onClick={onAddTodo}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transform transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-green-200"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Todo</span>
      </button>
      <button 
        onClick={onManageProjects}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transform transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200"
      >
        <ManageIcon className="w-5 h-5" />
        <span>Manage Projects</span>
      </button>
    </div>
  );
};

export default ActionButtons;
