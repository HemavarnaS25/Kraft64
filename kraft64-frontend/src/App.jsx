import NavigationBar from './components/Navbar';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <div>
      <NavigationBar />
      <Home />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;