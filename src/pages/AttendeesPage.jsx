import React, { useEffect, useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendeeCard from "../components/AttendeeCard";
import FilterBar from "../components/FilterBar";
import axiosInstance from "../../utils/axiosInstance";

const AttendeesPage = () => {

  const [attendees, setAttendees] = useState([]);

  const url = `/events/62c3f0ae36637d5c94107838`;

  // Filter attendees according to which button has been clicked
  const handleFilter = (filter) => {
    try {
      axiosInstance.get(url).then((response) => {
        if (filter === "all") {
          setAttendees(response.data.attendees);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Load all attendees when landing on page
  useEffect(() => {
    // Get all the attendees 
    try {
      axiosInstance.get(url).then((response) => {
        console.log(response.data.attendees.request)
        setAttendees(response.data.attendees.request);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  const data = {
    classes: "filter-bar-events-attendees",
    filterButtons: [
      { label: "All", value: "all" },
      { label: "Approved", value: "approved" },
      { label: "Pending", value: "pending" },
      { label: "Rejected", value: "rejected" },
    ],
  };

  return (
    <div>
      <FilterBar handleFilter={handleFilter} {...data} />
      <h1>AttendeesPage</h1>
      {attendees.map((attendee) => {
        return <AttendeeCard key={attendee._id} {...attendee} />;
      })}
      <NavbarBottom />
    </div>
  );
};

export default AttendeesPage;
