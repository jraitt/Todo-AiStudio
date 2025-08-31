
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ActionButtons from './components/ActionButtons';
import FilterTabs from './components/FilterTabs';
import TodoList from './components/TodoList';
import Summary from './components/Summary';
import { TODOS, PROJECTS } from './constants';
import { Todo, Project, Filter } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(TODOS);
  const [projects] = useState<Project[]>(PROJECTS);
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.Active);
  const [selectedProject, setSelectedProject] = useState<string>('all');

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
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

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-green-50 min-h-screen font-sans text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <ActionButtons />
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
