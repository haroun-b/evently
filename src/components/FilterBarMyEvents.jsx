import React from "react";

import "./styles/FilterBarMyEvents.css";

const FilterBarMyEvents = () => {
  return (
    <div className="filter-bar-myevents-container">
      <button>All</button>
      <button>Created</button>
      <button>Attending</button>
    </div>
  );
};

export default FilterBarMyEvents;
