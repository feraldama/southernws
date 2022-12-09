import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import {
  deleteRfid,
  getRfid,
  postRfid,
  putRfid,
} from "../redux/actions/actionsRfid";
import axios from "axios";
import Swal from "sweetalert2";
import { getVehicle } from "../redux/actions/actionsVehicle";
import "./Catalogo.css";

const CrudRfid = () => {
  const dispatch = useDispatch();
  const rfids = useSelector((state) => state.reducerRfid.rfids);

  // console.log("rfids: ", rfids);

  useEffect(() => {
    dispatch(getRfid());
  }, [dispatch]);

  const vehicles = useSelector((state) => state.reducerVehicle.vehicles);

  useEffect(() => {
    dispatch(getVehicle());
  }, [dispatch]);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [imageRfid, setImageRfid] = useState(null);
  const [imageInvoice, setImageInvoice] = useState(null);
  const [imageModal, setImageModal] = useState("");
  const [modalInvoice, setModalInvoice] = useState(false);

  const [rfidSeleccionado, setRfidSeleccionado] = useState({
    id: "",
    rfidNumber: "",
    brand: "",
    invoiceNumber: "",
    invoiceDate: "",
    company: "",
    measure: "",
    type: "",
    location: "",
    recapNumber: 0,
    image: "",
    invoiceImage: "",
    vehicleId: "",
    active: false,
  });

  // console.log("rfidSeleccionado: ", rfidSeleccionado);

  const seleccionarRfid = (elemento, caso) => {
    setRfidSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    var { name, value } = e.target;
    // console.log("e: ", e.target);
    if (name == "invoiceImage2") {
      // console.log("Entra invoice2: ", e.target.files);
      setImageInvoice(e.target.files[0]);
    }
    if (name == "image2") {
      // console.log("Entra image2: ", e.target);
      setImageRfid(e.target.files[0]);
    }
    if (name === "active" && value === "true") {
      value = true;
    } else if (name === "active" && value === "false") {
      value = false;
    }
    setRfidSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log("rfidSeleccionado: ", rfidSeleccionado);
  };

  const imageUpload = () => {
    if (imageRfid) {
      if (imageRfid.type === "image/jpeg" || imageRfid.type === "image/png") {
        const formData = new FormData();
        formData.append("myFile", imageRfid, imageRfid.name);
        axios.post("http://localhost:3001/rfids/image", formData);
      } else {
        Swal.fire(
          "Alerta Imagen Rueda!",
          "Debe seleccionar un archivo IMAGEN! (*.jpg / *.png)",
          "error"
        );
      }
    }
    if (imageInvoice) {
      // console.log(imageInvoice);
      if (imageInvoice.type === "image/jpeg") {
        const formData = new FormData();
        formData.append("myFile", imageInvoice, imageInvoice.name);
        axios.post("http://localhost:3001/rfids/invoice", formData);
      } else {
        Swal.fire(
          "Alerta Imagen Factura!",
          "Debe seleccionar un archivo IMAGEN! (*.jpg)",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    if (imageRfid) {
      // console.log("imageRfid: ", imageRfid);
      setRfidSeleccionado((prevState) => ({
        ...prevState,
        ["image"]: `http://localhost:8081/Rfids/${imageRfid.name}`,
      }));
    }
  }, [imageRfid]);

  useEffect(() => {
    if (imageInvoice) {
      // console.log("imageInvoice: ", imageInvoice);
      setRfidSeleccionado((prevState) => ({
        ...prevState,
        ["invoiceImage"]: `http://localhost:8081/Facturas/${imageInvoice.name}`,
      }));
    }
  }, [imageInvoice]);

  const editar = () => {
    imageUpload();
    dispatch(putRfid(rfidSeleccionado));
    setModalEditar(false);
  };

  const eliminar = () => {
    dispatch(deleteRfid(rfidSeleccionado.id));
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setRfidSeleccionado(null);
    setModalInsertar(true);
  };

  const abrirModalImage = (image) => {
    setImageModal(image);
    setModalImage(true);
  };

  const abrirModalInvoice = (invoice) => {
    // console.log(invoice);
    setImageRfid(invoice);
    setModalInvoice(true);
  };

  const insertar = () => {
    imageUpload();
    dispatch(postRfid(rfidSeleccionado));
    setModalInsertar(false);
  };

  return (
    <div className="App">
      <br />
      <h2>Lista de RFIDs</h2>
      <div className="prueba">
        <button className="button-cart2" onClick={() => abrirModalInsertar()}>
          Insertar UNO
        </button>
        {/* <br />
        <br /> */}
        <Link to="/admin/rfids/xls">
          <button className="button-cart2">Insertar VARIOS</button>
        </Link>
        {/* <br />
        <br /> */}
        <Link to="/admin/rfids/assignxls">
          <button className="button-cart2">Asignar VARIOS</button>
        </Link>

        {/* <br />
        <br /> */}
      </div>

      <div className="table-responsive-xl">
        <Table striped bordered hover size="xl">
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
              <th>Imagen</th>
              <th>Vehiculo Patente</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {rfids.map((elemento) => (
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.rfidNumber}</td>
                <td>{elemento.brand}</td>
                <td>
                  <span
                    className="imageRueda"
                    onClick={() => abrirModalInvoice(elemento.invoiceImage)}
                  >
                    {elemento.invoiceNumber}
                  </span>
                </td>
                <td>{elemento.invoiceDate}</td>
                <td>{elemento.company}</td>
                <td>{elemento.measure}</td>
                <td>{elemento.type}</td>
                <td>{elemento.location}</td>
                <td>{elemento.recapNumber}</td>
                <td width="20%">
                  <img
                    className="imageRueda"
                    src={elemento.image}
                    alt="Aqui va la imagen"
                    width="40%"
                    height="auto"
                    onClick={() => abrirModalImage(elemento.image)}
                  />
                </td>
                <td>
                  <span>{elemento.vehicle ? elemento.vehicle.plate : ""}</span>
                </td>
                <td>{elemento.active ? "Activo" : "Inactivo"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => seleccionarRfid(elemento, "Editar")}
                  >
                    Editar
                  </button>{" "}
                  {"   "}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarRfid(elemento, "Eliminar")}
                  >
                    Eliminar
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar RFID</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={rfidSeleccionado && rfidSeleccionado.id}
            />
            <br />

            <label>RFID</label>
            <input
              className="form-control"
              type="text"
              name="rfidNumber"
              value={rfidSeleccionado && rfidSeleccionado.rfidNumber}
              onChange={handleChange}
            />
            <br />

            <label>Marca</label>
            <input
              className="form-control"
              type="text"
              name="brand"
              value={rfidSeleccionado && rfidSeleccionado.brand}
              onChange={handleChange}
            />
            <br />

            <label>Factura Nro.</label>
            <input
              className="form-control"
              type="text"
              name="invoiceNumber"
              value={rfidSeleccionado && rfidSeleccionado.invoiceNumber}
              onChange={handleChange}
            />
            <br />

            <label>Factura Imagen</label>
            <input
              className="form-control"
              type="text"
              name="invoiceImage"
              value={rfidSeleccionado && rfidSeleccionado.invoiceImage}
              onChange={handleChange}
            />
            <input name="invoiceImage2" type="file" onChange={handleChange} />
            <br />

            <label>Factura Fecha</label>
            <input
              className="form-control"
              type="date"
              name="invoiceDate"
              value={rfidSeleccionado && rfidSeleccionado.invoiceDate}
              onChange={handleChange}
            />
            <br />

            <label>Compañia</label>
            <input
              className="form-control"
              type="text"
              name="company"
              value={rfidSeleccionado && rfidSeleccionado.company}
              onChange={handleChange}
            />
            <br />

            <label>Medida</label>
            <select
              name="measure"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.measure}
            >
              <option>Selecciona una medida...</option>
              <option type="checkbox" name="measure" value="295">
                295
              </option>
              <option type="checkbox" name="measure" value="315">
                315
              </option>
              <option type="checkbox" name="measure" value="1100x22">
                1100x22
              </option>
            </select>
            <br />

            <label>Tipo</label>
            <select
              name="type"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.type}
            >
              <option>Selecciona un tipo...</option>
              <option type="checkbox" name="type" value="Lisa">
                Lisa
              </option>
              <option type="checkbox" name="type" value="Traccion">
                Traccion
              </option>
            </select>
            <br />

            <label>Ubicación</label>
            <input
              className="form-control"
              type="text"
              name="location"
              value={rfidSeleccionado && rfidSeleccionado.location}
              onChange={handleChange}
            />
            <br />

            <label>Nro. Recapado</label>
            <select
              name="recapNumber"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.recapNumber}
            >
              <option>Nro. Recapado</option>
              <option type="checkbox" name="type" value="0">
                0
              </option>
              <option type="checkbox" name="type" value="1">
                1
              </option>
              <option type="checkbox" name="type" value="2">
                2
              </option>
              <option type="checkbox" name="type" value="3">
                3
              </option>
            </select>
            <br />

            <label>Imagen</label>
            <input
              className="form-control"
              type="text"
              name="image"
              value={rfidSeleccionado && rfidSeleccionado.image}
              onChange={handleChange}
            />
            <input name="image2" type="file" onChange={handleChange} />
            <br />

            <label>Vehiculo Patente</label>
            <select
              name="vehicleId"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.vehicleId}
            >
              <option>Selecciona una patente...</option>
              {vehicles.map((cat) => (
                <option type="checkbox" name="vehicleId" value={cat.id}>
                  {cat.plate}
                </option>
              ))}
            </select>
            <br />

            <label>Activo</label>
            <select
              name="active"
              value={rfidSeleccionado && rfidSeleccionado.active}
              onChange={handleChange}
            >
              <option value="">Seleccione disponibilidad...</option>
              <option value={new Boolean(1)}>Activo</option>
              <option value={new Boolean(0)}>Inactivo</option>
            </select>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿ Estás Seguro que deseas eliminar el RFID{' "'}
          {rfidSeleccionado && rfidSeleccionado.rfidNumber}
          {'" ?'}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar RFID</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>RFID</label>
            <input
              className="form-control"
              type="text"
              name="rfidNumber"
              value={rfidSeleccionado ? rfidSeleccionado.rfidNumber : ""}
              onChange={handleChange}
            />
            <br />

            <label>Marca</label>
            <input
              className="form-control"
              type="text"
              name="brand"
              value={rfidSeleccionado && rfidSeleccionado.brand}
              onChange={handleChange}
            />
            <br />

            <label>Factura Nro.</label>
            <input
              className="form-control"
              type="text"
              name="invoiceNumber"
              value={rfidSeleccionado && rfidSeleccionado.invoiceNumber}
              onChange={handleChange}
            />
            <br />

            <label>Factura Imagen</label>
            <input
              className="form-control"
              type="text"
              name="invoiceImage"
              value={rfidSeleccionado && rfidSeleccionado.invoiceImage}
              onChange={handleChange}
            />
            <input name="invoiceImage2" type="file" onChange={handleChange} />
            <br />

            <label>Factura Fecha</label>
            <input
              className="form-control"
              type="date"
              name="invoiceDate"
              value={rfidSeleccionado && rfidSeleccionado.invoiceDate}
              onChange={handleChange}
            />
            <br />

            <label>Compañia</label>
            <input
              className="form-control"
              type="text"
              name="company"
              value={rfidSeleccionado && rfidSeleccionado.company}
              onChange={handleChange}
            />
            <br />

            <label>Medida</label>
            <select
              name="measure"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.measure}
            >
              <option>Selecciona una medida...</option>
              <option type="checkbox" name="measure" value="295">
                295
              </option>
              <option type="checkbox" name="measure" value="315">
                315
              </option>
              <option type="checkbox" name="measure" value="1100x22">
                1100x22
              </option>
            </select>
            <br />

            <label>Tipo</label>
            <select
              name="type"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.type}
            >
              <option>Selecciona un tipo...</option>
              <option type="checkbox" name="type" value="Lisa">
                Lisa
              </option>
              <option type="checkbox" name="type" value="Traccion">
                Traccion
              </option>
            </select>
            <br />

            <label>Ubicación</label>
            <input
              className="form-control"
              type="text"
              name="location"
              value={rfidSeleccionado && rfidSeleccionado.location}
              onChange={handleChange}
            />
            <br />

            <label>Nro. Recapado</label>
            <select
              name="recapNumber"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.recapNumber}
            >
              <option>Nro. Recapado</option>
              <option type="checkbox" name="type" value="0">
                0
              </option>
              <option type="checkbox" name="type" value="1">
                1
              </option>
              <option type="checkbox" name="type" value="2">
                2
              </option>
              <option type="checkbox" name="type" value="3">
                3
              </option>
            </select>
            <br />

            <label>Imagen</label>
            <input
              className="form-control"
              type="text"
              name="image"
              value={rfidSeleccionado && rfidSeleccionado.image}
              onChange={handleChange}
            />
            <input name="image2" type="file" onChange={handleChange} />
            <br />

            <label>Vehiculo Patente</label>
            <select
              name="vehicleId"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.vehicleId}
            >
              <option>Selecciona una patente...</option>
              {vehicles.map((cat) => (
                <option type="checkbox" name="vehicleId" value={cat.id}>
                  {cat.plate}
                </option>
              ))}
            </select>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalImage}>
        <ModalHeader>
          <div>
            <h3>Imagen</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <img
              src={imageModal}
              alt="Aqui va la imagen"
              width="100%"
              height="100%"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => setModalImage(false)}
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInvoice}>
        <ModalHeader>
          <div>
            <h3>Factura</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <img
              src={imageRfid}
              alt="Aqui va la imagen"
              width="100%"
              height="100%"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => setModalInvoice(false)}
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default CrudRfid;
