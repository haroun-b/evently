import React, { useEffect, useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import EventCard from "../components/EventCard";
import FilterBar from "../components/FilterBar";
import axiosInstance from "../utils/axiosInstance";

const MyEventsPage = () => {
  const [myEvents, setMyEvents] = useState([]);
  console.log('myEvents', myEvents);

  const url = `/me/events`;

  const [filter, setFilter] = useState("");

  // Filter event according to which button has been clicked
  const handleFilter = (filterValue) => {
    setFilter(filterValue);
    axiosInstance.get(url).then((response) => {
      if (filterValue === "all") {
        const mergedEvents = response.data.attendedByUser.concat(
          response.data.createdByUser
        );
        setMyEvents(mergedEvents);
      }
      if (filterValue === "created") {
        setMyEvents(response.data.createdByUser);
      }
      if (filterValue === "attending") {
        setMyEvents(response.data.attendedByUser);
      }
    });
  };

  // Load all my events when landing on page
  useEffect(() => {
    // Get all my events
      axiosInstance.get(url).then((response) => {
        const mergedEvents = response.data.attendedByUser.concat(
          response.data.createdByUser
        );
        setMyEvents(mergedEvents);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  const data = {
    classes: "filter-bar-events-attendees",
    filterButtons: [
      { label: "All", value: "all" },
      { label: "Created", value: "created" },
      { label: "Attending", value: "attending" },
    ],
  };
  return (
    <div>
      <FilterBar handleFilter={handleFilter} filter={filter} {...data} />
      <h1>My Events</h1>
      {myEvents.map((event) => {
        console.log('event', event)
        return <EventCard key={event._id} {...event} />;
      })}
    </div>
  );
};

export default MyEventsPage;
