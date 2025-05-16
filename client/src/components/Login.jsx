import { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_USER_ID, getUserID } from "../redux/actions/loginActions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // funzione di login
  const checkUserLogin = async (username) => {
    try {
      const response = await fetch(`/api/organizations/${username}`);
      if (response.ok) {
        const organization = await response.json();
        // viene salvato l'id dell'organizzazione nello store
        dispatch(getUserID(organization.organization.id));
        setTimeout(() => {
          navigate(`/organization/${organization.organization.id}`);
        }, 500);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // stato che controlla i valori del form
  const [orgazinationLogin, setOrgazinationLogin] = useState({
    username: "",
    password: ""
  });

  //stato che controlla se tutti i valori del form sono stati compilati
  const [formCompleted, setFormCompleted] = useState(false);

  useEffect(() => {
    const { username, password } = orgazinationLogin;
    setFormCompleted(!!(username.trim() && password.trim()));
  }, [orgazinationLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOrgazinationLogin({
      username: e.target.elements.usernameRegistration.value,
      password: e.target.elements.passwordRegistration.value
    });

    const username = e.target.elements.usernameRegistration.value;

    await checkUserLogin(username);

    // reset del form
    setTimeout(() => {
      setOrgazinationLogin({
        username: "",
        password: ""
      });
    }, 300);
  };

  return (
    <Container>
      <Row style={{ marginTop: "50px" }}>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Row>
                <Form.Label className="fs-3 fw-semibold text-primary-emphasis">Login</Form.Label>
              </Row>

              {/* username */}
              <FloatingLabel label="Username *" className="mb-3">
                <Form.Control
                  className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                  id="usernameRegistration"
                  type="text"
                  value={orgazinationLogin.username}
                  onChange={(e) => setOrgazinationLogin({ ...orgazinationLogin, username: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                  autoComplete="off"
                  placeholder="Username *"
                  required
                />
              </FloatingLabel>
              {/* password  */}
              <FloatingLabel label="Password *" className="mb-3">
                <Form.Control
                  className="text-decoration-none border-0 rounded-0 border-bottom no-focus"
                  id="passwordRegistration"
                  type="password"
                  value={orgazinationLogin.password}
                  onChange={(e) => setOrgazinationLogin({ ...orgazinationLogin, password: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                  autoComplete="off"
                  placeholder="Password *"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Button className="navigationBtn mt-3 mb-3" type="submit" disabled={!formCompleted}>
              Accedi
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
