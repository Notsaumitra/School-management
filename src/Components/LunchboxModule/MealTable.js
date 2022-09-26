import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addStudentId, getStudentDetails } from "../../features/mealSlice";
import { useGetClassQuery } from "../../services/classRoomApiSlice";

const MealTable = () => {
  const { classId } = useParams();
  const { isLoading, isSuccess, error, data } = useGetClassQuery(classId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoAddMeals = (studentId) => {
    navigate(`addmeal/${studentId}`);
  };

  const gotoWeeklyMeals = (studentId) => {
    navigate(`weeklyMeal/${studentId}`);
  };
  const gotoMonthlyMeals = (studentId) => {
    navigate(`monthlyMeal/${studentId}`);
  };

  return (
    <>
      {isLoading && <Typography variant="h1">Loading...</Typography>}

      <Stack mt={10}>
        {isSuccess && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Student ID</TableCell>
                  <TableCell align="center">Student Name</TableCell>
                  <TableCell align="center">ADD Meals</TableCell>
                  <TableCell align="center">Weekly Meals</TableCell>
                  <TableCell align="center">Monthly Meals</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.students.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell align="center">{student.studentId}</TableCell>
                    <TableCell align="center">
                      {student.firstName + " " + student.lastName}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        onClick={() => gotoAddMeals(student._id)}
                      >
                        ADD Meal
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => gotoWeeklyMeals(student._id)}
                      >
                        SHOW
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => gotoMonthlyMeals(student._id)}
                      >
                        SHOW
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </>
  );
};

export default MealTable;
