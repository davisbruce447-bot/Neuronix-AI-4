import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import UpgradePage from './pages/UpgradePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { CreditProvider } from './contexts/CreditContext';

const App: React.FC = () => {
  return (
    <CreditProvider>
      <div className="min-h-screen bg-brand-bg font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/upgrade" 
              element={
                <ProtectedRoute>
                  <UpgradePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </CreditProvider>
  );
};

export default App;
