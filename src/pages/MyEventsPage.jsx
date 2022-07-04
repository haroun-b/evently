import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import EventCard from "../components/EventCard";
import FilterBarMyEvents from "../components/FilterBarEventsAttendees";

const MyEventsPage = () => {
  const buttons = ["All", "Created", "Attending"];
  return (
    <div>
      <FilterBarMyEvents {...{ buttons }} />
      <h1>My Events</h1>
      <EventCard />
      <EventCard />
      <EventCard />
      <NavbarBottom />
    </div>
  );
};

export default MyEventsPage;
