import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import EventCard from "../components/EventCard";

const MyEventsPage = () => {
  return (
    <div>
      <h1>My Events</h1>
      <EventCard />
      <NavbarBottom />
    </div>
  );
};

export default MyEventsPage;
