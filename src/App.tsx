import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Routes/Main';
import AmountDebt from './Routes/AmountDebt';
import './css/index.css';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { AmountMoneyProvider } from './context/AmountMoneyContext';
import Notification from './components/Notification';
import AuthRoutes from './utils/AuthRoutes';

function App() {
  return (
    <AmountMoneyProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <Notification />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route element={<AuthRoutes />}>
                <Route path='/person/:id' element={<AmountDebt />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </AmountMoneyProvider>
  );
}

export default App;
