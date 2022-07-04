import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendeeCard from "../components/AttendeeCard";

const AttendeesPage = () => {
  return (
    <div>
      <h1>AttendeesPage</h1>
      <AttendeeCard />
      <AttendeeCard />
      <NavbarBottom />
    </div>
  );
};

export default AttendeesPage;
