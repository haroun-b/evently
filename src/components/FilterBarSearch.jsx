import React from "react";

import "./styles/FilterBarSearch.css";

const FilterBarSearch = () => {
  return (
    <div className="filter-bar-search-container">
      <div className="filter-bar-search-input">
        <input type="text" name="search-description" id="search-description" placeholder="Look for upcoming events" />
        <input type="text" name="search-location" id="search-location" placeholder="Location"/>
      </div>
      <div className="filter-bar-search-filters">
        <button>img</button>
        <button>Sort</button>
        <button>Date & time</button>
        <button>Category</button>
        <button>Approval</button>
        <button>Price</button>
      </div>
    </div>
  );
};

export default FilterBarSearch;
