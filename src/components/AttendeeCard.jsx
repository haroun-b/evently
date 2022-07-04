import React from "react";

import "./styles/AttendeeCard.css";

const AttendeeCard = () => {
  return (
    <div className="attendee-card-container">
      <div className="attendee-card-image">
        <picture>
          <img src="" alt="pic" />
        </picture>
      </div>
      <div className="attendee-card-info">
        <p>Name, Age</p>
        <div>Badges</div>
      </div>
      <div className="attendee-card-status">
        <form>
          <select name="attendee-status" id="attendee-status">
            <option value="" disabled selected>
              Pending
            </option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default AttendeeCard;
