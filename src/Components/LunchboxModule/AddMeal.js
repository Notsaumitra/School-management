import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedDate,
  getAllMealsPerStudent,
  getStudentDetails,
  postSingleMeal,
  addStudentMealOption,
  updateSingleMeal,
} from "../../features/mealSlice";
import {
  Stack,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AddMeal = () => {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const validDate = () => {
    const dateArray = today.split("-");
    dateArray[1] =
      +dateArray[1] <= 8
        ? "0" + (+dateArray[1] + 1)
        : +dateArray <= 10
        ? +dateArray[1] + 1
        : "00";
    return dateArray.join("-");
  };
  const { studentId: student_id } = useParams();

  const { studentDetails, meals, selectedDate, selectedMeal, isChanged } =
    useSelector((store) => store.meals);

  useEffect(() => {
    console.log("use effect");
    dispatch(addSelectedDate(today));
    dispatch(getStudentDetails(student_id));
    dispatch(getAllMealsPerStudent(student_id));
  }, []);

  const setAttendanceDate = (date) => {
    dispatch(addSelectedDate(date));
  };

  const postMeal = () => {
    const mealObj = {
      date: selectedDate + "",
      mealId: +selectedMeal,
      student_id: studentDetails._id,
      classId: studentDetails.classId,
    };
    dispatch(postSingleMeal(mealObj));
    // dispatch(getAllMealsPerStudent(student_id));
  };

  const updateMeal = () => {
    const mealObj = {
      date: selectedDate + "",
      mealId: selectedMeal,
      student_id: studentDetails._id,
      classId: studentDetails.classId,
    };
    dispatch(updateSingleMeal(mealObj));
    // dispatch(getAllMealsPerStudent(student_id));
  };

  return (
    <>
      <Stack direction="row" spacing={3} mt={2}>
        <Typography variant="h6">Select a date</Typography>
        <input
          type="date"
          min={today}
          max={validDate()}
          value={selectedDate}
          onChange={(e) => {
            setAttendanceDate(e.target.value);
          }}
        />
      </Stack>
      {meals.find((meal) => meal.date == selectedDate) ? (
        <Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Changed</TableCell>
                  <TableCell align="center">Meals</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={studentDetails.studentId}>
                  <TableCell>{studentDetails.studentId}</TableCell>
                  <TableCell>
                    {studentDetails.firstName + " " + studentDetails.lastName}
                  </TableCell>
                  <TableCell>{isChanged ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={selectedMeal}
                        row
                        onChange={(e) =>
                          dispatch(addStudentMealOption(+e.target.value))
                        }
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio color="success" />}
                          label="Healthy Veg"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio color="warning" />}
                          label="Fruits"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio color="secondary" />}
                          label="Pizza"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="center" mt={2}>
            <Button
              onClick={() => updateMeal()}
              variant="contained"
              color="error"
            >
              Edit Meal
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="center">Meals</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={studentDetails.studentId}>
                  <TableCell>{studentDetails.studentId}</TableCell>
                  <TableCell>
                    {studentDetails.firstName + " " + studentDetails.lastName}
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={selectedMeal}
                        row
                        onChange={(e) =>
                          dispatch(addStudentMealOption(e.target.value))
                        }
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio color="success" />}
                          label="Healthy Veg"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio color="warning" />}
                          label="Fruits"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio color="secondary" />}
                          label="Pizza"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="center" mt={2}>
            <Button
              onClick={() => postMeal()}
              variant="contained"
              color="primary"
            >
              ADD Meal
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default AddMeal;
