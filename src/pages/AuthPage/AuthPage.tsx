import { useState } from 'react';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? (<div>login</div>) : (<div>register</div>)}
        {/* <div>adsada</div> */}
    </>
  );
}

export default AuthPage;
