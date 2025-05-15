import { Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function MyNav() {
  return (
    <Navbar expand="lg" className="bg-white fixed-top">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-dark">
            <Image fluid src={logo} style={{ width: "123px", height: "33.45px" }} />
          </Link>
        </Navbar.Brand>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/addOrganization" className="text-decoration-none" style={{ marginInlineStart: "40px" }}>
                <Button className="linkButton text-dark bg-transparent border-0 rounded-0">Registra azienda</Button>
              </Link>
              <Link to="/allOrganizations" className="text-decoration-none" style={{ marginInlineStart: "40px" }}>
                <Button className="linkButton text-dark bg-transparent border-0 rounded-0">Aziende</Button>
              </Link>

              <NavDropdown title="Accedi" id="basic-nav-dropdown" style={{ marginInlineStart: "40px" }}>
                <NavDropdown.Item as={Link} to={`/login`}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item>Profilo</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Esci</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNav;
