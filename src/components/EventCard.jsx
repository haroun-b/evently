import React from "react";

import "./styles/EventCard.css";

const EventCard = ({title, price, description, startAt, endAt}) => {
  return (
    <div className="event-card">
      <div className="event-card-main-info">
        <p>Starts at: {startAt}</p>
        <p>Ends at: {endAt}</p>
        <p>City</p>
        <h3>Title: {title}</h3>
        <p>Description: {description}</p>
      </div>
      <div className="event-card-other-info">
        <p>Price: {price}</p>
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
