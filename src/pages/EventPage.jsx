import React, { useEffect } from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendActionBar from "../components/AttendActionBar";

import "./styles/EventPage.css";
import { useParams } from "react-router-dom";

const EventPage = () => {

  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://ih-beers-api2.herokuapp.com/beers/${params.id}`)
      .then((response) => {
        console.log("singlebeer", response.data);
        setBeer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          <p>
            Description: Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>
        </div>
        <div className="event-page-price">
          <div>Price</div>
          <div className="event-page-attend-button">
            <AttendActionBar />
          </div>
        </div>
        <NavbarBottom />
      </main>
    </div>
  );
};

export default EventPage;
