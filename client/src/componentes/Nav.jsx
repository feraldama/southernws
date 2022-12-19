import React from "react";
import Logo from "../img/logo.svg";
import "./Nav.css";

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
              onClick="window.location.reload()"
            />
          </div>
        </div>
      </div>
      <br />
    </nav>
  );
};

export default Nav;
