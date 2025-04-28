import { Link } from 'react-scroll';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">Kraft64</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto">
            <Link to="home" smooth={true} duration={800} className="nav-link">Home</Link>
            <Link to="about" smooth={true} duration={800} className="nav-link">About</Link>
            <Link to="contact" smooth={true} duration={800} className="nav-link">Contact</Link>
            <button className="btn btn-primary ms-3">Connect</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
