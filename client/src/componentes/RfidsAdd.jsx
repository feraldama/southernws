import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";

class RfidsAdd extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = async () => {
    if (this.state.selectedFile) {
      if (this.state.selectedFile.type === "application/vnd.ms-excel") {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );

        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        // console.log("formData: ", formData);
        axios.post("http://localhost:3001/rfids/xls", formData);
        await Swal.fire("Realizado!", "Rfids Insertados con Éxito!", "success");
        window.location.reload(true);
      } else {
        Swal.fire("Alerta!", "Debe seleccionar un archivo XLS!", "error");
      }
    }
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
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
        <h1>Insertar VARIOS</h1>
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

export default RfidsAdd;
