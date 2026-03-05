import { useState } from 'react';
import './AuthPage.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import { Props } from '../../components/AuthForm/AuthForm';


const loginForm: Props = {
  title: "Log in",
  lines: [
    {lineName: "Username", inputType: "text", isRequired: true, minLength: 4},
    {lineName: "Password", inputType: "password", isRequired: true},
  ]
};

const registerForm: Props = {
  title: "Registration",
  lines: [
    {lineName: "Username", inputType: "text", isRequired: true, minLength: 4},
    {lineName: "Email", inputType: "email", isRequired: true},
    {lineName: "Password", inputType: "password", isRequired: true, minLength: 8},
    {lineName: "Repeat password", inputType: "password", isRequired: true, minLength: 8},
  ]
};

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {!isLogin ?
      (<AuthForm {...loginForm}/>) : 
      (<AuthForm {...registerForm}/>)}
      </>
    );
}

export default AuthPage;
