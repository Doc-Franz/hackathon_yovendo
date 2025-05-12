import { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { X } from "react-bootstrap-icons";

function OrganizationsForm() {
  // fetch per aggiungere le aziende in piattaforma
  const addOrganization = async ({ name, username, password }) => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("username", username);
    fd.append("password", password);
    files.forEach((file) => fd.append("documents", file));

    try {
      await fetch("api/organizations", {
        method: "POST",
        body: fd
      });
    } catch (err) {
      console.log(err);
    }
  };

  // stato che controlla i valori del form
  const [orgazinationRegistration, setOrgazinationRegistration] = useState({
    name: "",
    username: "",
    password: ""
  });

  // stato che controlla i files caricatai
  const [files, setFiles] = useState([]);

  //stato che controlla se tutti i valori del form sono stati compilati
  const [formCompleted, setFormCompleted] = useState(false);

  useEffect(() => {
    const { name, username, password } = orgazinationRegistration;
    setFormCompleted(!!(name.trim() && username.trim() && password.trim()));
  }, [orgazinationRegistration]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOrgazinationRegistration({
      name: e.target.elements.nameRegistration.value,
      username: e.target.elements.usernameRegistration.value,
      password: e.target.elements.passwordRegistration.value
    });

    const name = e.target.elements.nameRegistration.value;
    const username = e.target.elements.usernameRegistration.value;
    const password = e.target.elements.passwordRegistration.value;

    await addOrganization({ name, username, password });
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <Container fluid className="headerLogin">
        <Container>
          <Row className="">
            <Col className="col-4 mt-2 mb-3" md={3} xl={2}>
              <Link to="/" className="text-decoration-none">
                <Image />
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
                    autoComplete="off"
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

                {/* Caricamento dei files */}
                <Form.Control
                  className="no-focus"
                  name="documents"
                  type="file"
                  multiple
                  onChange={(e) => {
                    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
                  }}
                  style={{ marginTop: "40px" }}
                />

                {/* <Form.Text>Minimo 3 caratteri, massimo 20 caratteri</Form.Text> */}
              </Form.Group>

              {files.length > 0 && (
                <>
                  <Row>
                    <Col>
                      <p className="fs-5 fw-semibold text-primary-emphasis">Documenti selezionati:</p>
                    </Col>
                  </Row>
                  <Row>
                    {files.map((file, index) => (
                      <Col className="document col-12" key={index}>
                        <Row className="d-flex">
                          <Col className="col-10">
                            {" "}
                            <p>📄 {file.name}</p>
                          </Col>
                          <Col className="d-flex justify-content-end">
                            {" "}
                            <X
                              className="fs-4"
                              //   mantengo tutti i file con indice diverso da quello selezionato
                              onClick={() => {
                                setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </>
              )}

              <Button className="navigationBtn mt-3 mb-3" type="submit" disabled={!formCompleted}>
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
