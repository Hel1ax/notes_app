import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {   signOut } from '../stores/authStore';
import { AppDispatch } from '../stores/rootStore';
import { RootState } from '../stores/rootStore';


const Header: React.FC = () => {
  const loggedIn = useSelector((state : RootState) => state.auth.isAuthorized);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
      dispatch(signOut()) 
  };

  return (
    <header>
        <nav>
            <ul>

            <li><Link to="/">Home</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
            {loggedIn && <li><button onClick={handleSignOut}>Sign Out</button></li>}
            </ul>
        </nav>
    </header>
  );
};

export default Header;
