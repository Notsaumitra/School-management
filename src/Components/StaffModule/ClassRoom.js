import { Button } from "@mui/material";
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
  const { isLoading, isSuccess, data: classData } = useGetAllClassesQuery();
  const navigate = useNavigate();
  const gotoAttendance = (classId) => {
    navigate(`${classId}`);
  };
  const gotoAttendanceView = (classId) => {
    navigate(`${classId}/viewAttendance`);
  };

  const gotoStudentMeals = (classId) => {
    navigate(`/meals/${classId}`);
  };
  let newData;
  if (classData?.data) {
    newData = [...classData.data];
    newData?.sort((a, b) => a.classId - b.classId);
    console.log(newData);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isSuccess) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#8bc34a" }}>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell align="center">Class</TableCell>
              <TableCell align="center">Number of Students</TableCell>
              <TableCell align="center">Add Attendance</TableCell>
              <TableCell align="center">Attendance Details</TableCell>
              <TableCell align="center">Edit/View Meals</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#fff9c4" }}>
            {newData.map((singleClass) => (
              <TableRow key={singleClass.classId}>
                <TableCell align="center">{singleClass.classId}</TableCell>
                <TableCell align="center">{singleClass.className}</TableCell>
                <TableCell align="center">
                  {singleClass.students.length}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    onClick={() => gotoAttendance(singleClass.classId)}
                  >
                    Add Attendance
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => gotoAttendanceView(singleClass.classId)}
                  >
                    View Attendance
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="success"
                    variant="outlined"
                    onClick={() => gotoStudentMeals(singleClass.classId)}
                  >
                    View / Edit Meals
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
