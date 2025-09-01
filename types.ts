
export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  project?: Project;
  createdAt: string;
  dueDate?: string;
}

export enum Filter {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
}
