import React from "react";
import { Route } from "react-router-dom";
import Nav from "./componentes/Nav.jsx";
import Catalogo from "./componentes/Catalogo.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Nav onSearch="onSearch" />} />
      <Route exact path="/" component={Catalogo} />
    </div>
  );
}

export default App;
