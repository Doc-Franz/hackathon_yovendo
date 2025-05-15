import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./components/MyNav";
import OrganizationsForm from "./components/OrganizationsForm";
import Homepage from "./components/Homepage";
import AllOrganizations from "./components/AllOrganizations";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <MyNav />;
      <Container className="d-flex" style={{ paddingInline: "15%" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/addOrganization" element={<OrganizationsForm />} />
          <Route path="/allOrganizations" element={<AllOrganizations />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
