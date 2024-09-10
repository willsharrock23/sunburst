import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./Navbar.jsx";
import SingleGraph from "./SingleGraph.jsx";
import DeepDive from "./DeepDive.jsx";
import Table from "./Table.jsx";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/singlegraph" element={<SingleGraph />} />
          <Route path="/deepdive" element={<DeepDive />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
