import React from "react";
import { Link } from "react-router-dom";
import './styles/LoginPage.css'

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <div className="login-container">
        <form className="login-form">
          <label htmlFor="">Username or email</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Password</label>
          <input type="text" name="" id="" />
          <div className="login-buttons">
            <input type="submit" value="Login" name="" id="" />
            <Link to={`/signup`}>
              <button>Create account</button>
            </Link>
          </div>
          <p>Reset Password</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
