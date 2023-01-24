import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import "./Catalogo.css";
import { postVehicle, deleteVehicle } from "../redux/actions/actionsVehicle";

const Catalogo = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState("vacio");
  const [until, setUntil] = useState(0);
  const [entries, setEntries] = useState(0);

  async function collect(quantity) {
    //***************************************** */
    console.log("entries en collect: ", quantity);
    console.log("until en collect: ", until);

    let query =
      "{ boards (limit:" +
      quantity +
      ") { name id description items { name column_values { title id type text } } } }";
    await fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE4NDc5OTI0NiwidWlkIjozNTM2ODk4NCwiaWFkIjoiMjAyMi0xMC0wNlQyMDo0OTo1My4yMTVaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6NTUyMDI1NiwicmduIjoidXNlMSJ9.lIwrn9zmQsEPtfePoANmSO9yxOpersPvVtxXB4wU-hc",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        // console.log(JSON.stringify(res, null, 2));
        //console.log(res.data.boards[1].items[0]); //; ESTO ES LO QUE MANDO ANTES DE COMENTAR
        console.log(res.data);
      })
      .catch((err) => {
        setData("error");
        // console.log("log: 🚀  err", err);
      });
  }

  const guardar = () => {
    setData("guardado");
    var i = 0;
    var j = 1;
    // console.log("Until Guardado: ", until);
    data.boards.forEach((p) => {
      // console.log("p: ", p);
      if (p.items[2] && j <= until) {
        // console.log("Entraaaa: ", p);
        // console.log("i: ", i);
        var parts = data.boards[i].name.slice(-8).split(".");
        // console.log("parts ANTES: ", parts);
        // console.log(
        //   "parts: ",
        //   +parts[2] + 2000 + "-" + parts[1] + "-" + parts[0]
        // );
        var fecha = moment(+parts[2] + 2000 + "-" + parts[1] + "-" + parts[0]);
        j += 1;
        dispatch(deleteVehicle(fecha));
        dispatch(postVehicle(p, fecha));
      }
      i += 1;
    });
  };

  const search = () => {
    if (typeof entries !== "number" || entries <= 53) {
      setData("buscando");
      // console.log("Entries: ", entries);
      // console.log("Until: ", until);
      collect(entries, until);
    }
  };

  const handleChange = (e) => {
    setEntries(e.target.value * 2 + 3);
    setUntil(e.target.value * 1);
  };

  if (data.boards) {
    return (
      <div>
        <div className="container">
          <h3>All data received</h3>
        </div>
        <div className="container">
          <button className="btn-primary" onClick={() => guardar()}>
            Save
          </button>
        </div>
      </div>
    );
  } else if (data === "vacio") {
    return (
      <div>
        <div className="container">
          <h1>How many days?</h1>
          <input
            className="form-control me-2"
            type="number"
            min="0"
            placeholder="Quantity of entries..."
            aria-label="Search"
            onChange={handleChange}
          />
        </div>
        <div className="container">
          <button className="btn-primary" onClick={() => search()}>
            Search
          </button>
        </div>
      </div>
    );
  } else if (data === "buscando") {
    return (
      <div>
        <div className="spinner-border text-primary" role="status"></div>
        <div className="container">
          <h3 className="text">Wait</h3>
        </div>
      </div>
    );
  } else if (data === "error") {
    return (
      <div>
        <div className="container">
          <h3 className="text">There was an error, please try again.</h3>
        </div>
        <div className="container">
          <button className="btn-primary" onClick={() => search()}>
            Search
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h3>All data SAVED</h3>
      </div>
    );
  }
};
export default Catalogo;
