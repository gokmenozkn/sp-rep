import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { useAuthContext } from './AuthContext';

const Context = createContext();

export const useTaskContext = () => useContext(Context);

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      onSnapshot(collection(db, 'tasks'), (snapShot) => {
        setTasks(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          );
        });
      }
  /* eslint-disable-next-line */
  }, []);
  
  useEffect(() => {
    if (authUser) {
      onSnapshot(collection(db, 'tasks'), (snapShot) => {
        setTasks(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          );
        });
      }
  /* eslint-disable-next-line */
  }, [authUser]);

  const value = {
    tasks,
    setTasks,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
