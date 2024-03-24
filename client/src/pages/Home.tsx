import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, addNote, deleteNote } from '../stores/noteStore';
import { Note } from '../stores/noteStore';
import { AppDispatch, RootState } from '../stores/rootStore';
import Header from 'components/Header';
import NoteDetails from './NoteDetails'; 
import { useNavigate } from 'react-router-dom'; // Используем useNavigate для редиректа

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notes = useSelector((state: RootState) => state.note.notes as Note[]);
    const loggedIn = useSelector((state: RootState) => state.auth.isAuthorized);
    const nav = useNavigate(); // Используем useNavigate для редиректа

    useEffect(() => {
        loggedIn && dispatch(getNotes());   
    }, [dispatch, loggedIn]);

    const handleAddNote = () => {
        dispatch(addNote());
    };

    const handleDeleteNote = (noteId: number) => {
        dispatch(deleteNote(noteId));
    };

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note);
    };

    const handleCloseNoteDetails = () => {
        setSelectedNote(null);
    };

    useEffect(() => {
        if (!loggedIn) {
            nav('/sign-in');
        }
    }, [loggedIn, nav]);

    return (
        <div>
            <Header />
            {loggedIn && (
                <div>
                    <button onClick={handleAddNote}>Add Note</button>
                    {notes.map((note) => (
                        <div key={note.id} onClick={() => handleNoteClick(note)}> 
                            <h3>{note.title}</h3>
                            <p>{note.text}</p>
                            <button onClick={() => handleDeleteNote(note.id)}>Delete Note</button>
                        </div>
                    ))}
                </div>
            )}
            
            {selectedNote && (
                <NoteDetails note={selectedNote} onClose={handleCloseNoteDetails} />
            )}
        </div>
    );
};

export default Home;
