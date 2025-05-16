import { Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RESET_LOGIN, resetLogin } from "../redux/actions/loginActions";

function MyNav() {
  const organization_id = useSelector((state) => state.login.id); // recupero l'id del'azienda dallo store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-light fixed-top">
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
                {organization_id ? (
                  <NavDropdown.Item as={Link} to={`/organization/${organization_id}`}>
                    Profilo
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>Profilo</NavDropdown.Item>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(resetLogin());
                    setTimeout(() => {
                      navigate("/allOrganizations");
                    }, 500);
                  }}
                >
                  Esci
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNav;
