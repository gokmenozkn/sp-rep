import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useTaskContext } from '../../context/TaskContext';
import { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext'
import { Services } from '../../helpers/Services';

export default function Task() {
  const { tasks } = useTaskContext();
  const { authUser } = useAuthContext();
  const router = useRouter();
  const { id } = router.query;
  const foundTask = tasks.find((t) => t.id === id);

  const [isFirstChecked, setIsFirstChecked] = useState(
    foundTask?.firstRepetition.isDone
  );

  const [isSecondChecked, setIsSecondChecked] = useState(
    foundTask?.secondRepetition.isDone
  );

  const [isThirdChecked, setIsThirdChecked] = useState(
    foundTask?.thirdRepetition.isDone
  );

  const [isFourthChecked, setIsFourthChecked] = useState(
    foundTask?.fourthRepetition.isDone
  );

  const firstRepDay = foundTask?.firstRepetition.date
    .toDate()
    .toLocaleDateString();

  const secondRepDay = foundTask?.secondRepetition.date
    .toDate()
    .toLocaleDateString();

  const thirdRepDay = foundTask?.thirdRepetition.date
    .toDate()
    .toLocaleDateString();

  const fourthRepDay = foundTask?.fourthRepetition.date
    .toDate()
    .toLocaleDateString();

  useEffect(() => {
    if (!authUser) {
      router.push('/');
    }
  }, []);

  return (
    <Layout>
      <div className='max-w-6xl mx-auto py-8'>
        <h5
          onClick={() => router.back()}
          className='inline-block mb-8 text-cyan-800 hover:text-cyan-500 cursor-pointer'
        >
          Geri
        </h5>

        <h3 className='mb-4 text-purple-900 font-bold text-2xl'>
          {foundTask?.taskName}
        </h3>
        {/* Table */}
        <div className='overflow-x-auto relative rounded-md'>
          <table className='table-auto w-full text-md text-left'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
              <tr>
                <th className='py-3 px-6'>{firstRepDay}</th>
                <th className='py-3 px-6'>{secondRepDay}</th>
                <th className='py-3 px-6'>{thirdRepDay}</th>
                <th className='py-3 px-6'>{fourthRepDay}</th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white border-b border-gray-300'>
                <td className='py-4 px-6'>
                  <input
                    type='checkbox'
                    className='w-5 h-5 rounded'
                    defaultChecked={isFirstChecked}
                    onChange={() => setIsFirstChecked(!isFirstChecked)}
                    onClick={() =>
                      Services.Update(id, 'firstRepetition', !isFirstChecked)
                    }
                  />
                </td>
                <td className='py-4 px-6'>
                  <input
                    type='checkbox'
                    defaultChecked={isSecondChecked}
                    onChange={() => setIsSecondChecked(!isSecondChecked)}
                    onClick={() =>
                      Services.Update(id, 'secondRepetition', !isSecondChecked)
                    }
                    className='w-5 h-5'
                  />
                </td>
                <td className='py-4 px-6'>
                  <input
                    type='checkbox'
                    className='w-5 h-5 rounded'
                    defaultChecked={isThirdChecked}
                    onChange={() => setIsThirdChecked(!isThirdChecked)}
                    onClick={() =>
                      Services.Update(id, 'thirdRepetition', !isThirdChecked)
                    }
                  />
                </td>
                <td className='py-4 px-6'>
                  <input
                    type='checkbox'
                    defaultChecked={isFourthChecked}
                    onChange={() => setIsFourthChecked(!isFourthChecked)}
                    onClick={() =>
                      Services.Update(id, 'fourthRepetition', !isThirdChecked)
                    }
                    className='w-5 h-5 rounded'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
