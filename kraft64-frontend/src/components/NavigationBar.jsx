import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  // Check if on the homepage to enable smooth scrolling
  const isHomePage = location.pathname === "/";

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={RouterLink} to="/">Kraft64</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto">
            {isHomePage ? (
              <>
                <ScrollLink
                  to="home"
                  smooth={true}
                  duration={800}
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                >
                  Home
                </ScrollLink>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={800}
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                >
                  About
                </ScrollLink>
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={800}
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                >
                  Contact
                </ScrollLink>
              </>
            ) : (
              <>
                <RouterLink to="/" className="nav-link">Home</RouterLink>
              </>
            )}

            <RouterLink to="/signup" className="btn btn-primary ms-3">
              Connect
            </RouterLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
