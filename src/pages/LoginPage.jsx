import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './styles/LoginPage.css'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    alias: '',
    password: '',
  });

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const request = {password};

    if (alias.includes(`@`)) {
      request.email = alias;
    } else {
      request.username = alias;
    }

    axios({
      method: 'POST',
      url: `https://the-evently-api.herokuapp.com/login`,
      data: request,
    })
      .then(({data}) => {
        window.localStorage.setItem(`authToken`, data.authToken);
      })
      .catch((err) => {
        console.error(err)
        // TODO: display appropriate error based on error response
      });

  }

  const {
    alias,
    password
  } = credentials;


  return (
    <div>
      <h1>Login Page</h1>

      <div className="login-container">

        <form className="login-form" onSubmit={handleSubmit}>

          <label htmlFor="">Username or email</label>
          <input
            type="text"
            name="alias"
            value={alias}
            onChange={e => handleChange(e)}
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => handleChange(e)}
          />

          <div className="login-buttons">
            <input type="submit" value="Login" name="login" />

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
