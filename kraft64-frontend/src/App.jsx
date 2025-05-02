import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Wrapper to use useLocation inside Router
const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/dashboard';

  return (
    <>
      {!hideNavbar && <NavigationBar />}
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
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
