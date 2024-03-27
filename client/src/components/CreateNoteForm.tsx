// CreateNoteForm.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../stores/noteStore';
import { AppDispatch } from 'stores/rootStore';

const CreateNoteForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      dispatch(addNote(title, content));
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create Note</button>
    </form>
  );
};

export default CreateNoteForm;
export {}