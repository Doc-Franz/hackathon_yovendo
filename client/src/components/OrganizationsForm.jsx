import { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function OrganizationsForm() {
  // fetch per aggiungere le aziende in piattaforma
  async function addOrganization() {
    try {
      await fetch("api/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orgazinationRegistration)
      });
    } catch (err) {
      console.log(err);
    }
  }

  // stato che controlla i valori del form
  const [orgazinationRegistration, setOrgazinationRegistration] = useState({
    name: "",
    username: "",
    password: ""
  });

  //stato che controlla se tutti i valori del form sono stati compilati
  const [formCompleted, setFormCompleted] = useState(false);

  useEffect(() => {
    const { name, username, password } = orgazinationRegistration;
    setFormCompleted(!!(name.trim() && username.trim() && password.trim()));
  }, [orgazinationRegistration]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setOrgazinationRegistration({
      name: e.target.elements.nameRegistration.value,
      username: e.target.elements.usernameRegistration.value,
      password: e.target.elements.passwordRegistration.value
    });

    addOrganization();
  };

  return (
    <>
      <Container fluid className="headerLogin">
        <Container>
          <Row className="">
            <Col className="col-4 mt-2 mb-3" md={3} xl={2}>
              <Link to="/" className="text-decoration-none">
                <Image fluid src />
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Row>
                  <Form.Label className="fs-3 fw-semibold text-primary-emphasis">Registra la tua azienda</Form.Label>
                </Row>

                <FloatingLabel label="Nome *" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                    id="nameRegistration"
                    type="text"
                    value={orgazinationRegistration.name}
                    onChange={(e) => setOrgazinationRegistration({ ...orgazinationRegistration, name: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                    autoComplete="off"
                    placeholder="Email *"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Username *" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus mb-3"
                    id="usernameRegistration"
                    type="text"
                    value={orgazinationRegistration.username}
                    onChange={(e) => setOrgazinationRegistration({ ...orgazinationRegistration, username: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                    placeholder="Username *"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Password *" className="mb-3">
                  <Form.Control
                    className="text-decoration-none border-0 rounded-0 border-bottom no-focus"
                    id="passwordRegistration"
                    type="password"
                    value={orgazinationRegistration.password}
                    onChange={(e) => setOrgazinationRegistration({ ...orgazinationRegistration, password: e.target.value })} // all'onchange nel campo lo state è in ascolto e la proprietà viene aggiornata tramite value
                    autoComplete="off"
                    placeholder="Password *"
                    required
                  />
                </FloatingLabel>

                {/* <Form.Text>Minimo 3 caratteri, massimo 20 caratteri</Form.Text> */}
              </Form.Group>
              <Button className="navigationBtn mb-3" type="submit" disabled={!formCompleted}>
                Registra
              </Button>
            </Form>

            {/* spinner che gestisce la risposta alla registrazione */}
            {/* {loginLoading ? (
                <Row>
                  <Col className="d-flex align-items-center">
                    <Spinner animation="border" />
                    <p className="ms-3">Tentativo di registrazione...</p>
                  </Col>
                </Row>
              ) : hasSubmitted ? (
                registrationFailed ? (
                  <Row className="text-danger">
                    <Col>Registrazione non andata a buon fine!</Col>
                  </Row>
                ) : (
                  <Row className="d-flex flex-column text-success">
                    <Col>Registrazione effettuata!</Col>
                    <Col>
                      <Link to="/reservedArea/login" style={{ color: "#568FCF" }}>
                        <Image src={pointer} className="me-2" alt="thumb icon" style={{ width: "40px", height: "40px" }}></Image>
                        Vai al login
                      </Link>
                    </Col>
                  </Row>
                )
              ) : null} */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrganizationsForm;
