import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendeeCard from "../components/AttendeeCard";
import FilterBar from "../components/FilterBar";

const AttendeesPage = () => {
  const buttons = ['All', 'Approved', 'Pending', 'Rejected']
  return (
    <div>
      <FilterBar {...{buttons}} />
      <h1>AttendeesPage</h1>
      <AttendeeCard />
      <AttendeeCard />
      <NavbarBottom />
    </div>
  );
};

export default AttendeesPage;
