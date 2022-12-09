import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import {
  getCategory,
  postCategory,
  putCategory,
} from "../redux/actions/actionsCategory";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

const CrudCategory = () => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [categorySeleccionado, setCategorySeleccionado] = useState({
    id: "",
    name: "",
    description: "",
    active: "",
  });

  const seleccionarCategory = (elemento, caso) => {
    setCategorySeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    var { name, value } = e.target;
    if (name === "active" && value === "true") {
      value = true;
    } else if (name === "active" && value === "false") {
      value = false;
    }
    setCategorySeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.reducerCategory.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const editar = () => {
    dispatch(putCategory(categorySeleccionado));
    setModalEditar(false);
  };

  const eliminar = () => {
    // dispatch(deleteCategory(categorySeleccionado.id));
    setModalEliminar(false);
  };

  const insertar = () => {
    dispatch(postCategory(categorySeleccionado));
    setModalInsertar(false);
  };

  const abrirModalInsertar = () => {
    setCategorySeleccionado(null);
    setModalInsertar(true);
  };

  return (
    <div className="App">
      <br />
      {/* <br /> */}
      <h2>Lista de Categorías</h2>
      <div className="prueba">
        {/* <br /> */}
        <button className="button-cart2" onClick={() => abrirModalInsertar()}>
          Insertar
        </button>
      </div>
      <Table striped bordered hover size="xl">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((elemento) => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.name}</td>
              <td>{elemento.description}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarCategory(elemento, "Editar")}
                >
                  Editar
                </button>{" "}
                {"   "}
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarCategory(elemento, "Eliminar")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Categoría</h3>
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
              value={categorySeleccionado && categorySeleccionado.id}
            />
            <br />

            <label>Categoria</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={categorySeleccionado && categorySeleccionado.name}
              onChange={handleChange}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={categorySeleccionado && categorySeleccionado.description}
              onChange={handleChange}
            />
            <br />

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
          ¿ Estás Seguro que deseas eliminar el categoría{' "'}
          {categorySeleccionado && categorySeleccionado.name}
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
            <h3>Insertar Categoria</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Categoría</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={categorySeleccionado ? categorySeleccionado.name : ""}
              onChange={handleChange}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={
                categorySeleccionado ? categorySeleccionado.description : ""
              }
              onChange={handleChange}
            />
            <br />

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
    </div>
  );
};
export default CrudCategory;
