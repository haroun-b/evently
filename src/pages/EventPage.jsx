import React from "react";
import NavbarBottom from "../components/NavbarBottom";

import "./styles/EventPage.css";

const EventPage = () => {
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
          <h4>Title</h4>
          <p>Date & time</p>
          <p>Location</p>
        </div>
        <div className="creator-attendees">
          <div>Creator</div>
          <div>Attendees</div>
        </div>
        <div className="event-page-description">
          <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.</p>
        </div>
        <div className="event-page-price">
          <div>Price</div>
          <div className="event-page-attend-button">
            <button>Attend</button>
          </div>
        </div>
        <NavbarBottom />
      </main>
    </div>
  );
};

export default EventPage;
