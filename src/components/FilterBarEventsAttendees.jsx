import React from "react";

import "./styles/FilterBarMyEvents.css";

const FilterBarMyEvents = ({ buttons }) => {
  console.log(buttons);

  return (
    <div className="filter-bar-myevents-container">
      {buttons.map((button) => {
        return <button>{button}</button>;
      })}
    </div>
  );
};

export default FilterBarMyEvents;
