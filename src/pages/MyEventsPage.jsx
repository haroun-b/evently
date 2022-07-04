import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import EventCard from "../components/EventCard";
import FilterBarMyEvents from "../components/FilterBarMyEvents";

const MyEventsPage = () => {
  return (
    <div>
      <FilterBarMyEvents />
      <h1>My Events</h1>
      <EventCard />
      <NavbarBottom />
    </div>
  );
};

export default MyEventsPage;
