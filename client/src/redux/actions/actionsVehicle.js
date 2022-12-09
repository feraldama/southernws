import axios from "axios";

const url = "http://localhost:3001";

export const getVehicle = (quantity, until) => (dispatch) => {
  console.log("quantity: ", quantity, " - until: ", until);
  axios
    .post(`${url}/vehicles/monday`, {
      quantity: quantity,
      until: until,
    })
    .then((data) => {
      console.log("then ~ data: ", data);
      return data;
    });
};

export const postVehicle = (data, date) => (dispatch) => {
  console.log("Entra al Actions y manda DATA: ", data);
  data.items.map((p) => {
    if (p.column_values[19].text) {
      console.log("ACTIONS map: ", p);
      // console.log("date: ", date);
      axios.post(`${url}/vehicles`, {
        JobNumber: p.column_values[4].text,
        JobTitle: p.column_values[6].text,
        JobClient: p.column_values[5].text,
        Status: p.column_values[1].text,
        Charge: p.column_values[2].text,
        Wip: p.column_values[3].text,
        Task: p.column_values[7].text,
        JobHrsWorked: p.column_values[8].text,
        TaskHrs: p.column_values[9].text,
        TodayPlannedHrs: p.column_values[10].text,
        RemainTaskHors: p.column_values[11].text,
        Mon: p.column_values[12].text,
        Tues: p.column_values[13].text,
        Wed: p.column_values[14].text,
        Thur: p.column_values[15].text,
        Fri: p.column_values[16].text,
        Total: p.column_values[17].text,
        Deadline: p.column_values[18].text,
        Date: date,
        Employee: p.column_values[19].text,
      });
    }
  });
};

export const putVehicle = (vehicleSeleccionado) => (dispatch) => {
  // console.log("ACTIONS vehicleSeleccionado: ", vehicleSeleccionado);
  axios
    .put(`${url}/vehicles/${vehicleSeleccionado.id}`, {
      name: vehicleSeleccionado.name,
      description: vehicleSeleccionado.description,
      plate: vehicleSeleccionado.plate,
      image: vehicleSeleccionado.image,
      active: vehicleSeleccionado.active,
      categoryId: vehicleSeleccionado.categoryId,
    })
    .then((data) => {
      dispatch({
        type: "PUT_VEHICLE",
        payload: data.data,
      });
    });
};

export const deleteVehicle = (id) => (dispatch) => {
  axios.delete(`${url}/vehicles/${id}`).then((data) => {
    dispatch({
      type: "DELETE_VEHICLE",
      payload: data.data,
    });
  });
};
