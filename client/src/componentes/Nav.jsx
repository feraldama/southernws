import React from "react";
import Logo from "../img/logosrl.webp";
import SearchBar from "./SearchBar.jsx";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-container">
      <div className="img-container">
        <div className="nolink">
          <div>
            <img
              id="logoLATAM"
              src={Logo}
              width="160"
              height="65"
              alt="Logo LATAM"
            />
            <h1 className="titulo">
              <strong>Southern</strong>
            </h1>
          </div>
        </div>
      </div>
      {/* <Link to="/admin/">
        <button className="button-cart2">Administrador</button>
      </Link>
      <div className="search-bar">
        <SearchBar handleChange={(e) => console.log(e.target.value)} />
      </div> */}
      <br />
    </nav>
  );
};

export default Nav;
