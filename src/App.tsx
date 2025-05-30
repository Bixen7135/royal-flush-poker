import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import RulesPage from './pages/RulesPage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import CreateRoomPage from './pages/CreateRoomPage';
import ProfilePage from './pages/ProfilePage';
import TexasHoldemPage from './pages/TexasHoldemPage';
import OmahaPage from './pages/OmahaPage';
import SevenCardStudPage from './pages/SevenCardStudPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/games/texas-holdem" element={<TexasHoldemPage />} />
            <Route path="/games/omaha" element={<OmahaPage />} />
            <Route path="/games/seven-card-stud" element={<SevenCardStudPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-room" 
              element={
                <ProtectedRoute>
                  <CreateRoomPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/lobby" 
              element={
                <PrivateRoute>
                  <LobbyPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/game/:id" 
              element={
                <ProtectedRoute>
                  <GamePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App;