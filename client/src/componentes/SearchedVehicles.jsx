import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Catalogo.css";
import VehicleCard from "./VehicleCard";
import { useParams } from "react-router-dom";

const SearchedVehicles = () => {
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/vehicles/search/${id}`)
      .then((data) => setData(data.data));
  }, []);
  const [data, setData] = useState([]);
  if (data.length > 0) {
    return (
      <div className="container">
        {data.map((p) => (
          <VehicleCard
            id={p.id}
            name={p.name}
            plate={p.plate}
            image={p.image}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Búsqueda no encontrada "{id}"</h1>
      </div>
    );
  }
};
export default SearchedVehicles;
