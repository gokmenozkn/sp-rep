import { TrashIcon } from '@heroicons/react/solid';
import { Services } from '../helpers/Services';
import Link from 'next/link';

export default function ListItem({ task }) {
  const { taskName, id } = task;

  return (
    <li className='flex items-center justify-between mb-4 py-3 px-5 border-2 border-gray-100 rounded-md hover:bg-gray-100'>
      <Link href={`/task/${id}`}>
        <a className='hover:font-bold hover:text-gray-700'>{taskName}</a>
      </Link>
      <TrashIcon
        className='w-5 h-5 cursor-pointer'
        onClick={() => Services.Delete(id)}
      />
    </li>
  );
}
