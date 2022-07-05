import React, { useEffect, useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendActionBar from "../components/AttendActionBar";
import axiosInstance from "../../utils/axiosInstance";

import "./styles/EventPage.css";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const [event, setEvent] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const params = useParams();
  const username = localStorage.getItem("username");

  const url = `https://the-evently-api.herokuapp.com/events/${params.id}`;

  useEffect(() => {
    try {
      axiosInstance.get(url).then((response) => {
        setEvent(response.data);
        getAttendees()
        getAttendanceStatus()
      })
    } catch (error) {
      console.log(error);
    }
  }, []);



  function getAttendees() {
    console.log('event', event);
    const pendingAttendees = event.attendees.requests.filter(
      (request) => request === "pending"
    );
    setPending(pendingAttendees);
    const approvedAttendees = event.attendees.requests.filter(
      (request) => request === "approved"
    );
    setApproved(approvedAttendees)
    const rejectedAttendees = event.attendees.requests.filter(
      (request) => request === "rejected"
    );
    setRejected(rejectedAttendees)
  }

  //  Check attendance status
  // We should do that in the backend
  function getAttendanceStatus() {
    if (username === event.creator.username) {
      setAttendanceStatus("creator");
    } else if (pending.includes(username)) {
      setAttendanceStatus("pending");
    } else if (approved.includes(username)) {
      setAttendanceStatus("approved");
    } else if (rejected.includes(username)) {
      setAttendanceStatus("rejected");
    }
  }

  if (Object.keys(event).length === 0) {
    return <div>Loading</div>;
  }

  return (
    <div className="event-page">
      <header>
        <div className="event-page-edit-button">
          <button>Edit</button>
        </div>
        <picture>
          <img src="" alt="event picture" />
        </picture>
      </header>

      <main>
        <div className="event-page-info">
          <h4>{event.title}</h4>
          <p>
            From {event.startAt} to {event.endAt}
          </p>
          <p>Location</p>
        </div>
        <div className="creator-attendees">
          <div>{event.creator.name}</div>
          <div>Attendees:</div>
        </div>
        <div className="event-page-description">
          <p>Description: {event.description}</p>
        </div>
        <div className="event-page-price">
          <div>Price: {event.price}</div>
          <div className="event-page-attend-button">
            <AttendActionBar attendanceStatus={attendanceStatus} />
          </div>
        </div>
        <NavbarBottom />
      </main>
    </div>
  );
};

export default EventPage;
