import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { Todo, Priority } from '../types';

const TODOS_COLLECTION = 'todos';

// Convert Firestore document to Todo object
const convertFirestoreTodo = (doc: any): Todo => {
  const data = doc.data();
  return {
    id: doc.id,
    text: data.text,
    completed: data.completed,
    priority: data.priority,
    project: data.project,
    createdAt: data.createdAt?.toDate?.()?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) || data.createdAt,
    dueDate: data.dueDate?.toDate?.()?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) || data.dueDate,
  };
};

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const todosRef = collection(db, TODOS_COLLECTION);
    const q = query(todosRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(convertFirestoreTodo);
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Subscribe to todos real-time updates
export const subscribeTodos = (callback: (todos: Todo[]) => void) => {
  const todosRef = collection(db, TODOS_COLLECTION);
  const q = query(todosRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const todos = querySnapshot.docs.map(convertFirestoreTodo);
    callback(todos);
  }, (error) => {
    console.error('Error subscribing to todos:', error);
  });
};

// Add a new todo
export const addTodo = async (todoData: Omit<Todo, 'id'>): Promise<string> => {
  try {
    const todosRef = collection(db, TODOS_COLLECTION);
    const docData = {
      ...todoData,
      createdAt: todoData.createdAt ? new Date(todoData.createdAt) : Timestamp.now(),
      dueDate: todoData.dueDate ? new Date(todoData.dueDate) : null,
    };
    
    const docRef = await addDoc(todosRef, docData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<void> => {
  try {
    const todoRef = doc(db, TODOS_COLLECTION, id);
    const updateData: any = { ...updates };
    
    // Convert date strings back to Date objects for Firestore
    if (updates.createdAt) {
      updateData.createdAt = new Date(updates.createdAt);
    }
    if (updates.dueDate) {
      updateData.dueDate = new Date(updates.dueDate);
    }
    
    await updateDoc(todoRef, updateData);
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Toggle todo completion status
export const toggleTodo = async (id: string, completed: boolean): Promise<void> => {
  try {
    const todoRef = doc(db, TODOS_COLLECTION, id);
    await updateDoc(todoRef, { completed });
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const todoRef = doc(db, TODOS_COLLECTION, id);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

// Get todos by project
export const getTodosByProject = async (projectId: string): Promise<Todo[]> => {
  try {
    const todosRef = collection(db, TODOS_COLLECTION);
    const q = query(
      todosRef, 
      where('project.id', '==', projectId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(convertFirestoreTodo);
  } catch (error) {
    console.error('Error fetching todos by project:', error);
    throw error;
  }
};

// Get todos by completion status
export const getTodosByStatus = async (completed: boolean): Promise<Todo[]> => {
  try {
    const todosRef = collection(db, TODOS_COLLECTION);
    const q = query(
      todosRef,
      where('completed', '==', completed),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(convertFirestoreTodo);
  } catch (error) {
    console.error('Error fetching todos by status:', error);
    throw error;
  }
};