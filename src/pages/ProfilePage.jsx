import { CloseRounded } from "@mui/icons-material";
import { Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditProfileActions from "../components/EditProfileActions";
import axiosInstance from "../utils/axiosInstance";

import "./styles/ProfilePage.css";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editOn, setEditOn] = useState(false);
  const currentUser = useMemo(() => localStorage.username, [localStorage]);

  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = username === currentUser ? `/me` : `/users/${username}`;

    axiosInstance.get(url)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch((err) => {
        console.error(err);

        if (err.response.status === 404) {
          navigate('/404');
        } else {
          navigate('/500');
        }
      })

  }, [username]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const handleImgClick = () => {
    if (!editOn) {
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => {
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      setUserInfo({ ...userInfo, newImageUrl, newImage: e.target.files[0] })
    }
  }

  const cancelEdit = () => {
    setEditOn(false);
    setUserInfo({...userInfo, newImage: undefined, newImageUrl: undefined})
  }

  const handleEdit = () => {
    const form = new FormData();
    const {name, bio} = userInfo;
    const file = userInfo.newImage;

    Object.entries({ name, bio, file }).forEach(([key, value]) => {
      form.append(key, value);
    });

    axiosInstance.patch('/me', form)
      .then(({ data }) => {
        setEditOn(false);
        setUserInfo(data);
      })
      .catch((err) => {
        console.error(err);
      })
  };


  return (
    <>
      <h1>ProfilePage</h1>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0.5}
        sx={{
          position: 'absolute',
          top: '.2rem',
          right: '.2rem',
          zIndex: 1,
          color: '#000'
        }}
      >
        {
          username === currentUser
            ?
            <EditProfileActions {...{ editOn, setEditOn, handleEdit, cancelEdit }} />
            :
            <IconButton
              aria-label="close"
              onClick={() => { navigate('..') }}
            >
              <CloseRounded />
            </IconButton>
        }
      </Stack>

      <Stack
        sx={{
          marginBottom: '5rem',
          marginTop: '2rem'
        }}
      >
        <img
          src={editOn && userInfo.newImageUrl ? userInfo.newImageUrl : userInfo.imageUrl}
          alt={userInfo.title}
          style={{
            maxHeight: '5%',
            marginBottom: '1rem'
          }}
          onClick= {handleImgClick}
        />


        {
          editOn
            ?
            <>
              <TextField
                label="Name"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
              />

              <TextField
                label="Bio"
                multiline
                name="bio"
                value={userInfo.bio}
                sx={{
                  marginTop: '1.2rem'
                }}
                onChange={e => { handleChange(e) }}
              />
            </>
            :
            <>
              <Typography variant="h4" component="h1">
                {userInfo.name && `${userInfo.name[0].toUpperCase()}${userInfo.name.slice(1)}`}
              </Typography>

              <Container
                sx={{
                  textAlign: 'left'
                }}
              >
                <Typography variant="h5" component="h2">
                  Bio:
                </Typography>

                <Typography variant="body1" component="p">
                  {userInfo.bio}
                </Typography>
              </Container>
            </>
        }


      </Stack>
    </>
  );
};


export default ProfilePage;