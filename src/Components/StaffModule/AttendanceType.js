import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
const AttendanceType = (props) => {
  const handleChange = (value, studentId) => {
    props.setIndividualAttendance(value, studentId);
  };
  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e) => handleChange(e.target.value, props._id)}
          row
        >
          <FormControlLabel
            value="isPresent"
            control={<Radio color="success" />}
            label="Present"
          />
          <FormControlLabel
            value="isAbsent"
            control={<Radio color="error" />}
            label="Absent"
          />
          <FormControlLabel
            value="isSick"
            control={<Radio color="warning" />}
            label="Sick"
          />
          <FormControlLabel
            value="isOnLeave"
            control={<Radio color="secondary" />}
            label="Leave"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default AttendanceType;
