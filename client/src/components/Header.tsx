import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../stores/authStore';
import { AppDispatch } from '../stores/rootStore';
import { RootState } from '../stores/rootStore';

/**
 * Renders the header component of the application.
 *
 * @return {ReactElement} The header component.
 */
const Header: React.FC = () => {
  const loggedIn = useSelector((state : RootState) => state.auth.isAuthorized);
  const dispatch = useDispatch<AppDispatch>();

    /**
   * Handles the sign out action by dispatching the signOut action from the authStore.
   *
   * @return {void} This function does not return anything.
   */
  const handleSignOut = () => {
      dispatch(signOut()) 
  };

  const listyles = "hover:text-gray-400 pr-4"

  return (
    <header className="bg-gray-800 text-white p-5" >
        <nav className='text-lg'>
            <ul className='flex flex-row justify-end'>
            <li><Link to="/" className={listyles}>Home</Link></li>
            <li><Link to="/sign-in" className={listyles}>Sign In</Link></li>
            <li><Link to="/sign-up" className={listyles}>Sign Up</Link></li>
            {loggedIn && <li ><button onClick={handleSignOut} className={listyles}>Sign Out</button></li>}
            </ul>
        </nav>
    </header>
  );
};

export default Header;
