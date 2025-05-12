import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./components/MyNav";
import OrganizationsForm from "./components/OrganizationsForm";

function App() {
  return (
    <BrowserRouter>
      <MyNav />;
      <Routes>
        <Route path="/" element={<OrganizationsForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
