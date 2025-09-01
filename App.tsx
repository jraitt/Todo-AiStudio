
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ActionButtons from './components/ActionButtons';
import AddTodoModal from './components/AddTodoModal';
import EditTodoModal from './components/EditTodoModal';
import ManageProjectsModal from './components/ManageProjectsModal';
import AddProjectModal from './components/AddProjectModal';
import EditProjectModal from './components/EditProjectModal';
import FilterTabs from './components/FilterTabs';
import TodoList from './components/TodoList';
import Summary from './components/Summary';
import { Todo, Project, Filter, Priority } from './types';
import { subscribeTodos, toggleTodo, deleteTodo, addTodo, updateTodo } from './src/firebase/todoService';
import { subscribeProjects, addProject, updateProject, deleteProject } from './src/firebase/projectService';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.Active);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  
  // Project management states
  const [showManageProjectsModal, setShowManageProjectsModal] = useState<boolean>(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState<boolean>(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Subscribe to Firestore todos
  useEffect(() => {
    const unsubscribe = subscribeTodos((firestoreTodos) => {
      setTodos(firestoreTodos);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to Firestore projects
  useEffect(() => {
    const unsubscribe = subscribeProjects((firestoreProjects) => {
      setProjects(firestoreProjects);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await toggleTodo(id, !todo.completed);
      }
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error toggling todo:', err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleAddTodo = async (todoData: {
    text: string;
    priority: Priority;
    project?: Project;
    dueDate?: string;
  }) => {
    try {
      const newTodo = {
        text: todoData.text,
        completed: false,
        priority: todoData.priority,
        project: todoData.project,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        dueDate: todoData.dueDate ? new Date(todoData.dueDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : undefined,
      };
      
      await addTodo(newTodo);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const handleEditTodo = (id: string) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditingTodo(todoToEdit);
      setShowEditModal(true);
    }
  };

  const handleUpdateTodo = async (id: string, updates: {
    text: string;
    priority: Priority;
    project?: Project;
    dueDate?: string;
  }) => {
    try {
      const updateData = {
        text: updates.text,
        priority: updates.priority,
        project: updates.project,
        dueDate: updates.dueDate ? new Date(updates.dueDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : undefined,
      };
      
      await updateTodo(id, updateData);
      setError(null);
      setShowEditModal(false);
      setEditingTodo(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Project Management Handlers
  const handleManageProjects = () => {
    setShowManageProjectsModal(true);
  };

  const handleAddProject = async (projectData: { name: string; color: string }) => {
    try {
      await addProject(projectData);
      setError(null);
    } catch (err) {
      setError('Failed to add project');
      console.error('Error adding project:', err);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowEditProjectModal(true);
    setShowManageProjectsModal(false);
  };

  const handleUpdateProject = async (projectId: string, updates: { name: string; color: string }) => {
    try {
      await updateProject(projectId, updates);
      setError(null);
      setShowEditProjectModal(false);
      setEditingProject(null);
      setShowManageProjectsModal(true);
    } catch (err) {
      setError('Failed to update project');
      console.error('Error updating project:', err);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setError(null);
    } catch (err) {
      setError('Failed to delete project');
      console.error('Error deleting project:', err);
    }
  };
  
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
        const filterMatch = 
            activeFilter === Filter.All ||
            (activeFilter === Filter.Active && !todo.completed) ||
            (activeFilter === Filter.Completed && todo.completed);
        
        const projectMatch =
            selectedProject === 'all' || todo.project?.id === selectedProject;

        return filterMatch && projectMatch;
    });
  }, [todos, activeFilter, selectedProject]);

  const counts = useMemo(() => {
    const active = todos.filter(t => !t.completed).length;
    const completed = todos.length - active;
    return {
        all: todos.length,
        active: active,
        completed: completed
    }
  }, [todos]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 via-white to-green-50 min-h-screen font-sans text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Header />
          <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200/50">
            <div className="flex justify-center items-center h-32">
              <div className="text-lg text-gray-500">Loading todos...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-green-50 min-h-screen font-sans text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <ActionButtons 
          onAddTodo={() => setShowAddModal(true)} 
          onManageProjects={handleManageProjects}
        />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <AddTodoModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTodo}
          projects={projects}
        />
        <EditTodoModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingTodo(null);
          }}
          onUpdate={handleUpdateTodo}
          todo={editingTodo}
          projects={projects}
        />
        <ManageProjectsModal
          isOpen={showManageProjectsModal}
          onClose={() => setShowManageProjectsModal(false)}
          projects={projects}
          onAddProject={() => {
            setShowAddProjectModal(true);
            setShowManageProjectsModal(false);
          }}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
        <AddProjectModal
          isOpen={showAddProjectModal}
          onClose={() => {
            setShowAddProjectModal(false);
            setShowManageProjectsModal(true);
          }}
          onAdd={handleAddProject}
        />
        <EditProjectModal
          isOpen={showEditProjectModal}
          onClose={() => {
            setShowEditProjectModal(false);
            setEditingProject(null);
            setShowManageProjectsModal(true);
          }}
          onUpdate={handleUpdateProject}
          project={editingProject}
        />
        <main className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200/50">
            <FilterTabs 
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                projects={projects}
                counts={counts}
            />
            <TodoList 
                todos={filteredTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
            />
        </main>
        <Summary 
            total={counts.all}
            active={counts.active}
            completed={counts.completed}
            projects={projects.length}
        />
      </div>
    </div>
  );
};

export default App;
