import React from "react";
import NavbarBottom from "../components/NavbarBottom";

import "./styles/ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1>ProfilePage</h1>
      <header>
        <div>
          <button>Edit</button>
        </div>
        <picture>
          <img src="" alt="profile-pic" />
        </picture>
      </header>
      <main>
        <div>Name, Age</div>
        <div>City</div>
        <div>
          <p>Badges</p>
          <img src="" alt="1" />
          <img src="" alt="2" />
          <img src="" alt="3" />
          <img src="" alt="4" />
        </div>
        <div className="profile-page-bio-interest">
          <div>
            <p>
              Bio: Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
          </div>
          <div>
            <p>Interests</p>
          </div>
        </div>
      </main>

      <NavbarBottom />
    </div>
  );
};

export default ProfilePage;
