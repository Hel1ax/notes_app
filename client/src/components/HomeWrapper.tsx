import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores/rootStore';
import { auth } from '../stores/authStore';
import { Navigate } from 'react-router-dom';

/**
 * A React functional component that wraps its children with authentication and loading logic.
 *
 * @param {PropsWithChildren} props - The props object that contains the children to be wrapped.
 * @return {JSX.Element} The wrapped children or a loading or redirect component based on authentication state.
 */
const HomeWrapper: React.FC<PropsWithChildren> = (props) => {

    const dispatch = useDispatch<AppDispatch>();
    const loggedIn = useSelector((state: RootState) => state.auth.isAuthorized);
    const isInitializing = useSelector((state: RootState) => state.auth.isInitializing);

    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if (token)
            dispatch(auth());
    }, [dispatch, token]);

    if (isInitializing){
        return <div>Loading...</div>
    }else{
        if (!loggedIn){
            return <Navigate to="/sign-in" />
        }
        else{
            return <>{props.children}</>;
        }
    }
};

export default HomeWrapper;
