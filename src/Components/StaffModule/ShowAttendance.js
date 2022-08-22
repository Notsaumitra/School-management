import { Stack, Typography } from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useGetAttendanceQuery,
  useAddAttendanceMutation,
} from "../../services/attendanceApiSlice";
import AttendanceType from "./AttendanceType";

const ShowAttendance = ({ data, date }) => {
  const [addAttendance] = useAddAttendanceMutation();
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: singleData,
  } = useGetAttendanceQuery({
    classId: data.data.classId,
    date: date.selectedDate,
  });
  //   console.log(date);
  console.log(singleData);
  //   console.log(error);

  const initialState = {
    date: date.selectedDate,
    classId: data.data.classId,
    students: [],
  };

  const [attendanceState, setAttendanceState] = useState(initialState);

  const setIndividualAttendance = (value, student_id) => {
    const obj = {
      student_id,
      [value]: true,
    };
    const index = attendanceState.students.findIndex(
      (student) => student.student_id === student_id
    );
    if (index === -1) {
      setAttendanceState({
        ...attendanceState,
        students: [...attendanceState.students, obj],
      });
    } else {
      let arr = [...attendanceState.students];
      arr[index] = obj;
      setAttendanceState({
        ...attendanceState,
        students: [...arr],
      });
    }
  };

  if (isLoading) return <Typography variant="h1">Loading</Typography>;

  if (isError && error.data.message === "Attendance not marked") {
    return (
      <div>
        <TableContainer component={Paper} sx={{ width: "80%", mx: 20 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>
                    {student.firstName + " " + student.lastName}
                  </TableCell>
                  <TableCell>
                    <AttendanceType
                      studentId={student._id}
                      setIndividualAttendance={setIndividualAttendance}
                      {...student}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            color="secondary"
            disabled={
              attendanceState.students.length !== data.data.students.length
            }
            onClick={() => {
              console.log(attendanceState);
              addAttendance(attendanceState);
            }}
          >
            Submit
          </Button>
        </Stack>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <TableContainer component={Paper} sx={{ width: "80%", mx: 20 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {singleData.findAttendance.students.map((student, index) => (
                <TableRow key={student.student_id.studentId}>
                  <TableCell>{student.student_id.studentId}</TableCell>
                  <TableCell>
                    {student.student_id.firstName +
                      " " +
                      student.student_id.lastName}
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={
                          student.isPresent
                            ? "isPresent"
                            : student.isAbsent
                            ? "isAbsent"
                            : student.isSick
                            ? "isSick"
                            : "isOnLeave"
                        }
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};

export default ShowAttendance;
