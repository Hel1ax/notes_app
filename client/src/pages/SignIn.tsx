import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, signIn } from '../stores/authStore';
import { AppDispatch } from '../stores/rootStore';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Используем useHistory для редиректа
import Header from 'components/Header';

const SignInPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); // Используем useHistory для редиректа
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Валидация email и пароля
        if (!formData.email.includes('@')) {
            setErrors({ ...errors, email: 'Invalid email address' });
            return;
        }
        if (formData.password.length < 6) {
            setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
            return;
        }
        // Очистка ошибок, если они были
        setErrors({ email: '', password: '' });
        dispatch(signIn(formData)).then(() => dispatch(auth())).then(() => navigate('/'));
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                {errors.email && <span>{errors.email}</span>}
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                {errors.password && <span>{errors.password}</span>}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;
