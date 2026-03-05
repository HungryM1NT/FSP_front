import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './HomePage.css';
import Navbar from '../../components/Navbar/Navbar';
import Workspace from '../../components/Workspace/Workspace';
import Menu from '../../components/Menu/Menu';

function HomePage() {
  return (
    <div className="container">
      <Navbar />
      <Menu />
      <Workspace />
    </div>
  );
}

export default HomePage;
