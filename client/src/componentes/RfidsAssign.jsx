import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";

class RfidsAssign extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    plate: [],
    chapa: "",
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

        // Update the formData object
        // console.log("SelectedFile: ", this.state.selectedFile);
        formData.append("myFile", this.state.selectedFile, this.state.chapa);

        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        // console.log("formData: ", formData);
        axios.post("http://localhost:3001/rfids/assignxls", formData);

        await Swal.fire(
          "Realizado!",
          "Archivo levantado con Éxito!",
          "success"
        );
        window.location.reload(true);
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

  render() {
    return (
      <div>
        <h1>Asignar VARIOS</h1>
        <br />
        <h3>Subida de archivo!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default RfidsAssign;
