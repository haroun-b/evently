import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendeeCard from "../components/AttendeeCard";
import FilterBarEventsAttendees from "../components/FilterBarEventsAttendees";

const AttendeesPage = () => {
  const buttons = ['All', 'Approved', 'Pending', 'Rejected']
  return (
    <div>
      <FilterBarEventsAttendees {...{buttons}} />
      <h1>AttendeesPage</h1>
      <AttendeeCard />
      <AttendeeCard />
      <NavbarBottom />
    </div>
  );
};

export default AttendeesPage;
