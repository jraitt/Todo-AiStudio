import React, { useState } from 'react';
import { Project } from '../types';
import { PlusIcon, EditIcon, TrashIcon, FolderIcon } from './icons';

interface ManageProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

const ManageProjectsModal: React.FC<ManageProjectsModalProps> = ({
  isOpen,
  onClose,
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject
}) => {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDeleteClick = (projectId: string) => {
    setConfirmDelete(projectId);
  };

  const handleConfirmDelete = (projectId: string) => {
    onDeleteProject(projectId);
    setConfirmDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const getProjectColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
    };
    return colorMap[color] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Projects</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Add Project Button */}
        <div className="mb-6">
          <button
            onClick={onAddProject}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-400 to-cyan-400 text-white rounded-lg hover:from-green-500 hover:to-cyan-500 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Project
          </button>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {projects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FolderIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No projects found. Create your first project!</p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${getProjectColorClasses(project.color)}`}
              >
                <div className="flex items-center gap-3">
                  <FolderIcon className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-sm opacity-75 capitalize">{project.color}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {confirmDelete === project.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-red-600 mr-2">Delete?</span>
                      <button
                        onClick={() => handleConfirmDelete(project.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleCancelDelete}
                        className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => onEditProject(project)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white/50 rounded-md transition-colors"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(project.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-white/50 rounded-md transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProjectsModal;