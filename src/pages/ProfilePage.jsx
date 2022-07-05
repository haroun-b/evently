import React, { useEffect, useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import axiosInstance from "../utils/axiosInstance";

import "./styles/ProfilePage.css";

const ProfilePage = () => {
  const [myInfo, setMyInfo] = useState({});
  console.log("myInfo", myInfo);

  const url = `/me`;
  useEffect(() => {
    try {
      axiosInstance.get(url).then((response) => {
        setMyInfo(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

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
          <img src={myInfo.imageUrl} alt="profile-pic" />
        </picture>
      </header>
      <main>
        <div>{myInfo.name}</div>
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
            <p>{myInfo.bio}</p>
          </div>
          <div>
            <p>{myInfo.interests}</p>
          </div>
        </div>
      </main>

      <NavbarBottom />
    </div>
  );
};

export default ProfilePage;
