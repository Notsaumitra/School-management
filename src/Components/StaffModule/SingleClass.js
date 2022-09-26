import { Typography, Stack } from "@mui/material";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetClassQuery } from "../../services/classRoomApiSlice";
import ShowAttendance from "./ShowAttendance";
const SingleClass = () => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  // const navigate = useNavigate();
  const { classId } = useParams();
  const { data, isSuccess, error } = useGetClassQuery(classId);
  const fetchedData = useGetClassQuery(classId);
  console.log(fetchedData);

  const setAttendanceDate = (date) => {
    setSelectedDate(date);
  };

  if (error && error.status === 404) {
    return <Typography variant="h1">{error.data.message}</Typography>;
  } else if (error && error.status === 500) {
    return <Typography variant="h1">Not Found</Typography>;
  }
  return (
    <div>
      <Stack justifyContent="center" alignItems="center">
        <Typography variant="h4">Attendance</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Select a date</Typography>
        <input
          type="date"
          min="2022-07-01"
          max={today}
          value={selectedDate}
          onChange={(e) => {
            setAttendanceDate(e.target.value);
          }}
        />
      </Stack>
      {isSuccess && (
        <ShowAttendance
          key={selectedDate}
          data={data}
          date={Object.assign({}, { selectedDate })}
        />
      )}
    </div>
  );
};

export default SingleClass;
