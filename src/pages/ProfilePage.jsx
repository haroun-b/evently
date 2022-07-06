import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarBottom from "../components/NavbarBottom";
import axiosInstance from "../utils/axiosInstance";

import "./styles/ProfilePage.css";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const currentUser = useMemo(() => localStorage.username, [localStorage]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const url = pathname === `/users/${currentUser}` ? `/me` : pathname;

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

  }, [pathname]);

  const handleEdit = () => {

  };

  return (
    <div className="profile-page">
      <h1>ProfilePage</h1>
      <header>
        <div>
          <button onClick={handleEdit}>Edit</button>
        </div>
        <picture>
          <img src={userInfo.imageUrl} alt="profile-pic" />
        </picture>
      </header>
      <main>
        <div>{userInfo.name}</div>
        {/* <div>City</div> */}
        {/* <div>
          <p>Badges</p>
          <img src="" alt="1" />
          <img src="" alt="2" />
          <img src="" alt="3" />
          <img src="" alt="4" />
        </div> */}
        <div className="profile-page-bio-interest">
          <div>
            <p>{userInfo.bio}</p>
          </div>
          <div>
            <p>{userInfo.interests}</p>
          </div>
        </div>
      </main>

      <NavbarBottom />
    </div>
  );
};

export default ProfilePage;
