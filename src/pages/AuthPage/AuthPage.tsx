import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import { Props } from '../../components/AuthForm/AuthForm';
import api from '../../api/axios';


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const navigate = useNavigate();

  const handleChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    try {
      await api.post('/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setIsLogin(true);
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Ошибка регистрации');
    }
  };

const handleLogin = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const loginData = new FormData();
    loginData.append('username', formData.email);
    loginData.append('password', formData.password);

    const response = await api.post('/login', loginData);
    
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('username', response.data.username); 

    navigate('/');
    window.location.reload();
  } catch (err: any) {
    alert('Ошибка входа');
  }
};

  
  const loginFormProps: Props = {
    title: "Login",
    lines: [
      { lineName: "Email", inputType: "email", isRequired: true, value: formData.email, onChange: handleChange('email') },
      { lineName: "Password", inputType: "password", isRequired: true, value: formData.password, onChange: handleChange('password') },
    ],
    button: { lineName: "Sign in", onclick: handleLogin },
    extraLine: <p>Don't have an account? <span className="auth_toggle" onClick={() => setIsLogin(false)}>Sign up</span></p>
  };

  const registerFormProps: Props = {
  title: "Registration",
  lines: [
    { lineName: "Username", inputType: "text", isRequired: true, minLength: 4, value: formData.username, onChange: handleChange('username') },
    { lineName: "Email", inputType: "email", isRequired: true, value: formData.email, onChange: handleChange('email') },
    { lineName: "Password", inputType: "password", isRequired: true, minLength: 8, value: formData.password, onChange: handleChange('password') },
    { lineName: "Repeat password", inputType: "password", isRequired: true, minLength: 8, value: formData.confirmPassword, onChange: handleChange('confirmPassword') },
  ],
  button: { lineName: "Create account", onclick: handleRegister },
  extraLine: <p>Already have an account? <span className="auth_toggle" onClick={() => setIsLogin(true)}>Sign in</span></p>
};

  return (
    <div className='auth_page'>
      <AuthForm {...(isLogin ? loginFormProps : registerFormProps)} />
    </div>
    );
}

export default AuthPage;
