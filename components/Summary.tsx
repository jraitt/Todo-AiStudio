
import React from 'react';

interface SummaryProps {
  total: number;
  active: number;
  completed: number;
  projects: number;
}

const SummaryItem: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => (
    <div className="text-center">
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
    </div>
);

const Summary: React.FC<SummaryProps> = ({ total, active, completed, projects }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 py-6">
      <SummaryItem value={total} label="Total" color="text-purple-500" />
      <SummaryItem value={active} label="Active" color="text-blue-500" />
      <SummaryItem value={completed} label="Completed" color="text-green-500" />
      <SummaryItem value={projects} label="Projects" color="text-gray-700" />
    </div>
  );
};

export default Summary;
