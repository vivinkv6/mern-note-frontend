import React from 'react';
import { Link } from 'react-router-dom';

interface NoteCardProps {
  title: string;
  content: string;
  image: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, image }) => {
  return (
    <Link to='/dashboard/1'>
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {image && <img src={image} alt="Banner" className="w-full h-32 object-cover" />}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
      <div className='flex justify-center gap-5 items-center m-3'>
      <Link to='/dashboard/1/delete' className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
        DELETE
      </Link>
      <Link to='/dashboard/1/update' className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
        UPDATE
      </Link>
      </div>
    </div>
    </Link>
  );
}

export default NoteCard;
