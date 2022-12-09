import React from "react";
import { Route } from "react-router-dom";
import Nav from "./componentes/Nav.jsx";
import FilterCategories from "./componentes/FilterCategories.jsx";
import Catalogo from "./componentes/Catalogo.jsx";
import Vehicle from "./componentes/Vehicle.jsx";
import FilterVehicles from "./componentes/FilterVehicles";
import Vehicles from "./componentes/crudVehicles.jsx";
import Rfids from "./componentes/crudRfid.jsx";
import Searched from "./componentes/SearchedVehicles.jsx";
import NavAdmin from "./componentes/NavAdmin.jsx";
import Categories from "./componentes/crudCategory";
import RfidsAdd from "./componentes/RfidsAdd.jsx";
import RfidsAssing from "./componentes/RfidsAssign.jsx";
import RfidsCheck from "./componentes/RfidsCheck";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/vehicles" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/admin" render={() => <NavAdmin onSearch="onSearch" />} />
      {/* <Route exact path="/" component={FilterCategories} /> */}
      <Route exact path="/" component={Catalogo} />
      <Route exact path="/vehicles/:id" component={Vehicle} />
      <Route path="/vehicles/category/:id" component={FilterVehicles} />
      <Route path="/vehicles/search/:id" component={Searched} />
      <Route exact path="/admin/categories" component={Categories} />
      <Route exact path="/admin/vehicles" component={Vehicles} />
      <Route exact path="/admin/rfids" component={Rfids} />
      <Route exact path="/admin/rfids/xls" component={RfidsAdd} />
      <Route exact path="/admin/rfids/assignxls" component={RfidsAssing} />
      <Route exact path="/admin/rfids/checkxls" component={RfidsCheck} />
    </div>
  );
}

export default App;
