import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const FilterCategories = () => {
  let history = useHistory();
  var route;
  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((categoria) => setCategoria(categoria.data));
  }, []);
  const [categoria, setCategoria] = useState([]);
  const handleChange = (e) => {
    route = "vehicles/category/" + e.target.value;
    history.push(`${route}`);
    window.location.reload(true);
  };

  return (
    <div className="container-categories ">
      <br></br>
      <br></br>
      <h1>Filtrar Vehiculos por categorias</h1>
      <select onChange={handleChange}>
        <option>Selecciona una categoría...</option>
        {categoria.map((c) => (
          <option value={c.id}>{c.name}</option>
        ))}
      </select>
      <br />
      <br />
    </div>
  );
};
export default FilterCategories;
