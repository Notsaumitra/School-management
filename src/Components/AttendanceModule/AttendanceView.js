import { Box, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import MonthlyView from "./MonthlyView";
import { useState } from "react";
import YearlyView from "./YearlyView";
import HalfYearlyView from "./HalfYearlyView";
import WeeklyView from "./WeeklyView";
import DailyView from "./DailyView";
import { useGetAttendanceForClassQuery } from "../../services/attendanceApiSlice";
import { useParams } from "react-router-dom";

const months = [
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
];

const AttendanceView = () => {
  const { classId } = useParams();

  const { data, isError, isLoading, isSuccess, error, isFetching } =
    useGetAttendanceForClassQuery(classId);
  const [view, setView] = useState("yearly");
  const today = new Date();

  const getCurrentSchoolYear = () => {
    if (today.getMonth() <= 5) {
      return today.getFullYear() - 1 + " - " + today.getFullYear();
    }
    return today.getFullYear() + " - " + (today.getFullYear() + 1);
  };

  const getTodayMonth = () => {
    const monthIndex = new Date().getMonth();
    if (monthIndex >= 6) {
      return months[monthIndex - 6];
    }
    return months[monthIndex + 6];
  };

  if (isLoading) return <Typography variant="h1">Loading</Typography>;
  if (isSuccess) {
    return (
      <>
        <Typography variant="subtitle1" color="secondary">
          <span style={{ color: "black" }}>Date:</span>
          {today.toLocaleDateString()}
        </Typography>
        <Stack direction="row" justifyContent="center">
          <Typography variant="h3">Session {getCurrentSchoolYear()}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" spacing={3}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setView("yearly")}
          >
            Yearly
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setView("halfYearly")}
          >
            Half Yearly
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setView("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setView("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setView("daily")}
          >
            Daily
          </Button>
        </Stack>
        {view === "yearly" && (
          <YearlyView attendanceDetails={data.findAttendance} />
        )}
        {view === "halfYearly" && (
          <HalfYearlyView attendanceDetails={data.findAttendance} />
        )}
        {view === "monthly" && (
          <MonthlyView
            attendanceDetails={data.findAttendance}
            months={months}
          />
        )}
        {view === "weekly" && (
          <WeeklyView
            attendanceDetails={data.findAttendance}
            month={getTodayMonth()}
            months={months}
          />
        )}
        {view === "daily" && (
          <DailyView
            attendanceDetails={data.findAttendance}
            months={months}
            month={getTodayMonth()}
          />
        )}
      </>
    );
  }
};

export default AttendanceView;
