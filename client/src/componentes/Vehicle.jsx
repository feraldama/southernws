import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Vehicle.css";
import { Table } from "react-bootstrap";

const Vehicle = () => {
  let { id } = useParams();
  var url = "http://localhost:3001";
  useEffect(() => {
    axios.get(`${url}/vehicles/${id}`).then((data) => setData(data.data));
  }, []);
  useEffect(() => {
    axios.get(`${url}/rfids/vehicle/${id}`).then((rfid) => setRfid(rfid.data));
  }, []);
  const [data, setData] = useState([]);
  const [rfid, setRfid] = useState([]);
  // console.log("rfid: ", rfid);
  return (
    <div className="container-prod">
      <div className="container-product">
        <div className="container-img">
          <img src={data.image} alt="Aqui va la imagen" />
        </div>
        <div className="container-data">
          <h1>{data.name}</h1>
          <h2>Patente: {data.plate}</h2>
          <h3>{data.description}.</h3>
          <Link to="/admin/rfids/checkxls">
            <button className="btn btn-success">Verificar Ruedas</button>
          </Link>
        </div>
      </div>
      <div className="table-responsive-xl">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>RFID</th>
              <th>Marca</th>
              <th>Factura Nro.</th>
              <th>Factura Fecha</th>
              <th>Compañia</th>
              <th>Medida</th>
              <th>Tipo</th>
              <th>Ubicación</th>
              <th>Nro. Recapado</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {rfid.rfids
              ? rfid.rfids.map((elemento) => (
                  <tr>
                    <td>{elemento.id}</td>
                    <td>{elemento.rfidNumber}</td>
                    <td>{elemento.brand}</td>
                    <td>{elemento.invoiceNumber}</td>
                    <td>{elemento.invoiceDate}</td>
                    <td>{elemento.company}</td>
                    <td>{elemento.measure}</td>
                    <td>{elemento.type}</td>
                    <td>{elemento.location}</td>
                    <td>{elemento.recapNumber}</td>
                    <td>{elemento.active ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))
              : "Sin ruedas asignadas"}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Vehicle;
