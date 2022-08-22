import { Button } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllClassesQuery } from "../../services/classRoomApiSlice";
import { useNavigate } from "react-router-dom";

const ClassRoom = () => {
  // const { classRoom } = useSelector((store) => store.classroom);
  const { isLoading, isSuccess, data } = useGetAllClassesQuery();
  const navigate = useNavigate();
  const gotoAttendance = (classId) => {
    navigate(`${classId}`);
  };
  const gotoLessonPlan = (classId) => {};

  const gotoStudentDetails = (classId) => {};

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isSuccess) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Number of Students</TableCell>
              <TableCell>View Student Details</TableCell>
              <TableCell>Attendance Details</TableCell>
              <TableCell>Lesson Plan Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((singleClass) => (
              <TableRow key={singleClass.classId}>
                <TableCell>{singleClass.classId}</TableCell>
                <TableCell>{singleClass.className}</TableCell>
                <TableCell>{singleClass.students.length}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => gotoStudentDetails(singleClass.classId)}
                  >
                    View Student Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    onClick={() => gotoAttendance(singleClass.classId)}
                  >
                    View Attendance
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => gotoLessonPlan(singleClass.classId)}
                  >
                    View Lesson Plan
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default ClassRoom;
