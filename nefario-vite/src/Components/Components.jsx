import React from "react";
import MainModule from "./Main/Main.jsx";
import About from "./About/About.jsx";
import Header from "./Header/Header.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthModule from "./Auth/Auth.jsx";
import AuthLogin from "./Auth/AuthLogin.jsx";
import AuthRegister from "./Auth/AuthRegister.jsx";
import AddSwimmer from "./Add/Add.jsx";
import ProtectedRoute from "../Common/Services/ProtectedRoute.jsx";
import { authenticateUser } from "./Auth/AuthService.jsx";
const Components = () => {
  return (
    <div>
      <Router>
        <Header isLoggedIn={authenticateUser()} />
        <hr />
        <Routes>
          <Route path="/" element={<MainModule />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<AuthModule />} />
          <Route path="/register" element={<AuthRegister />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route
            path="/add"
            element={<ProtectedRoute path="/add" element={AddSwimmer} />}
          />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Components;
