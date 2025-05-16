import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TrainerDashboard from './components/TrainerDashboard';  
import '@fortawesome/fontawesome-free/css/all.min.css';

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname === '/'; 

  return (
    <>
      {showNavbar && <NavigationBar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Gallery />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
      </Routes>
    </>
  );
};


const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;