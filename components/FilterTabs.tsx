
import React from 'react';
import { Filter, Project } from '../types';
import { ClockIcon, CheckCircleIcon, FolderIcon, ChevronDownIcon } from './icons';

interface FilterTabsProps {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
  selectedProject: string;
  setSelectedProject: (projectId: string) => void;
  projects: Project[];
  counts: { all: number; active: number; completed: number };
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
    activeFilter, 
    setActiveFilter, 
    selectedProject, 
    setSelectedProject, 
    projects,
    counts
}) => {
  const getFilterButtonClasses = (filter: Filter) => {
    const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium";
    if (activeFilter === filter) {
      return `${baseClasses} bg-gray-800 text-white shadow-md`;
    }
    return `${baseClasses} text-gray-500 hover:bg-gray-100`;
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 my-6">
      <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-200/80">
        <button className={getFilterButtonClasses(Filter.All)} onClick={() => setActiveFilter(Filter.All)}>
          <ClockIcon className="w-5 h-5" />
          <span>All</span>
          <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">{counts.all}</span>
        </button>
        <button className={getFilterButtonClasses(Filter.Active)} onClick={() => setActiveFilter(Filter.Active)}>
          <div className="w-5 h-5 border-2 border-current rounded-full"></div>
          <span>Active</span>
          <span className={`${activeFilter === Filter.Active ? 'bg-white/20' : 'bg-gray-200 text-gray-700'} text-xs font-bold px-2 py-0.5 rounded-full`}>{counts.active}</span>
        </button>
        <button className={getFilterButtonClasses(Filter.Completed)} onClick={() => setActiveFilter(Filter.Completed)}>
          <CheckCircleIcon className="w-5 h-5" />
          <span>Completed</span>
          <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">{counts.completed}</span>
        </button>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 bg-white pl-4 pr-3 py-2.5 rounded-lg shadow-sm text-gray-600 border border-gray-200/80">
            <FolderIcon className="w-5 h-5 text-gray-400" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-transparent appearance-none focus:outline-none text-sm font-medium pr-6"
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;
