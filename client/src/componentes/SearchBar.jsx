import React from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  let history = useHistory();
  var route;
  const handleChange = (e) => {
    route = "/vehicles/search/" + e.target.value;
  };

  const redirect = () => {
    if (!route) return null;
    history.push(`${route}`);
    window.location.reload(true);
  };

  return (
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Búsqueda..."
        aria-label="Search"
        onChange={handleChange}
      />
      <button onClick={redirect} className="button-search">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
