import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

function OrganizationProfile() {
  const organization_id = useSelector((state) => state.login.id); // recupero l'id del'azienda dallo store

  const [documents, setDocuments] = useState([]);

  // fetch per caricare i documenti dell'azienda
  const getDocuments = async (organization_id) => {
    try {
      const response = await fetch(`/api/organizations/documents/${organization_id}`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.organization);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDocuments(organization_id);
  }, [organization_id]);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col className="fs-3 fw-semibold text-primary-emphasis">I miei documenti:</Col>
      </Row>
      {documents && documents.length > 0
        ? documents.map((document) => (
            <Row key={document.id} className="mt-3 document d-flex align-items-center">
              <Col>📄 {document.filename}</Col>
            </Row>
          ))
        : null}
    </Container>
  );
}

export default OrganizationProfile;
