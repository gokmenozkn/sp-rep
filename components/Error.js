import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function Error({ msg = 'Something went wrong!' }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      className='relative z-10'
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >

      {/* Fullscreen container */}
      <div className='fixed inset-0 flex justify-center'>
        <Dialog.Panel className='shadow-lg w-96 rounded-lg text-center bottom-5 absolute flex'>
          <div className='bg-red-700 py-4 px-6 rounded-l-lg text-white flex items-center'>
            <CloseIcon />
          </div>
          <div className='px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200'>
            <Dialog.Title>{msg}</Dialog.Title>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
