import React, { useState } from 'react';
import { PROJECT_COLORS } from '../src/firebase/projectService';
import { PlusIcon, FolderIcon } from './icons';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (projectData: { name: string; color: string }) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      color: selectedColor,
    });

    // Reset form
    setName('');
    setSelectedColor(PROJECT_COLORS[0].value);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setSelectedColor(PROJECT_COLORS[0].value);
    onClose();
  };

  const getColorPreviewClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      purple: 'bg-purple-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      indigo: 'bg-indigo-500',
      orange: 'bg-orange-500',
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getColorBackgroundClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      purple: 'bg-purple-100 border-purple-200',
      blue: 'bg-blue-100 border-blue-200',
      green: 'bg-green-100 border-green-200',
      pink: 'bg-pink-100 border-pink-200',
      red: 'bg-red-100 border-red-200',
      yellow: 'bg-yellow-100 border-yellow-200',
      indigo: 'bg-indigo-100 border-indigo-200',
      orange: 'bg-orange-100 border-orange-200',
    };
    return colorMap[color] || 'bg-gray-100 border-gray-200';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Project</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              required
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {PROJECT_COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedColor === color.value 
                      ? `${getColorBackgroundClasses(color.value)} ring-2 ring-blue-400` 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${getColorPreviewClasses(color.value)} mb-1`}></div>
                  <span className="text-xs font-medium text-gray-600">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {name.trim() && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className={`flex items-center gap-3 p-3 rounded-lg border-2 ${getColorBackgroundClasses(selectedColor)}`}>
                <FolderIcon className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm opacity-75 capitalize">{selectedColor}</p>
                </div>
              </div>
            </div>
          )}

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
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;