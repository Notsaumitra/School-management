import Navbar from "./Components/Shared//Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import SelectRole from "./Components/SelectRole";
import ClassRoom from "./Components/StaffModule/ClassRoom";
import SingleClass from "./Components/StaffModule/SingleClass";
import PageNotFound from "./Components/Shared/PageNotFound";
import AttendanceView from "./Components/AttendanceModule/AttendanceView";
import AddMeal from "./Components/LunchboxModule/AddMeal";
import WeeklyMeal from "./Components/LunchboxModule/WeeklyMeal";
import MonthlyMeal from "./Components/LunchboxModule/MonthlyMeal";
import MealTable from "./Components/LunchboxModule/MealTable";
import React from "react";
import MuiStyled from "./Components/Shared/MuiStyled";

const Meals = React.lazy(() => import("./Components/LunchboxModule/Meals"));
const LessonPlanHome = React.lazy(() =>
  import("./Components/LessonPlanModule/LessonPlanHome")
);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/selectRole" element={<SelectRole />} />
        <Route path="/classRoom" element={<ClassRoom />} />
        <Route path="/classRoom/:classId" element={<SingleClass />} />
        <Route
          path="/classRoom/:classId/viewAttendance"
          element={<AttendanceView />}
        />
        <Route
          path="/meals/:classId"
          element={
            <React.Suspense fallback={<h1>Something went wrong</h1>}>
              <Meals />
            </React.Suspense>
          }
        >
          <Route index element={<MealTable />} />
          <Route path="addmeal/:studentId" element={<AddMeal />} />
          <Route path="weeklyMeal/:studentId" element={<WeeklyMeal />} />
          <Route path="monthlyMeal/:studentId" element={<MonthlyMeal />} />
        </Route>
        <Route path="/styles" element={<MuiStyled />} />
        <Route
          path="/lessonPlan"
          element={
            <React.Suspense fallback={<h1>Something went wrong</h1>}>
              <LessonPlanHome />
            </React.Suspense>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
