import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Note } from '../stores/noteStore';
import { updateNote, deleteNote } from '../stores/noteStore';
import { AppDispatch } from '../stores/rootStore';

interface Props {
  note: Note;
  onClose: () => void; // Функция для закрытия компонента просмотра заметки
}

const NoteDetails: React.FC<Props> = ({ note, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedNote, setEditedNote] = useState(note);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNote({
      ...editedNote,
      title: e.target.value
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedNote({
      ...editedNote,
      text: e.target.value
    });
  };

  const handleSave = () => {
    dispatch(updateNote(editedNote));
    onClose(); // Закрыть компонент просмотра после сохранения
  };

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
    onClose(); // Закрыть компонент просмотра после удаления
  };

  return (
    <div>
      <input type="text" value={editedNote.title} onChange={handleTitleChange} />
      <textarea value={editedNote.text} onChange={handleTextChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NoteDetails;