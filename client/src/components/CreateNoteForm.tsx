import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../stores/noteStore';
import { AppDispatch } from 'stores/rootStore';

const CreateNoteForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      dispatch(addNote(title, content));
      setTitle('');
      setContent('');
      setError(''); 
    } else {
      setError('Title and content cannot be empty'); 
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col w-80 mx-auto border-slate-500 border-2 rounded-lg p-2 m-5 items-center">

      

      <input
        className="border-b-2 border-black px-3 py-2 text-2xl mb-4 hover:placeholder-gray-500 ease-linear duration-200"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border-b-2 border-black px-3 py-2 text-xl mb-4 w-full hover:placeholder-gray-500 ease-linear duration-200"
        placeholder="Text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-800 ease-linear duration-100 text-white font-bold py-2 px-4 rounded w-1/2 ">
        Create Note
      </button>

    </form>
  );
};

export default CreateNoteForm;
