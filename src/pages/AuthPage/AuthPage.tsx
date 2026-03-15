import { useState } from 'react';
import './AuthPage.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import { Props } from '../../components/AuthForm/AuthForm';


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  let loginForm: Props = {
    title: "Login",
    lines: [
      {lineName: "Username", inputType: "text", isRequired: true, minLength: 4},
      {lineName: "Password", inputType: "password", isRequired: true},
    ],
    button: {lineName: "Sign in", onclick: () => {}},
    extraLine: <p>Don't have an account? <span onClick={() => {setIsLogin(false)}}>Sign up</span></p>
  };

  let registerForm: Props = {
    title: "Registration",
    lines: [
      {lineName: "Username", inputType: "text", isRequired: true, minLength: 4},
      {lineName: "Email", inputType: "email", isRequired: true},
      {lineName: "Password", inputType: "password", isRequired: true, minLength: 8},
      {lineName: "Repeat password", inputType: "password", isRequired: true, minLength: 8},
    ],
    button: {lineName: "Create account", onclick: () => {}},
    extraLine: <p>Have already an account? <span onClick={() => {setIsLogin(true)}}>Sign in</span></p>
  };

  return (
    <div className='auth_page'>
      {isLogin ?
      (<AuthForm {...loginForm}/>) : 
      (<AuthForm {...registerForm}/>)}
      </div>
    );
}

export default AuthPage;
