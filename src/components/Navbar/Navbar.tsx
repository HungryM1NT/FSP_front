import React from 'react';
import logo from '../../assets/home.svg';
import './Navbar.css';
import Button from '../Button/Button';

function Navbar() {
  return (
    <nav className='navbar'>
        <div className='navbar_left'>
            <a className='navbar_home' href="/">
                <img src={logo} className="logo" alt="logo" />
            </a>
            <Button
                name={"Upload"}
            />
        </div>
        <div className='navbar_right'>
            <span className='username'>Ilya Ablyazov</span>
            <Button
                name={"Log out"}
            />
        </div>
    </nav>
  );
};

export default Navbar;