import React from "react";
import { Link } from "react-router-dom";
import "./VehicleCard.css";

const VehicleCard = ({ id, name, plate, image }) => {
  return (
    <Link to={`/vehicles/${id}`}>
      <div className="container-card">
        <div className="container-card-img">
          <img src={image} alt="Aqui va la imagen" width="90%" height="auto" />
        </div>
        <div className="container-card-body">
          <h2 className="card-title">{name}</h2>
          <h2 className="card-text">Patente: {plate}</h2>
        </div>
      </div>
    </Link>
  );
};
export default VehicleCard;
