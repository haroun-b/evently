import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import './styles/SignupPage.css'

const SignupPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios({
      method: 'POST',
      url: `https://the-evently-api.herokuapp.com/signup`,
      data: credentials,
    })
      .then((res) => {
        if (res.status === 201) {
          window.alert(`redirect to a please verify page`);
        }
      })
      .catch((err) => {
        const {status} = err.response;

        if (status === 401) {
          window.alert(`redirect to login page`);
        }
      });

  }

  const {
    username,
    email,
    password
  } = credentials;

  return (
    <div>
      <h1>SignUp Page</h1>

      <div className="signup-container">

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => handleChange(e)}
          />

          <label htmlFor="">Email</label>
          <input
          type="text"
          name="email"
          value={email}
          onChange={e => handleChange(e)}
          />

          <label htmlFor="">Password</label>
          <input
          type="text"
          name="password"
          value={password}
          onChange={e => handleChange(e)}
          />

          <div className="signup-buttons">
            <input type="submit" value="Signup" name="signup" />
            <Link to={`/login`}><button>Login</button></Link>
          </div>
        </form>

      </div>
    </div>
  );
};


export default SignupPage;