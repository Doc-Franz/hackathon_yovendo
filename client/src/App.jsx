import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./components/MyNav";
import OrganizationsForm from "./components/OrganizationsForm";
import Homepage from "./components/Homepage";
import AllOrganizations from "./components/AllOrganizations";
import Login from "./components/Login";
import OrganizationProfile from "./components/OrganizationProfile";

function App() {
  return (
    <BrowserRouter>
      <MyNav />;
      <div className="page d-flex" style={{ paddingInline: "25%" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/organization/:id" element={<OrganizationProfile />} />
          <Route path="/addOrganization" element={<OrganizationsForm />} />
          <Route path="/allOrganizations" element={<AllOrganizations />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
