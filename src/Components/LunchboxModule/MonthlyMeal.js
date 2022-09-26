import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMealsPerStudent,
  getStudentDetails,
} from "../../features/mealSlice";
import { Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const MonthlyMeal = () => {
  const dispatch = useDispatch();
  const { studentId: student_id } = useParams();

  const { isLoading, meals, studentDetails } = useSelector(
    (store) => store.meals
  );

  let monthlyMeals = [];

  for (let i = 0; i < 30; i++) {
    let date = new Date();
    date.setDate(date.getDate() + i);
    let mealObject = {
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
      date: date.toISOString().split("T")[0],
    };
    monthlyMeals.push(mealObject);
  }
  console.log(monthlyMeals);

  useEffect(() => {
    dispatch(getStudentDetails(student_id));
    dispatch(getAllMealsPerStudent(student_id));
  }, []);

  if (isLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }
  return (
    <Stack mt={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#4CAF50" }}>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Day</TableCell>
              <TableCell align="center">Changed</TableCell>
              <TableCell>Meals</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyMeals.map((meal) => (
              <TableRow key={meal.date}>
                <TableCell align="center">{meal.date}</TableCell>
                <TableCell align="center">{meal.day}</TableCell>
                <TableCell align="center">
                  {meals.find((singleMeal) => singleMeal.date === meal.date)
                    ?.isChanged ? (
                    <Chip label="Changed" color="error" />
                  ) : (
                    <Chip label="Not changed" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Avatar
                    alt="/"
                    src={`/images/${
                      meals.find((singleMeal) => singleMeal.date === meal.date)
                        ?.mealId
                    }meal200x200px.jpg`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default MonthlyMeal;
