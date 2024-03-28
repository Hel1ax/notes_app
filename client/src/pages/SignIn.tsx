import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, signIn } from '../stores/authStore';
import { AppDispatch, RootState } from '../stores/rootStore';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Используем useHistory для редиректа
import Header from 'components/Header';

const SignInPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '', auth: '' });
    const loggedIn = useSelector((state: RootState) => state.auth.isAuthorized as boolean);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors({ email: '', password: '', auth: '' });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (loggedIn) 
            navigate('/');
    }, [loggedIn, navigate])

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.email.includes('@')) {
            setErrors({ ...errors, email: 'Invalid email address' });
            return;
        }
        if (formData.password.length < 6) {
            setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
            return;
        }

        setErrors({ email: '', password: '', auth: '' });
        dispatch(signIn(formData))
        
        .then(() => dispatch(auth()))
        .then(() => {
            if (!loggedIn){
                setErrors({ ...errors, auth: 'Invalid email or password' });
            }
        })
    };

    return (
        <div>
            <Header />
            <h2 className="text-6xl text-center mt-5 font-light">Sign In</h2>
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col w-96 mx-auto border-slate-500 border-2 rounded-lg p-2 m-5 items-center"
            >
                {errors.auth && <span className='text-red-600'>{errors.auth}</span>}
                <input 
                    placeholder='Email'
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className='border-b-2 border-black px-3 py-2 text-2xl mb-4 hover:placeholder-gray-500 ease-linear duration-200'
                />
                {errors.email && <span className='text-red-600'>{errors.email}</span>}
                <input 
                    placeholder='Password'
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    className='border-b-2 border-black px-3 py-2 text-2xl mb-4 hover:placeholder-gray-500 ease-linear duration-200'
                />
                {errors.password && <span className='text-red-600'>{errors.password}</span>}

                <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-800 ease-linear duration-100 text-white font-bold py-2 px-4 rounded w-1/2 "
                >
                    Sign In
                </button>

            </form>
        </div>
    );
};

export default SignInPage;
