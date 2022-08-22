import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const WeeklyView = ({ attendanceDetails, months, month }) => {
  return (
    <div>
      <Stack>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="Month"
            // onChange={(e) => handleChange(e.target.value)}
          >
            {months.map((singleMonth) => (
              <MenuItem key={singleMonth} value={singleMonth}>
                {singleMonth}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
};

export default WeeklyView;
