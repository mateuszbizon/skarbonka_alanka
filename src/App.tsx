import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Routes/Main';
import './css/index.css';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { AmountMoneyProvider } from './context/AmountMoneyContext';
import Notification from './components/Notification';

function App() {
  return (
    <AmountMoneyProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <Notification />
            <Routes>
              <Route path='/' element={<Main />} />
            </Routes>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </AmountMoneyProvider>
  );
}

export default App;
