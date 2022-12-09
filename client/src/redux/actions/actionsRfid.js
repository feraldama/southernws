import axios from "axios";

const url = "http://localhost:3001";

export const getRfid = () => (dispatch) => {
  axios.get(`${url}/rfids`).then((data) => {
    dispatch({
      type: "GET_RFID",
      payload: data.data,
    });
  });
};

export const postRfid = (vehicleSeleccionado) => (dispatch) => {
  // console.log("ACTIONS vehicleSeleccionado: ", vehicleSeleccionado);
  axios
    .post(`${url}/rfids`, {
      rfidNumber: vehicleSeleccionado.rfidNumber,
      brand: vehicleSeleccionado.brand,
      invoiceNumber: vehicleSeleccionado.invoiceNumber,
      invoiceDate: vehicleSeleccionado.invoiceDate,
      company: vehicleSeleccionado.company,
      measure: vehicleSeleccionado.measure,
      type: vehicleSeleccionado.type,
      location: vehicleSeleccionado.location,
      recapNumber: vehicleSeleccionado.recapNumber,
      image: vehicleSeleccionado.image,
      invoiceImage: vehicleSeleccionado.invoiceImage,
      vehicleId: vehicleSeleccionado.vehicleId,
      active: vehicleSeleccionado.active,
    })
    .then((data) => {
      dispatch({
        type: "POST_RFID",
        payload: data.data,
      });
    });
};

export const putRfid = (vehicleSeleccionado) => (dispatch) => {
  // console.log("ACTIONS vehicleSeleccionado: ", vehicleSeleccionado);
  axios
    .put(`${url}/rfids/${vehicleSeleccionado.id}`, {
      rfidNumber: vehicleSeleccionado.rfidNumber,
      brand: vehicleSeleccionado.brand,
      invoiceNumber: vehicleSeleccionado.invoiceNumber,
      invoiceDate: vehicleSeleccionado.invoiceDate,
      company: vehicleSeleccionado.company,
      measure: vehicleSeleccionado.measure,
      type: vehicleSeleccionado.type,
      location: vehicleSeleccionado.location,
      recapNumber: vehicleSeleccionado.recapNumber,
      image: vehicleSeleccionado.image,
      invoiceImage: vehicleSeleccionado.invoiceImage,
      vehicleId: vehicleSeleccionado.vehicleId,
      active: vehicleSeleccionado.active,
    })
    .then((data) => {
      dispatch({
        type: "PUT_RFID",
        payload: data.data,
      });
    });
};

export const deleteRfid = (id) => (dispatch) => {
  axios.delete(`${url}/rfids/${id}`).then((data) => {
    dispatch({
      type: "DELETE_RFID",
      payload: data.data,
    });
  });
};
