import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Typography,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

const SelectRole = () => {
  const initialPasswordState = {
    password: "",
    passwordError: "",
  };
  const [role, setRole] = useState("staff");
  const [rolePassword, setRolePassword] = useState(initialPasswordState);
  console.log(role);

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleRolePassword = (e) => {
    if (e.target.value.length === 0) {
      setRolePassword((state) => ({
        ...state,
        password: e.target.value,
        passwordError: "Password is required",
      }));
    } else if (e.target.value.length > 0 && e.target.value.length < 6) {
      setRolePassword((state) => ({
        ...state,
        password: e.target.value,
        passwordError: "Password must be of at least 6 characters",
      }));
    } else {
      setRolePassword((state) => ({
        ...state,
        password: e.target.value,
        passwordError: "",
      }));
    }
  };
  return (
    <div className="selectRoleContainer">
      <Typography variant="h3" color="secondary">
        Select a Role
      </Typography>
      <FormControl sx={{ boxShadow: 3, padding: 8, margin: 5 }}>
        <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="staff"
          name="radio-buttons-group"
          value={role}
          onChange={(e) => handleChange(e)}
          row
        >
          <FormControlLabel
            value="staff"
            control={<Radio color="success" />}
            label="Staff"
          />
          <FormControlLabel
            value="admin"
            control={<Radio color="warning" />}
            label="Admin"
          />
          <FormControlLabel value="parent" control={<Radio />} label="Parent" />
        </RadioGroup>
      </FormControl>
      {(role === "staff" || "admin") && role !== "parent" ? (
        <TextField
          label="Password"
          value={rolePassword.password}
          type="password"
          onChange={(e) => handleRolePassword(e)}
          required
          error={rolePassword.passwordError.length > 6}
          helperText={
            rolePassword.passwordError.length > 0
              ? rolePassword.passwordError
              : null
          }
          onBlur={(e) => handleRolePassword(e)}
        />
      ) : null}
      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
        disabled={
          role === "staff" || role === "admin"
            ? rolePassword.password.length === 0 ||
              rolePassword.passwordError.length > 0
            : false
        }
        color="success"
      >
        Access
      </Button>
    </div>
  );
};

export default SelectRole;
