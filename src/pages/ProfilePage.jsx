import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarBottom from "../components/NavbarBottom";
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

  const handleEdit = () => {

  };

  return (
    <div className="profile-page">
      <h1>ProfilePage</h1>
      
    </div>
  );
};

export default ProfilePage;
