import React from "react";
import Button from "@mui/material/Button";

import "./styles/FilterButton.css";

const FilterButton = ({ label, value, handleClick, isActive }) => {
  // return <button className="filter-button" onClick={() => handleClick(value)}>{label}</button>;

  const className = ["filter-button", isActive ? "selected" : ""].join(" ");
  return (
    <Button
      className={className}
      variant="contained"
      onClick={() => handleClick(value)}
    >
      {label}
    </Button>
  );
};

export default FilterButton;
