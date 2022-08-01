/* eslint-disable */
import Layout from '../components/Layout';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebaseConfig';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import Success from '../components/Success';
import Error from '../components/Error';

export default function Home() {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/profile');
    }
  }, []);

  function handleLogin() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        localStorage.user = JSON.stringify(user);
        setAuthUser(JSON.parse(localStorage.getItem('user')));
        setSuccess('User logged in successfully!');
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          router.reload();
        }, 3000);
      });
  }

  return (
    <Layout>
      {success && <Success msg={success} />}
      {errorMessage && <Error msg={errorMessage} />}
      <div className='max-w-sm mx-auto py-8'>
        <h1 className='font-bold text-gray-800 text-2xl text-center mb-5'>
          Sign in
        </h1>
        <ul>
          <li
            onClick={handleLogin}
            className='bg-blue-500 rounded p-2 cursor-pointer flex items-center relative'
          >
            <div className='bg-white text-black p-2 rounded'>
              <GoogleIcon />
            </div>
            <div className='text-white font-bold text-center w-full'>
              Sign in with Google
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
