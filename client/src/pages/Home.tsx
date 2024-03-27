import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, deleteNote } from '../stores/noteStore';
import { Note } from '../stores/noteStore';
import { AppDispatch, RootState } from '../stores/rootStore';
import Header from 'components/Header';
import NoteDetails from './NoteDetails'; 
import CreateNoteForm from 'components/CreateNoteForm';
import { auth } from 'stores/authStore';

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notes = useSelector((state: RootState) => state.note.notes as Note[]);
    const loggedIn = useSelector((state: RootState) => state.auth.isAuthorized as boolean);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            dispatch(auth());
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (loggedIn) {
            dispatch(getNotes());
        }
    }, [dispatch, loggedIn]);

    const handleDeleteNote = (noteId: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation(); 
        dispatch(deleteNote(noteId));
    };

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note);
    };

    const handleCloseNoteDetails = () => {
        setSelectedNote(null);
    };

    if (!loggedIn){
        return <div><Header /></div>
    }

    return (
        <div>
            <Header />
            {loggedIn && (
                <div>
                    <CreateNoteForm />
                    {notes.map((note) => (
                        <div key={note.id} onClick={() => handleNoteClick(note)}> 
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <button onClick={(event) => handleDeleteNote(note.id, event)}>Delete Note</button>
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
