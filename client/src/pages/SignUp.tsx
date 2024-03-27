import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, signUp } from '../stores/authStore';
import { AppDispatch, RootState } from '../stores/rootStore';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/Header';

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name:'', email: '', password: '' });
  const [errors, setErrors] = useState({ name:'', email: '', password: '' });
  const loggedIn = useSelector((state: RootState) => state.auth.isAuthorized as boolean);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loggedIn) 
        navigate('/');
}, [loggedIn, navigate])

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Проверка валидности email
    if (!formData.email.includes('@')) {
      setErrors({ ...errors, email: 'Invalid email address' });
      return;
    }
    // Проверка валидности пароля
    if (formData.password.length < 6) {
      setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
      return;
    }
    // Очистка ошибок, если они были
    setErrors({ name:'',  email: '', password: '' });
    // Отправка данных для регистрации
    dispatch(signUp(formData)).then(() => dispatch(auth()));
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <input type="name" name="name" value={formData.name} onChange={handleInputChange} />
        {errors.name && <span>{errors.name}</span>}
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        {errors.email && <span>{errors.email}</span>}
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        {errors.password && <span>{errors.password}</span>}
        <button type="submit" >Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
