import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import logo from '../../assets/home.svg';
import './Navbar.css';
import Button from '../Button/Button';

interface NavbarProps {
    onUpload?: (file: File) => void;
}

function Navbar({ onUpload }: NavbarProps) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
            setUsername(localStorage.getItem('username') || '');
        };
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUsername('');
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (onUpload) {
                onUpload(e.target.files[0]);
            }
            e.target.value = '';
        }
    };

    return (
    <nav className='navbar'>
        <div className='navbar_left'>
            <div className='navbar_home' onClick={() => {navigate("/")}}>
                <img src={logo} className="logo" alt="logo" />
            </div>
            
            {isAuthenticated && (
                <>
                    <input 
                        type="file" 
                        style={{ display: 'none' }} 
                        ref={fileInputRef}
                        accept="image/*,application/pdf" 
                        onChange={handleFileChange}
                    />
                    <Button name={"Upload"} onclick={handleUploadClick} />
                    <Button name={"Files"} onclick={() => navigate("/explorer")} />
                </>
            )}

        </div>

        <div className='navbar_right'>
            {isAuthenticated ? (
                <>
                    <span className='username'>{username}</span>
                    <Button name={"Log out"} onclick={handleLogout} />
                </>
            ) : (
                <Button name={"Sign in"} onclick={() => navigate("/auth")} />
            )}
        </div>
    </nav>
  );
};

export default Navbar;