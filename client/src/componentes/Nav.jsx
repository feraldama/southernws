import React from "react";
import Logo from "../img/logo.svg";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav-container">
      <div className="img-container">
        <div className="nolink">
          <img
            id="logoSOUTHERN"
            className="img"
            src={Logo}
            width="160"
            height="65"
            alt="Southern Logo"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
      <br />
    </nav>
  );
};

export default Nav;
