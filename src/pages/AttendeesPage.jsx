import React, { useEffect, useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendeeCard from "../components/AttendeeCard";
import FilterBar from "../components/FilterBar";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router";

const AttendeesPage = () => {
  const [attendees, setAttendees] = useState([]);
  const [filter, setFilter] = useState("");

  const { id } = useParams();
  const url = `/events/${id}`;

  // Filter attendees according to which button has been clicked
  const handleFilter = (filterValue) => {
    setFilter(filterValue);
    axiosInstance.get(url).then((response) => {
      if (filterValue === "all") {
        setAttendees(response.data.attendees.requests);
      } else if (filterValue === "approved") {
        const approvedAttendees = response.data.attendees.requests.filter(
          (request) => request.status === "approved"
        );
        setAttendees(approvedAttendees);
      } else if (filterValue === "pending") {
        const pendingAttendees = response.data.attendees.requests.filter(
          (request) => request.status === "pending"
        );
        setAttendees(pendingAttendees);
      } else if (filterValue === "rejected") {
        const rejectedAttendees = response.data.attendees.requests.filter(
          (request) => request.status === "rejected"
        );
        setAttendees(rejectedAttendees);
      }
    });
  };

  // Load all attendees when landing on page
  useEffect(() => {
    // Get all the attendees
    axiosInstance.get(url).then((response) => {
      console.log("response.data", response.data);
      setAttendees(response.data.attendees.requests);
    });
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
      <FilterBar handleFilter={handleFilter} filter={filter} {...data} />
      <h1>AttendeesPage</h1>
      {attendees.map((attendee) => {
        return <AttendeeCard key={attendee._id} {...attendee} />;
      })}
      <NavbarBottom />
    </div>
  );
};

export default AttendeesPage;
