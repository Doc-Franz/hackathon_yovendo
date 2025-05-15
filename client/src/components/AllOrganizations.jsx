import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function AllOrganizations() {
  // stato dove vengono salvate le aziende prelevate dal db
  const [orgs, setOrgs] = useState([]);

  // funzione per richiamare tutte le aziende nel db
  const getAllOrganizations = async () => {
    try {
      const response = await fetch("api/organizations");
      if (response.ok) {
        const organizations = await response.json();
        setOrgs(organizations);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // l'id dell'azienda verrà poi utilizzato per ricercare i documenti salvati di quell'azienda
  const handleContacts = async (id) => {
    try {
      await fetch(`api/whatsapp/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // al caricamento della pagina vengono importate tutte le aziende
  useEffect(() => {
    getAllOrganizations();
  }, []);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col className="fs-3 fw-semibold text-primary-emphasis">Aziende registrate:</Col>
      </Row>
      {orgs.length > 0
        ? orgs.map((org) => (
            <Row key={org.id} className="document d-flex justify-content-between align-items-center py-2 border-bottom">
              <Col className="fs-5">{org.name}</Col>
              <Col className="d-flex justify-content-end">
                <Button href={`https://wa.me/${org.whatsapp_number}`} className="navigationBtn" target="_blank" onClick={() => handleContacts(org.id)}>
                  Contattaci
                </Button>
              </Col>
            </Row>
          ))
        : null}
    </Container>
  );
}

export default AllOrganizations;
