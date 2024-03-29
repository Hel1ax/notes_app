import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Note } from '../types/Notes';
import { updateNote, deleteNote } from '../stores/noteStore';
import { AppDispatch } from '../stores/rootStore';

interface Props {
  note: Note;
  onClose: () => void; 
}

const NoteDetails: React.FC<Props> = ({ note, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNote({
      ...editedNote,
      title: e.target.value
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedNote({
      ...editedNote,
      content: e.target.value
    });
  };

  const handleSave = () => {
    dispatch(updateNote(editedNote));
    onClose(); 
  };

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
    onClose(); 
  };

  return (
    <div className="flex flex-col w-80 mx-auto border-slate-500 border-2 rounded-lg p-2 m-5 items-center">
      <input 
        type="text" 
        data-testid="note-details-input"
        value={editedNote.title} 
        onChange={handleTitleChange} 
        className="border-b-2 border-black px-3 py-2 text-2xl mb-4 hover:placeholder-gray-500 ease-linear duration-200"
      />
      <textarea 
        value={editedNote.content} 
        data-testid="note-details-textarea"
        onChange={handleTextChange} 
        className="border-b-2 border-black px-3 py-2 text-xl mb-4 w-full hover:placeholder-gray-500 ease-linear duration-200"
        />
      <div className="flex flex-row">
      <button 
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-800 ease-linear duration-100 text-white font-bold py-2 px-4 m-1 rounded w-1/2 "
      >
        Save
      </button>
      <button 
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-800 ease-linear duration-100 text-white font-bold py-2 px-4 m-1 rounded w-1/2 "
      >
        Delete
      </button>
      </div>
    </div>
  );
};

export default NoteDetails;