import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
// import './App.css';
import Navbar from './components/Navbar/Navbar';
import Workspace from './components/Workspace/Workspace';
import Menu from './components/Menu/Menu';
import TempPage from './pages/temp_page';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/temp_page" element={<TempPage/>} />
        </Routes>
    </Router>
  );
}

export default App;
