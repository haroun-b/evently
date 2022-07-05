import * as React from 'react';
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import categories from "../utils/categories.data";
import EventCard from "./EventCard";

import MyLocationIcon from "@mui/icons-material/MyLocation";
import TuneIcon from "@mui/icons-material/Tune";
import Slider from "@mui/material/Slider";
import { Stack, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// TODO: breakdown searchbar into components
const SearchBar = ({ setEvents }) => {
  const initialState = {
    longitude: undefined,
    latitude: undefined,
    searchRadius: 5,
    city: "",
    startAfter: "",
    endBefore: "",
    maxPrice: undefined,
    category: "",
    search: "",
    requiresApproval: "",
    isGroupEvent: "",
  }

  const [filterQuery, setFilterQuery] = useState(initialState);
  const [filtersAreOpen, setFiltersAreOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFilterQuery({ ...filterQuery, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const reqQuery = Object.entries(filterQuery)
      .filter(([key, value]) => value !== undefined && value.length !== 0)
      .map(([key, value]) => `${key}=${value}`)
      .join(`&`);

    console.log(reqQuery);

    axiosInstance.get(`/events/?${reqQuery}`)
      .then(({ data }) => {
        console.log(data)
        setEvents(
          data.events.map((event) => {
            return <EventCard {...event} />
          })
        )

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
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
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <TuneIcon
          onClick={() => setFiltersAreOpen(!filtersAreOpen)}
        />
        <TextField
          label="Search"
          type="search"
          name="search"
          value={search}
          onChange={e => handleChange(e)}
        />

        <TextField
          label="City"
          name="city"
          value={city}
          onChange={e => handleChange(e)}
        />

        <MyLocationIcon
          onClick={() => getCurrentLocation()}
        />

        <LoadingButton
          onClick={handleSubmit}
          endIcon={<SearchIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Search
        </LoadingButton>
      </Stack>

      <>
        {
          filtersAreOpen
          &&
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <fieldset
              style={{ width: 800, margin: '0 auto', padding: '0 2rem', borderRadius: 5 }}
            >
              <legend
              style={{color: '#4e4e4e', padding: '.2rem', fontSize: '.8rem' }}
              >Search Radius</legend>
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
            </fieldset>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Starts After"
                name="startAfter"
                value={startAfter}
                minDateTime={Date.now()}
                onChange={(newValue) => {
                  setFilterQuery({ ...filterQuery, startAfter: newValue });
                }}
              />

              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Ends Before"
                name="endBefore"
                value={endBefore}
                minDateTime={startAfter || Date.now()}
                onChange={(newValue) => {
                  setFilterQuery({ ...filterQuery, endBefore: newValue });
                }}
              />
            </LocalizationProvider>



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

          </Stack>
        }
      </>
    </form>
  );
};

export default SearchBar;
