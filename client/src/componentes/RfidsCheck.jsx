import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";

class RfidsAssign extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    plate: [],
    chapa: "",
    chapaList: "",
    message: "",
    tabla: {},
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    axios.get(`http://localhost:3001/vehicles`).then((data) => {
      // console.log("DATA EN Assign: ", data.data);
      this.setState({ plate: data.data });
      // console.log("PLATE: ", this.state.plate);
    });

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleChange = (e) => {
    // console.log("e: ", e.target.value);
    this.setState({ chapa: e.target.value });
  };

  // On file upload (click the upload button)
  onFileUpload = async () => {
    if (this.state.selectedFile) {
      if (this.state.selectedFile.type === "application/vnd.ms-excel") {
        // Create an object of formData
        const formData = new FormData();

        formData.append("myFile", this.state.selectedFile, this.state.chapa);

        // let id = this.state.chapa;
        // var url = "http://localhost:3001";
        // this.state.tabla = await axios.get(`${url}/vehicles/${id}`).then(
        //   (data) => console.log("data: ", data) //setData(data.data)
        // );
        await axios
          .post("http://localhost:3001/rfids/checkxls", formData)
          .then((data) => (this.state.message = data.data));
        // .then(() => console.log(this.state.message));
        if (this.state.message.exito == false) {
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: this.state.message.message,
            // footer: '<a href="">Why do I have this issue?</a>',
          });
        } else {
          await Swal.fire("Realizado!", this.state.message.message, "success");
          window.location.reload(true);
        }
        this.setState({ chapaList: this.state.chapa });
        // console.log(document.getElementById("vehicleId"));
      } else {
        Swal.fire(
          "Alerta!",
          "Debe seleccionar un archivo XLS y una Patente!",
          "error"
        );
      }
    }
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      // console.log("plate: ", this.state);
      return (
        <div>
          <br />
          <label>Vehiculo Patente</label>
          <select
            id="vehicleId"
            name="vehicleId"
            onChange={this.handleChange}
            value={this.state.plate && this.state.plate.vehicleId}
          >
            <option>Selecciona una patente...</option>
            {this.state.plate.map((cat) => (
              <option type="checkbox" name="vehicleId" value={cat.id}>
                {cat.plate}
              </option>
            ))}
          </select>
          <br />
          <h2>Detalles de Archivo:</h2>
          <p>Nombre: {this.state.selectedFile.name}</p>
          <p>Tipo: {this.state.selectedFile.type}</p>
          <p>
            Última Modificación:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
          <button onClick={this.onFileUpload}>Subir!</button>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Debe seleccionar un archivo antes de presionar el botón SUBIR</h4>
        </div>
      );
    }
  };
  fileRfids = () => {
    // console.log("this.state.message: ", this.state.message);
    if (this.state.message.message) {
      // console.log("plate: ", this.state);
      return (
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
              {this.state.message.listaRuedas.map((elemento) => (
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
                  <td width="20%">
                    <img
                      src={elemento.image}
                      alt="Aqui va la imagen"
                      width="40%"
                      height="auto"
                    />
                  </td>
                  <td>
                    <span>
                      {this.state.plate
                        ? this.state.plate[this.state.chapaList - 1].plate
                        : ""}
                    </span>
                  </td>
                  <td>{elemento.active ? "Activo" : "Inactivo"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return (
        <div>
          {/* <br />
          <h4>Resultado</h4> */}
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Verificar Ruedas</h1>
        <br />
        <h3>Subida de archivo!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
        </div>
        {this.fileData()}
        {this.fileRfids()}
      </div>
    );
  }
}

export default RfidsAssign;
