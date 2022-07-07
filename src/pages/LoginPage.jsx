import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";

const theme = createTheme();

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const [passwordResetIsSuccessful, setPasswordResetIsSuccessful] =
    React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [credentials, setCredentials] = React.useState({
    alias: "",
    password: "",
  });

  console.log("credentials", credentials);

  const navigate = useNavigate();

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const request = { password };

    if (alias.includes(`@`)) {
      request.email = alias;
    } else {
      request.username = alias;
    }

    axios({
      method: "POST",
      url: `https://the-evently-api.herokuapp.com/login`,
      data: request,
    })
      .then(({ data }) => {
        window.localStorage.setItem(`authToken`, data.authToken);
        window.localStorage.setItem(`username`, data.username);
        navigate(`/events/mine`);
      })
      .catch((err) => {
        console.error(err.response);

        if (err.response.status === 404) {
          setErrorMsg("User does not exist!");
        } else if (err.response.data.errors.password) {
          setErrorMsg("Wrong password!");
        } else if (err.response.data.errors.verification) {
          setErrorMsg(
            "Your account is not yet verified please check your email!"
          );
        } else {
          setErrorMsg("Something went wrong!");
        }

        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      });
  }

  const { alias, password } = credentials;

  // Forgot password

  const handleForgotPassowrd = () => {
    axios({
      method: "PATCH",
      url: `https://the-evently-api.herokuapp.com/reset-password`,
      data: { email: credentials.alias },
    })
      .then(() => {
        setPasswordResetIsSuccessful(true);
        setTimeout(() => {
          setPasswordResetIsSuccessful(false);
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setErrorMsg("User does not exist!");
        } else {
          setErrorMsg("Something went wrong!");
        }

        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      });

    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {passwordResetIsSuccessful ? (
          <Alert severity="success">
            A password reset link was sent to your email!
          </Alert>
        ) : (
          <></>
        )}
        {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : <></>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="alias"
              label="Username or Email Address"
              name="alias"
              autoFocus
              value={alias}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <div>
                  <Link to={``} onClick={handleClickOpen}>
                    <p>Forgot password</p>
                  </Link>

                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Reset password</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To reset your password, please enter your email address
                        here, and then check your mail box.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        name="alias"
                        value={credentials.alias}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleForgotPassowrd}>Send</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Grid>
              <Grid item>
                <Link to={`/signup`}>
                  <p>Create account</p>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
