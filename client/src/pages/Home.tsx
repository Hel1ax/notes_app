import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../stores/noteStore';
import { Note } from '../types/Notes';
import { AppDispatch, RootState } from '../stores/rootStore';
import Header from 'components/Header';
import NoteDetails from '../components/NoteDetails'; 
import CreateNoteForm from 'components/CreateNoteForm';

/**
 * A React functional component that renders the home page of the application.
 *
 * @return {JSX.Element} The rendered home page component.
 */
const Home: React.FC = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const notes = useSelector((state: RootState) => state.note.notes as Note[]);
    const loggedIn = useSelector((state: RootState) => state.auth.isAuthorized as boolean);
    const name = useSelector((state: RootState) => state.auth.name as string);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    /**
     * Updates the selected note state with the provided note.
     *
     * @param {Note} note - The note to be selected.
     * @return {void} This function does not return anything.
     */
    const handleNoteClick = (note: Note) => {
        setSelectedNote(note);
    };    
    /**
     * Closes the details view by setting the selected note to null.
     *
     * @return {void} This function does not return anything.
     */
    const handleCloseNoteDetails = () => {
        setSelectedNote(null);
    };

    if (!loggedIn){
        return <div><Header /></div>
    }

    return (
        <div>
            <Header />
            <h2 className="text-6xl font-main text-center mt-5 font-light">
				{name}
			</h2>
            <div className="flex flex-col items-center">
                    <CreateNoteForm />
                    {notes.map((note) => (
                        <div 
                            key={note.id} 
                            onClick={() => handleNoteClick(note)} 
                            className="flex flex-col border-slate-500 border-2 rounded-lg p-2 m-2 items-center w-2/5 cursor-pointer hover:bg-slate-300 ease-linear duration-200"
                        > 
                            <h3 className="text-3xl font-main font-light">{note.title}</h3>
                            <p className="text-xl font-main font-light">{note.content}</p>
                        </div>
                    ))}
                </div>     
            {selectedNote && (
                <NoteDetails note={selectedNote} onClose={handleCloseNoteDetails} />
            )}
        </div>
    );
};

export default Home;
