import React, { useState, useEffect } from 'react';
import { Priority, Project, Todo } from '../types';
import { EditIcon } from './icons';

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: {
    text: string;
    priority: Priority;
    project?: Project;
    dueDate?: string;
  }) => void;
  todo: Todo | null;
  projects: Project[];
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpdate, 
  todo, 
  projects 
}) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [dueDate, setDueDate] = useState('');

  // Populate form when todo changes
  useEffect(() => {
    if (todo && isOpen) {
      setText(todo.text);
      setPriority(todo.priority);
      setSelectedProject(todo.project?.id || '');
      
      // Convert date string back to YYYY-MM-DD format for input
      if (todo.dueDate) {
        try {
          const date = new Date(todo.dueDate);
          const formattedDate = date.toISOString().split('T')[0];
          setDueDate(formattedDate);
        } catch (error) {
          setDueDate('');
        }
      } else {
        setDueDate('');
      }
    }
  }, [todo, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !todo) return;

    const project = selectedProject ? projects.find(p => p.id === selectedProject) : undefined;

    onUpdate(todo.id, {
      text: text.trim(),
      priority,
      project,
      dueDate: dueDate || undefined,
    });

    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setText('');
    setPriority(Priority.Medium);
    setSelectedProject('');
    setDueDate('');
    onClose();
  };

  if (!isOpen || !todo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Todo</h2>
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

          {/* Completion Status */}
          <div className="flex items-center space-x-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {todo.completed ? 'Completed' : 'Not completed'}
              </span>
            </label>
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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center justify-center gap-2"
            >
              <EditIcon className="w-4 h-4" />
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;