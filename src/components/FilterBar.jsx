import React from "react";

import FilterButton from "./FilterButton";

import "./styles/FilterBar.css";

const FilterBar = ({ handleFilter, filterButtons, classes }) => {
  return (
    <div className={classes}>
      {filterButtons.map((button) => {
        return (
          <FilterButton
            key={button.value}
            {...button}
            handleClick={handleFilter}
          />
        );
      })}
    </div>
  );
};

export default FilterBar;
