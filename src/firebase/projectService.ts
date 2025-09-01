import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { Project } from '../../types';

const PROJECTS_COLLECTION = 'projects';

// Convert Firestore document to Project object
const convertFirestoreProject = (doc: any): Project => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    color: data.color,
  };
};

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(convertFirestoreProject);
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Subscribe to projects real-time updates
export const subscribeProjects = (callback: (projects: Project[]) => void) => {
  const projectsRef = collection(db, PROJECTS_COLLECTION);
  const q = query(projectsRef, orderBy('name'));
  
  return onSnapshot(q, (querySnapshot) => {
    const projects = querySnapshot.docs.map(convertFirestoreProject);
    callback(projects);
  }, (error) => {
    console.error('Error subscribing to projects:', error);
  });
};

// Add a new project
export const addProject = async (projectData: Omit<Project, 'id'>): Promise<string> => {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const docRef = await addDoc(projectsRef, projectData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

// Update a project
export const updateProject = async (id: string, updates: Partial<Omit<Project, 'id'>>): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectRef, updates);
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (id: string): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Available project colors
export const PROJECT_COLORS = [
  { id: 'purple', name: 'Purple', value: 'purple' },
  { id: 'blue', name: 'Blue', value: 'blue' },
  { id: 'green', name: 'Green', value: 'green' },
  { id: 'pink', name: 'Pink', value: 'pink' },
  { id: 'red', name: 'Red', value: 'red' },
  { id: 'yellow', name: 'Yellow', value: 'yellow' },
  { id: 'indigo', name: 'Indigo', value: 'indigo' },
  { id: 'orange', name: 'Orange', value: 'orange' },
];