import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import MyLocationIcon from "@mui/icons-material/MyLocation";
import TuneIcon from "@mui/icons-material/Tune";
import Slider from "@mui/material/Slider";

import categories from "../utils/categories.data";
import EventCard from "./EventCard";

const SearchBar = ({setEvents}) => {
  const initialState = {
    longitude: undefined,
    latitude: undefined,
    searchRadius: 5,
    city: "",
    startAfter: new Date().toISOString(),
    endBefore: "",
    maxPrice: undefined,
    category: "",
    search: "",
    requiresApproval: "",
    isGroupEvent: "",
  }

  const [filterQuery, setFilterQuery] = useState(initialState);
  const [filtersAreOpen, setFiltersAreOpen] = useState(false);

  function handleChange(e) {
    setFilterQuery({ ...filterQuery, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const reqQuery = Object.entries(filterQuery)
      .filter(([key, value]) => value !== undefined && value.length !== 0)
      .map(([key, value]) => `${key}=${value}`)
      .join(`&`);

    console.log(reqQuery);

    axiosInstance.get(`/events/?${reqQuery}`)
      .then(({ data }) => {
        setEvents(
          data.events.map(({ title, price, description, startAt, endAt }) => {
            return <EventCard {...{ title, price, description, startAt, endAt}} />
          })
        )
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log(coords)
        const { longitude, latitude } = coords;

        setFilterQuery({ ...filterQuery, longitude, latitude });
      },
      (err) => { console.error(err) },
      { enableHighAccuracy: true }
    )
  }

  const {
    searchRadius,
    city,
    startAfter,
    endBefore,
    maxPrice,
    category,
    search,
    requiresApproval,
    isGroupEvent
  } = filterQuery;

  return (
    <form onSubmit={handleSubmit}>
      <div className="search">
        <input
          type="search"
          name="search"
          placeholder="Find upcoming events"
          value={search}
          onChange={e => handleChange(e)}
        />

        <input
          type="text"
          name="city"
          placeholder="city"
          value={city}
          onChange={e => handleChange(e)}
        />

        <MyLocationIcon
          onClick={() => getCurrentLocation()}
        />
      </div>

      <div className="filter-bar">
        <TuneIcon
          onClick={() => setFiltersAreOpen(!filtersAreOpen)}
        />

        {
          filtersAreOpen
          &&
          <div className="filters">
            <label htmlFor="searchRadius">Search radius</label>
            <Slider
              size="small"
              aria-label="search radius"
              valueLabelDisplay="auto"
              name="searchRadius"
              min={1}
              max={100}
              value={searchRadius}
              onChange={e => handleChange(e)}
            />

            <label htmlFor="startAfter">Starts after</label>
            <input
              type="datetime-local"
              name="startAfter"
              min={new Date().toISOString().slice(0, -8)}
              value={startAfter}
              onChange={e => handleChange(e)}
            />

            <label htmlFor="endBefore">End Before</label>
            <input
              type="datetime-local"
              name="endBefore"
              min={startAfter}
              value={endBefore}
              onChange={e => handleChange(e)}
            />

            <label htmlFor="maxPrice">Maximum price</label>
            <input
              type="number"
              name="maxPrice"
              min="0"
              value={maxPrice}
            />

            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={category}
              onChange={e => handleChange(e)}
            >
              <option value="">--Please choose an option--</option>

              {
                // TODO: get categories from db
                categories.map(category => {
                  return <option value={category}>{category}</option>;
                })
              }
            </select>

            <input
              type="checkbox"
              name="requiresApproval"
              value={requiresApproval}
              onChange={e => {
                setFilterQuery({ ...filterQuery, [e.target.name]: e.target.checked });
              }}
            />
            <label htmlFor="requiresApproval">Requires approval</label>

            <fieldset>
              <input
                type="radio"
                name="isGroupEvent"
                id="all"
                value=""
                onChange={e => handleChange(e)}
              />
              <label htmlFor="all">All</label>

              <input
                type="radio"
                name="isGroupEvent"
                id="goupOnly"
                value={true}
                onChange={e => handleChange(e)}
              />
              <label htmlFor="groupOnly">Group only</label>

              <input
                type="radio"
                name="isGroupEvent"
                id="duoOnly"
                value={false}
                onChange={e => handleChange(e)}
              />
              <label htmlFor="duoOnly">One on one only</label>
            </fieldset>

          </div>
        }
      </div>

      <input type="submit" value="Send" name="submit" />
    </form>
  );
};

export default SearchBar;
