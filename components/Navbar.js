import { useRouter } from 'next/router';
import { useAuthContext } from '../context/AuthContext';
import { Fragment } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { Menu, Transition } from '@headlessui/react';

export default function Navbar() {
  const router = useRouter();
  const { authUser, setAuthUser } = useAuthContext();

  const auth = getAuth();
  function SignOut() {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
        localStorage.removeItem('user');
        router.push('/');
      })
      .catch((err) => console.log(err));
  }

  return (
    <nav className='bg-gray-800'>
      <div className='max-w-6xl mx-auto'>
        <div className='relative flex items-center justify-between h-16'>
          <h1
            onClick={() => router.push('/')}
            className='text-white text-xl uppercase font-bold cursor-pointer'
          >
            Spaced Repetition
          </h1>
          {authUser && (
            <Menu as='div' className='relative'>
              <Menu.Button className='block rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                {/* eslint-disable-next-line */}
                <img
                  src='/profile_icon.png'
                  className='w-8 h-8 rounded-full'
                  alt='Profile icon'
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <Menu.Item>
                    <div className='px-4 py-2 font-bold text-gray-700'>
                      {authUser.displayName}
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      onClick={() => router.push('/profile')}
                      className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                    >
                      Your profile
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      onClick={SignOut}
                      className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                    >
                      Sign Out
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}
