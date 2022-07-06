import React, { useCallback, useEffect, useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import AttendActionBar from "../components/AttendActionBar";
import axiosInstance from "../utils/axiosInstance";

import "./styles/EventPage.css";
import { useParams } from "react-router-dom";
import { Avatar, AvatarGroup, Box, Container, Stack, Typography } from "@mui/material";

const EventPage = () => {
  const [event, setEvent] = useState({});
  console.log({ event })
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
        setEvent({ ...event, myStatus: data.status });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleCancel = () => {
    axiosInstance.delete(`/events/${id}/attendees`)
      .then(({ data }) => {
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
    <Stack
      sx={{
        textAlign: 'left'
      }}
    >
      <Stack className="topActionBar">

      </Stack>

      <img
        src={event.imageUrl}
        alt={event.title}
        style={{
          height: '5%',
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
          {event.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aspernatur facere asperiores alias, laborum fuga nisi enim ipsa reiciendis quod inventore et deserunt cum soluta iste ab reprehenderit dolor pariatur.
        </Typography>
      </Container>

      <Stack className="eventParticipents"
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: '50%',
            height: '5rem',
            padding: '.3rem',
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: '#bfbfbf',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Typography variant="h6" component="h2">
            Creator
          </Typography>
          <Avatar
            alt={event.creator.name}
            src={event.creator.imageUrl}
          />
        </Stack>

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: '50%',
            height: '5rem',
            padding: '.3rem',
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: '#bfbfbf',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Typography variant="h6" component="h2">
            Attendees
          </Typography>
          <AvatarGroup max={4}>
            {() => {
              const attendees = event.attendees.requests || event.attendees.approved;

              attendees.map(attendee => {
                <Avatar alt={attendee.name} src={attendee.imageUrl} />
              })
            }}
          </AvatarGroup>
        </Stack>
      </Stack>

      <AttendActionBar
        {...handlers}
        attendanceStatus={event.myStatus}
      />
    </Stack>
  );
};

export default EventPage;