import React from "react";
import MainModule from "./Main/Main.jsx";
import About from "./About/About.jsx";
import Header from "./Header/Header.jsx";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

const Components = () => {
  return (
    <div>
      <Router>
      <Header />
      <hr />
        <Routes>
          <Route path="/" element={<MainModule />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Components;
