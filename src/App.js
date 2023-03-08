import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const testFunction = async () => {
    const response = await fetch('/test_route');
  }
  testFunction()
  
  return (
    <div className="App">
      {/* <Taskbar /> */}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
