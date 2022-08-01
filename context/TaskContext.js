import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const Context = createContext();

export const useTaskContext = () => useContext(Context);

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, 'tasks'), (snapShot) => {
      setTasks(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  const value = {
    tasks,
    setTasks,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
