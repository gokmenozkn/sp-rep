import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { createTaskObject } from './TaskObject';

export class Services {
  static async Update(id, repetition, isDone) {
    const ref = doc(db, 'tasks', id);

    switch (repetition) {
      case 'firstRepetition': {
        try {
          await updateDoc(ref, {
            'firstRepetition.isDone': isDone,
          });
          console.log('First updated');
        } catch (error) {
          console.log('Error:', error);
        }
        break;
      }
      case 'secondRepetition': {
        try {
          await updateDoc(ref, {
            'secondRepetition.isDone': isDone,
          });
          console.log('Second updated');
        } catch (error) {
          console.log('Error:', error);
        }
        break;
      }
      case 'thirdRepetition': {
        try {
          await updateDoc(ref, {
            'thirdRepetition.isDone': isDone,
          });
          console.log('Third updated');
        } catch (error) {
          console.log('Error:', error);
        }
        break;
      }
      case 'fourthRepetition': {
        try {
          await updateDoc(ref, {
            'fourthRepetition.isDone': isDone,
          });
          console.log('Fourth updated');
        } catch (error) {
          console.log('Error:', error);
        }
        break;
      }
      default:
        return;
    }
  }

  static async AddTask(taskName, userId) {
    try {
      const data = createTaskObject(taskName, userId);
      const docRef = await addDoc(collection(db, 'tasks'), data);
      console.log('New task added:', taskName);
    } catch (e) {
      console.log('Error:', e);
    }
  }

  static async Delete(id) {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      console.log('Task is deleted with id:', id);
    } catch (e) {
      console.log("Error while deleting the task with id:", id);
    }
  }
}
