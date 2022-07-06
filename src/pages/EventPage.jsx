import React, { useCallback, useEffect, useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendActionBar from "../components/AttendActionBar";
import axiosInstance from "../utils/axiosInstance";

import "./styles/EventPage.css";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get(`/events/${id}`)
      .then(({ data }) => {
        setEvent(data);
      })
      .catch((err) => {
        console.error(err);

        if (err.response.status === 404) {
          navigate('/404');
        } else {
          navigate('/500');
        }
      })
  }, [id]);


  const handleAttend = () => {
    axiosInstance.post(`/events/${id}/attendees`)
      .then(({ data }) => {
        setEvent({...event, myStatus: data.status});
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleCancel = () => {
    axiosInstance.delete(`/events/${id}/attendees`)
      .then(({data}) => {
        setEvent({ ...event, myStatus: data.status });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const openChat = () => { };

  const handlers = { handleAttend, handleCancel, openChat };

  if (Object.keys(event).length === 0) {
    return <div>Loading...</div>;
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
            <AttendActionBar
              {...handlers}
              attendanceStatus={event.myStatus}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventPage;
