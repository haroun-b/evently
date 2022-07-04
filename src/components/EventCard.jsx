import React from "react";

import "./styles/EventCard.css";

const EventCard = () => {
  return (
    <div className="event-card">
      <div className="event-card-main-info">
        <p>Date Time</p>
        <p>City</p>
        <h3>Title</h3>
        <p>Description</p>
      </div>
      <div className="event-card-other-info">
        <p>Price</p>
        <picture>
          <img src="" alt="eventPic" />
        </picture>
        <div className="event-card-creator">
          <p>Name</p>
          <picture>
            <img src="" alt="creatorPic" />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
