import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';
import ListItem from '../components/ListItem';
import { useAuthContext } from '../context/AuthContext';
import { useTaskContext } from '../context/TaskContext';
import { Services } from '../helpers/Services';

export default function Profile() {
  const [task, setTask] = useState('');
  const { authUser } = useAuthContext();
  const { tasks } = useTaskContext();
  const authUserTasks = tasks.filter((t) => t.userId === authUser?.uid);

  async function addTask(e) {
    e.preventDefault();

    if (task === '') {
      alert('Please enter a task name!');
    } else {
      Services.AddTask(task, authUser.uid);
      setTask('');
    }
  }

  if (!authUser) {
    return (
      <Layout>
        <div className='max-w-6xl py-8 mx-auto'>
          <div className='border-2 border-gray-200 rounded py-8 text-center'>
            <h1 className='text-3xl text-center mb-5'>You must log in!</h1>
            <Link href='/'>
              <a className='inline-block hover:bg-indigo-400 bg-indigo-500 px-4 py-2 text-lg uppercase text-white font-bold rounded'>
                Login
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='max-w-6xl mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-5'>
          Create New Task
        </h1>

        {/*
         * Add Button
         */}
        <form className='mb-10' onSubmit={addTask}>
          <div id='formGroup' className='flex'>
            <input
              type='text'
              className='border-gray-300 border-2 w-full rounded-md outline-0 px-5 py-3 mr-4'
              value={task}
              onInput={(e) => setTask(e.target.value)}
            />
            <button
              type='submit'
              className='bg-indigo-600 hover:bg-indigo-700 text-white w-1/5 rounded-md font-bold uppercase text-lg'
            >
              Create
            </button>
          </div>
        </form>

        {/*
         * Task List
         */}
        <ul>
          {authUser &&
            authUserTasks.map((task, i) => <ListItem key={i} task={task} />)}
        </ul>
      </div>
    </Layout>
  );
}
