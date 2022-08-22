import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialUserValues = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  };

  const [formInput, setFormInput] = useState(initialUserValues);

  const submitForm = () => {
    console.log(formInput);
    navigate("/selectRole");
  };
  const redirectRegister = () => {
    navigate("/register");
  };

  const setFormValues = (e, inputType) => {
    switch (inputType) {
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
            Login
          </Typography>
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
                formInput.email.length === 0 ||
                formInput.password.length === 0 ||
                formInput.emailError.length !== 0 ||
                formInput.passwordError.length !== 0
              }
              onClick={() => submitForm()}
            >
              Login
            </Button>
            <div id="googleSignIn"></div>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle2">New User?</Typography>
            <Button
              variant="contained"
              color="warning"
              onClick={() => redirectRegister()}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default Login;
