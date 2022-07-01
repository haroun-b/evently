import React from "react";
import { Link } from "react-router-dom";

import './styles/SignupPage.css'

const SignupPage = () => {
  return (
    <div>
      <h1>SignUp Page</h1>
      <div className="signup-container">
        <form className="signup-form">
          <label htmlFor="">Username</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Email</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Password</label>
          <input type="text" name="" id="" />
          <div className="signup-buttons">
            <input type="submit" value="Sign up" name="" id="" />
            <Link to={`/login`}><button>Login</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
