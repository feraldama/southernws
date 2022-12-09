import axios from "axios";

const url = "http://localhost:3001";

export const getCategory = () => (dispatch) => {
  axios.get(`${url}/categories`).then((data) => {
    dispatch({
      type: "GET_CATEGORY",
      payload: data.data,
    });
  });
};

export const postCategory = (categorySeleccionado) => (dispatch) => {
  axios
    .post(`${url}/categories`, {
      name: categorySeleccionado.name,
      description: categorySeleccionado.description,
    })
    .then((data) => {
      dispatch({
        type: "POST_CATEGORY",
        payload: data.data,
      });
    });
};

export const putCategory = (categorySeleccionado) => (dispatch) => {
  axios
    .put(`${url}/categories/${categorySeleccionado.id}`, {
      name: categorySeleccionado.name,
      description: categorySeleccionado.description,
      active: categorySeleccionado.active,
    })
    .then((data) => {
      dispatch({
        type: "PUT_CATEGORY",
        payload: data.data,
      });
    });
};

export const deleteCategory = (id) => (dispatch) => {
  axios.delete(`${url}/categories/${id}`).then((data) => {
    dispatch({
      type: "DELETE_CATEGORY",
      payload: data.data,
    });
  });
};
