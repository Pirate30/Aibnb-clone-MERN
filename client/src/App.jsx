import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account";
import Places from "./components/Places";
import PlacesForm from "./components/PlacesForm";

axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/acount" element={<Account />} /> */}
          <Route path="/acount" element={<Account />} />
          <Route path="/acount/accomodations" element={<Places />} />
          <Route path="/acount/accomodations/new" element={<PlacesForm />} />
          <Route path="/acount/accomodations/:id" element={<PlacesForm />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
