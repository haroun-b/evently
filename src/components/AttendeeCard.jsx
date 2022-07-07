import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../utils/axiosInstance";

import "./styles/AttendeeCard.css";

const AttendeeCard = (props) => {
  const navigate = useNavigate();
  const allStatus = ["approved", "rejected", "pending"];

  const [status, setStatus] = useState(props.status);

  const url = `/events/${props.event}/attendees/${props._id}`;

  const sendNewStatus = (newStatus) => {
    console.log("status about to send", newStatus);
    axiosInstance({ url, method: "patch", data: { status: newStatus } }).then(
      (response) => {
        console.log(response.data);
        setStatus(response.data.status);
      }
    );
  };

  const colorButton = status === "approved" ? "approved" : "";

  const handleChange = (e) => {
    sendNewStatus(e.target.value);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) {
      return;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="attendee-card-container">
      <div
        className="img-name"
        onClick={() => {
          navigate(`/users/${props.user.username}`);
        }}
      >
        <div className="attendee-card-image">
          <picture>
            <img src={props.user.imageUrl} alt="pic" />
          </picture>
        </div>
        <div className="attendee-card-info">
          <p>{props.user.name}</p>
        </div>
      </div>
      <div className="attendee-card-status">
        <form>
          <select
            className={colorButton}
            name="attendee-status"
            id="attendee-status"
            onChange={(e) => {
              handleChange(e);
            }}
            value={status}
          >
            {allStatus.map((value) => (
              <option value={value} key={value}>
                {capitalizeFirstLetter(value)}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
};

export default AttendeeCard;
