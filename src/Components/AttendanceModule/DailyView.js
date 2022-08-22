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

const DailyView = ({ attendanceDetails }) => {
  console.log(attendanceDetails);
  const today = new Date().toISOString().split("T")[0];
  const [currentDailyState, setCurrentDailyState] = React.useState(today);

  const handleChange = (value) => {
    setCurrentDailyState(value);
    prepareAttendance();
  };

  let rowAttendanceObj;
  const prepareAttendance = () => {
    rowAttendanceObj = [];
    if (
      attendanceDetails.length &&
      attendanceDetails.find((atdObj) => atdObj.date === currentDailyState)
    ) {
      for (let i = 0; i < attendanceDetails[0].students.length; i++) {
        let studentRowObj = {
          firstName: attendanceDetails[0].students[i].student_id.firstName,
          lastName: attendanceDetails[0].students[i].student_id.lastName,
          studentId: attendanceDetails[0].students[i].student_id.studentId,
          _id: attendanceDetails[0].students[i].student_id._id,
          present: attendanceDetails.find(
            (atdObj) => atdObj.date === currentDailyState
          )?.students[i].isPresent,
          absent: attendanceDetails.find(
            (atdObj) => atdObj.date === currentDailyState
          )?.students[i].isAbsent,
          sick: attendanceDetails.find(
            (atdObj) => atdObj.date === currentDailyState
          )?.students[i].isSick,
          leave: attendanceDetails.find(
            (atdObj) => atdObj.date === currentDailyState
          )?.students[i].isOnLeave,
        };
        rowAttendanceObj.push(studentRowObj);
      }
    }
    console.log(rowAttendanceObj);
  };
  prepareAttendance();

  const getAttendanceTypeCells = () => {
    let attendanceTypeCells = [];
    for (let i = 0; i < 1; i++) {
      attendanceTypeCells = [
        ...attendanceTypeCells,
        "Present",
        "Absent",
        "Sick",
        "Leave",
      ];
    }
    return attendanceTypeCells;
  };

  return (
    <div>
      <Stack direction="row" justifyContent="center" mt={10} mb={5} spacing={2}>
        <FormControl>
          <label>
            <Typography variant="subtitle2">Select a Date</Typography>
          </label>
          <input
            type="date"
            max={today}
            value={currentDailyState}
            onChange={(e) => handleChange(e.target.value)}
          />
        </FormControl>
      </Stack>
      <div className="viewAttendanceContainer">
        <Stack>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              style={{ width: "800px" }}
              aria-label="spanning table"
            >
              <TableHead>
                <TableRow className="attendanceMainHeader">
                  <TableCell colSpan={1}>Daily View</TableCell>
                  <TableCell align="center" colSpan={4}>
                    Current Year
                  </TableCell>
                </TableRow>
                <TableRow className="attendanceSecondaryHeader">
                  <TableCell>Name</TableCell>
                  {getAttendanceTypeCells().map((cell, index) => (
                    <TableCell key={index} align="center">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowAttendanceObj.map((stu) => (
                  <TableRow key={stu.studentId}>
                    <TableCell className="studentNameColumn">
                      {stu.firstName + " " + stu.lastName}
                    </TableCell>
                    <TableCell
                      className={stu.present ? "presentCell" : ""}
                      align="center"
                    >
                      {stu.present ? "Yes" : "No"}
                    </TableCell>

                    <TableCell
                      className={stu.absent ? "absentCell" : ""}
                      align="center"
                    >
                      {stu.absent ? "Yes" : "No"}
                    </TableCell>
                    <TableCell
                      className={stu.sick ? "sickCell" : ""}
                      align="center"
                    >
                      {stu.sick ? "Yes" : "No"}
                    </TableCell>

                    <TableCell
                      className={stu.leave ? "leaveCell" : ""}
                      align="center"
                    >
                      {stu.leave ? "Yes" : "No"}
                    </TableCell>
                    {/*
                    <TableCell className="absentCell" align="center">
                      {stu.absent}
                    </TableCell>
                    <TableCell className="sickCell" align="center">
                      {stu.sick}
                    </TableCell>
                    <TableCell className="leaveCell" align="center">
                      {stu.leave}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </div>
    </div>
  );
};

export default DailyView;
