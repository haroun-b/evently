import React from "react";

const FilterButton = ({ label, value, handleClick }) => {
  return <button onClick={() => handleClick(value)}>{label}</button>;
};

export default FilterButton;
