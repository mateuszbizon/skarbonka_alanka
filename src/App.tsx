import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Routes/Main';
import './css/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
