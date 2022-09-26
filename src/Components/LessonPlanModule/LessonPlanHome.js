import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
} from "@mui/material";

import { useGetAllClassesQuery } from "../../services/classRoomApiSlice";
import {
  useGetStaffQuery,
  useGetLessonPLanQuery,
} from "../../services/lessonPlanApiSlice";
import LessonTable from "./LessonTable";

const weekData = {
  classId: "",
  days: [
    {
      dayName: "Monday",
      timeSlot: [
        {
          periodTime: "9AM-10AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "10AM-11AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "11AM-12PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "1PM-2PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "2PM-3PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "3PM-4PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
      ],
    },
    {
      dayName: "Tuesday",
      timeSlot: [
        {
          periodTime: "9AM-10AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "10AM-11AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "11AM-12PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "1PM-2PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "2PM-3PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "3PM-4PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
      ],
    },
    {
      dayName: "Wednesday",
      timeSlot: [
        {
          periodTime: "9AM-10AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "10AM-11AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "11AM-12PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "1PM-2PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "2PM-3PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "3PM-4PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
      ],
    },
    {
      dayName: "Thursday",
      timeSlot: [
        {
          periodTime: "9AM-10AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "10AM-11AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "11AM-12PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "1PM-2PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "2PM-3PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "3PM-4PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
      ],
    },
    {
      dayName: "Friday",
      timeSlot: [
        {
          periodTime: "9AM-10AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "10AM-11AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "11AM-12PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "1PM-2PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "2PM-3PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "3PM-4PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
      ],
    },
    {
      dayName: "Saturday",
      timeSlot: [
        {
          periodTime: "9AM-10AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "10AM-11AM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "11AM-12PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "1PM-2PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "2PM-3PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
        {
          periodTime: "3PM-4PM",
          taughtBy: "",
          subject: "",
          topics: [],
        },
      ],
    },
  ],
};

const LessonPlanHome = () => {
  const [className, setClassName] = useState(1);

  const { isLoading, data: classData } = useGetAllClassesQuery();

  const { isLoadingStaffData, data: staffData } = useGetStaffQuery();

  const { data: lessonFetchedData, error } = useGetLessonPLanQuery({
    classId: className,
  });

  let lessonPlanData = lessonFetchedData
    ? { ...lessonFetchedData.singleLessonPlan }
    : { ...weekData };
  let lessonPlanExists = true;
  console.log(lessonFetchedData);
  console.log(error);
  if (error && error.status === 404 && error.data.message === "Not Found") {
    weekData.classId = className;
    lessonPlanData = { ...weekData };
    lessonPlanExists = false;
  }

  if (isLoading || isLoadingStaffData) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Select a Class</Typography>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Class Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={className}
            label="Class Name"
            onChange={(e) => setClassName(e.target.value)}
          >
            {classData.data.map((SingleClass) => (
              <MenuItem key={SingleClass.classId} value={SingleClass.classId}>
                {SingleClass.className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <LessonTable
        lessonPlanData={lessonPlanData}
        staffData={staffData}
        lessonPlanExists={lessonPlanExists}
      />
    </Stack>
  );
};

export default LessonPlanHome;
