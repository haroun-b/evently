import React, { useEffect, useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import EventCard from "../components/EventCard";
import FilterBar from "../components/FilterBar";
import axiosInstance from "../../utils/axiosInstance";

const MyEventsPage = () => {
  const [myEvents, setMyEvents] = useState([]);
  console.log(myEvents);

  const url = `/me/events`;

  // Filter event according to which button has been clicked
  const handleFilter = (filter) => {
    try {
      axiosInstance.get(url).then((response) => {
        if (filter === "all") {
          const mergedEvents = response.data.attendedByUser.concat(
            response.data.createdByUser
          );
          setMyEvents(mergedEvents);
        }
        if (filter === "created") {
          setMyEvents(response.data.createdByUser);
        }
        if (filter === "attending") {
          setMyEvents(response.data.attendedByUser);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Load all my events when landing on page
  useEffect(() => {
    // Get all my events
    try {
      axiosInstance.get(url).then((response) => {
        const mergedEvents = response.data.attendedByUser.concat(
          response.data.createdByUser
        );
        setMyEvents(mergedEvents);
      });
    } catch (error) {
      console.error(error);
    }
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
      <FilterBar handleFilter={handleFilter} {...data} />
      <h1>My Events</h1>
      {myEvents.map((event) => {
        return <EventCard key={event._id} {...event} />;
      })}
      <NavbarBottom />
    </div>
  );
};

export default MyEventsPage;
