import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

import {
  Avatar,
  AvatarGroup,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

import "./styles/EventPage.css";
import AttendActionBar from "../components/AttendActionBar";

const EventPage = ({ currentUser }) => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/events/${id}`)
      .then(({ data }) => {
        setEvent(data);
      })
      .catch((err) => {
        console.error(err);
        switch (err.response.status) {
          case 401:
            navigate("/login");
            break;
          case 404:
            navigate("/404");
            break;
          default:
            navigate("/500");
            break;
        }
      });
  }, [id]);

  const handleAttend = () => {
    axiosInstance
      .post(`/events/${id}/attendees`)
      .then(({ data }) => {
        const newState = { myStatus: data.status };

        if (data.status === "approved") {
          newState.attendees = {
            ...event.attendees,
            approved: [...event.attendees.approved, data],
          };
        }

        setEvent({ ...event, ...newState });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    axiosInstance
      .delete(`/events/${id}/attendees`)
      .then(({ data }) => {
        const attendees = event.attendees;
        const newApproved = event.attendees.approved.filter(
          (attendee) => attendee.user.username !== currentUser
        );

        setEvent({
          ...event,
          myStatus: data.status,
          attendees: { ...attendees, approved: newApproved },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openChat = () => {
    navigate(`/events/${id}/chat`);
  };

  const handlers = { handleAttend, handleCancel, openChat };

  if (Object.keys(event).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="event-page">
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            top: ".2rem",
            right: ".2rem",
            zIndex: 1,
            color: "#000",
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <CloseRounded />
        </IconButton>

        <Stack
          sx={{
            textAlign: "left",
            marginBottom: "5rem",
            marginTop: "2rem",
            direction: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{
              height: "5%",
              marginBottom: "1rem",
            }}
          />

          <Container>
            <Typography variant="h4" component="h1">
              {event.title}
            </Typography>

            <Typography variant="subtitle2" component="h2">
              {`From: ${event.startAt.slice(0, -8)}`}
            </Typography>
            <Typography variant="subtitle2" component="h2">
              {`To: ${event.endAt.slice(0, -8)}`}
            </Typography>

            <Typography variant="subtitle1" component="h2">
              {`${event.address.street} - ${event.address.city}`}
            </Typography>
          </Container>

          <Container>
            <Typography variant="h6" component="h2">
              Description:
            </Typography>

            <Typography variant="body1">
              {event.description || "Nothing..."}
            </Typography>
          </Container>

          <Stack
            className="eventParticipents"
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
              marginTop: "2rem",
            }}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                width: "50vw",
                height: "5rem",
                padding: ".3rem",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#bfbfbf",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              onClick={() => {
                navigate(`/users/${event.creator.username}`);
              }}
            >
              <Typography variant="h6" component="h2">
                Creator
              </Typography>
              <Avatar alt={event.creator.name} src={event.creator.imageUrl} />
            </Stack>

            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                width: "50vw",
                height: "5rem",
                padding: ".3rem",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#bfbfbf",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              onClick={() => {
                navigate(`/events/${id}/attendees`);
              }}
            >
              <Typography variant="h6" component="h2">
                Attendees
              </Typography>
              <AvatarGroup max={4}>
                {(() => {
                  const attendees =
                    event.attendees.requests || event.attendees.approved;

                  return attendees.map((attendee) => (
                    <Avatar
                      alt={attendee.user.name}
                      src={attendee.user.imageUrl}
                      key={attendee.user.id}
                    />
                  ));
                })()}
              </AvatarGroup>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          className="eventParticipents"
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "4rem",
            backgroundColor: "#fff",
            border: "1px solid #000",
          }}
        >
          <Typography variant="h5" component="h2">
             {event.price ? `$ ${event.price}` : "Free"} 
          </Typography>

          <AttendActionBar {...handlers} attendanceStatus={event.myStatus} />
        </Stack>
      </div>
    </>
  );
};

export default EventPage;
