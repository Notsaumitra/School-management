import { useState, useEffect } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  function handleLogin(response) {
    //jwt needs to be decoded
    console.log(response.credential);
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "893746813416-o69gbhbajk1e9no0mjfebtnoas3hmijc.apps.googleusercontent.com",
      callback: handleLogin,
    });

    google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  const initialUserValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  };

  //   const initialErrorValues = {};
  const [formInput, setFormInput] = useState(initialUserValues);

  const submitForm = () => {
    console.log(formInput);
    localStorage.setItem("user", JSON.stringify(formInput));
    console.log(JSON.parse(localStorage.getItem("user")));
    navigate("/selectRole");
  };
  const redirectLogin = () => {
    navigate("/");
  };

  const setFormValues = (e, inputType) => {
    switch (inputType) {
      case "firstName":
        if (e.target.value.length === 0) {
          setFormInput((state) => ({
            ...state,
            firstName: e.target.value,
            firstNameError: "First Name is required",
          }));
        } else if (e.target.value.length > 0 && e.target.value.length < 4) {
          setFormInput((state) => ({
            ...state,
            firstName: e.target.value,
            firstNameError: "First Name should be more than 3 characters",
          }));
        } else {
          setFormInput((state) => ({
            ...state,
            firstName: e.target.value,
            firstNameError: "",
          }));
        }
        break;
      case "lastName":
        if (e.target.value.length === 0) {
          setFormInput((state) => ({
            ...state,
            lastName: e.target.value,
            lastNameError: "Last Name is required",
          }));
        } else if (e.target.value.length > 0 && e.target.value.length < 4) {
          setFormInput((state) => ({
            ...state,
            lastName: e.target.value,
            lastNameError: "Last Name should be more than 3 characters",
          }));
        } else {
          setFormInput((state) => ({
            ...state,
            lastName: e.target.value,
            lastNameError: "",
          }));
        }
        break;
      case "email":
        const regEx =
          /^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9]).[a-z0-9]{2,10}(?:.[a-z]{2,10})?$/;
        // console.log(regEx.test(e.target.value));
        if (e.target.value.length === 0) {
          setFormInput((state) => ({
            ...state,
            email: e.target.value,
            emailError: "Email is required",
          }));
        } else if (!regEx.test(e.target.value)) {
          setFormInput((state) => ({
            ...state,
            email: e.target.value,
            emailError: "Email should be of type abc@xyz.com",
          }));
        } else {
          setFormInput((state) => ({
            ...state,
            email: e.target.value,
            emailError: "",
          }));
        }
        break;
      case "password":
        if (e.target.value.length === 0) {
          setFormInput((state) => ({
            ...state,
            password: e.target.value,
            passwordError: "Password is required",
          }));
        } else if (e.target.value.length > 0 && e.target.value.length < 6) {
          setFormInput((state) => ({
            ...state,
            password: e.target.value,
            passwordError: "Password should be of at least 6 characters",
          }));
        } else {
          setFormInput((state) => ({
            ...state,
            password: e.target.value,
            passwordError: "",
          }));
        }
        break;
      default:
        console.log("default");
        break;
    }
  };

  return (
    <div className="registerContainer">
      <Typography variant="h3" color="primary">
        School Management App
      </Typography>
      <div className="registerForm">
        <Stack
          spacing={2}
          p={5}
          mt={3}
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%" }}
          sx={{ boxShadow: 3, maxWidth: "100%" }}
        >
          <Typography variant="h5" color="primary">
            Register Yourself
          </Typography>
          <TextField
            label="First Name"
            value={formInput.firstName}
            onChange={(e) => setFormValues(e, "firstName")}
            required
            error={formInput.firstNameError.length > 0}
            helperText={
              formInput.firstNameError.length > 0
                ? formInput.firstNameError
                : null
            }
            onBlur={(e) => setFormValues(e, "firstName")}
          />
          <TextField
            label="Last Name"
            value={formInput.lastName}
            onChange={(e) => setFormValues(e, "lastName")}
            required
            error={formInput.lastNameError.length > 0}
            helperText={
              formInput.lastNameError.length > 0
                ? formInput.lastNameError
                : null
            }
            onBlur={(e) => setFormValues(e, "lastName")}
          />
          <TextField
            label="Email"
            value={formInput.email}
            onChange={(e) => setFormValues(e, "email")}
            required
            error={formInput.emailError.length > 0}
            helperText={
              formInput.emailError.length > 0 ? formInput.emailError : null
            }
            onBlur={(e) => setFormValues(e, "email")}
          />
          <TextField
            label="Password"
            value={formInput.password}
            type="password"
            onChange={(e) => setFormValues(e, "password")}
            required
            error={formInput.passwordError.length > 0}
            helperText={
              formInput.passwordError.length > 0
                ? formInput.passwordError
                : null
            }
            onBlur={(e) => setFormValues(e, "password")}
          />
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              variant="contained"
              color="inherit"
              mr={2}
              disabled={
                formInput.firstName.length === 0 ||
                formInput.lastName.length === 0 ||
                formInput.email.length === 0 ||
                formInput.password.length === 0 ||
                formInput.firstNameError.length !== 0 ||
                formInput.lastNameError.length !== 0 ||
                formInput.emailError.length !== 0 ||
                formInput.passwordError.length !== 0
              }
              onClick={() => submitForm()}
            >
              Register
            </Button>
            <div id="googleSignIn"></div>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle2">Already have a account?</Typography>
            <Button
              variant="contained"
              color="warning"
              onClick={() => redirectLogin()}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default Register;
