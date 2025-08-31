
import { Project, Todo, Priority } from './types';

export const PROJECTS: Project[] = [
  { id: 'p1', name: 'Financial', color: 'purple' },
  { id: 'p2', name: 'Work', color: 'blue' },
  { id: 'p3', name: 'Personal', color: 'green' },
  { id: 'p4', name: 'Health', color: 'pink' },
];

export const TODOS: Todo[] = [
  {
    id: 1,
    text: 'Get 2026 tax brackets',
    completed: false,
    priority: Priority.Medium,
    project: PROJECTS[0],
    createdAt: 'Aug 26, 2025',
    dueDate: 'Sep 30, 2025',
  },
  {
    id: 2,
    text: 'Wash my Car',
    completed: false,
    priority: Priority.Medium,
    createdAt: 'Aug 25, 2025',
  },
  {
    id: 3,
    text: 'Complete the project presentation',
    completed: false,
    priority: Priority.High,
    project: PROJECTS[1],
    createdAt: 'Aug 25, 2025',
  },
  {
    id: 4,
    text: 'Buy groceries for the week',
    completed: false,
    priority: Priority.Medium,
    project: PROJECTS[2],
    createdAt: 'Aug 25, 2025',
  },
  {
    id: 5,
    text: 'Schedule dentist appointment',
    completed: false,
    priority: Priority.Medium,
    project: PROJECTS[3],
    createdAt: 'Aug 25, 2025',
  },
  {
    id: 6,
    text: 'Review quarterly budget',
    completed: false,
    priority: Priority.High,
    project: PROJECTS[0],
    createdAt: 'Aug 25, 2025',
  },
  {
    id: 7,
    text: 'Book flight for vacation',
    completed: true,
    priority: Priority.Low,
    project: PROJECTS[2],
    createdAt: 'Aug 20, 2025',
  },
];
