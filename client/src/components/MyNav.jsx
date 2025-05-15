import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function MyNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-dark">
            YOVENDO
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/addOrganization" className="text-decoration-none">
              <Button className="linkButton text-dark bg-transparent border-0 rounded-0">Registra azienda</Button>
            </Link>
            <Link to="/allOrganizations" className="text-decoration-none">
              <Button className="linkButton text-dark bg-transparent border-0 rounded-0">Aziende</Button>
            </Link>

            <NavDropdown title="Accedi" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Documenti</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Profilo</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Esci</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
