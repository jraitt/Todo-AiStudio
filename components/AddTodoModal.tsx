import React, { useState } from 'react';
import { Priority, Project } from '../types';
import { PlusIcon } from './icons';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todoData: {
    text: string;
    priority: Priority;
    project?: Project;
    dueDate?: string;
  }) => void;
  projects: Project[];
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose, onAdd, projects }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const project = selectedProject ? projects.find(p => p.id === selectedProject) : undefined;

    onAdd({
      text: text.trim(),
      priority,
      project,
      dueDate: dueDate || undefined,
    });

    // Reset form
    setText('');
    setPriority(Priority.Medium);
    setSelectedProject('');
    setDueDate('');
    onClose();
  };

  const handleClose = () => {
    setText('');
    setPriority(Priority.Medium);
    setSelectedProject('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Todo</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Todo Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What needs to be done?
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your todo..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={Priority.Low}>Low</option>
              <option value={Priority.Medium}>Medium</option>
              <option value={Priority.High}>High</option>
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project (Optional)
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">No Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date (Optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-400 to-cyan-400 text-white rounded-lg hover:from-green-500 hover:to-cyan-500 transition-colors flex items-center justify-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;