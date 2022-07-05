import React from "react";

import "./styles/EventCard.css";

const EventCard = (
  {
    title,
    price,
    imageUrl,
    description,
    startAt,
    endAt,
    creator,
    address: {city}
  }
) => {
  return (
    <div className="event-card">
      <div className="event-card-main-info">
        <p>{startAt.slice(0, -8)}</p>
        <p>{endAt.slice(0, -8)}</p>
        <p>{city}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="event-card-other-info">
        <p>{price || 'Free'}</p>
        <picture>
          <img src={imageUrl} alt="eventPic" />
        </picture>
        <div className="event-card-creator">
          <p>{creator.name}</p>
          <picture>
            <img src={creator.imageUrl} alt="creatorPic" />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
