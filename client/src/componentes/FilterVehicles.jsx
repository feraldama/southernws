import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Catalogo.css";
import { useParams } from "react-router-dom";
import VehicleCard from "./VehicleCard.jsx";

const FilterVehicles = () => {
  let { id } = useParams();
  var arrayProds = [];
  useEffect(() => {
    axios
      .get(`http://localhost:3001/vehicles/category/${id}`)
      .then((data) => setData(data.data));
  }, []);
  const [data, setData] = useState([]);
  if (data.vehicles) arrayProds = data.vehicles;
  return (
    <div className="container">
      {arrayProds
        // .filter((p) => p.stock > 0)
        .map((t) => (
          <VehicleCard
            id={t.id}
            name={t.name}
            plate={t.plate}
            image={t.image}
          />
        ))}
    </div>
  );
};

export default FilterVehicles;
