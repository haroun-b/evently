import React from "react";

import "./styles/FilterBarMyEvents.css";

const FilterBarMyEvents = ({ buttons }) => {
  return (
    <div className="filter-bar-myevents-container">
      {buttons.map((button) => {
        return <button key={button}>{button}</button>;
      })}
    </div>
  );
};

export default FilterBarMyEvents;
