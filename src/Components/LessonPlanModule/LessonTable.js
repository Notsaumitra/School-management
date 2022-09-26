import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Button,
  Box,
  Modal,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./LessonTable.css";
import {
  useAddLessonPlanMutation,
  useUpdateLessonPlanMutation,
} from "../../services/lessonPlanApiSlice";

const LessonTable = ({ staffData, lessonPlanData, lessonPlanExists }) => {
  const [addLessonPlan] = useAddLessonPlanMutation();
  const [updateLessonPlan] = useUpdateLessonPlanMutation();
  console.log(lessonPlanData);
  const [lessonState, setLessonState] = useState({
    modalOpen: false,
    activeDay: "",
    activeTimeSlot: "",
    activeSubject: "",
    activeTeacher: "",
    lessonWeeklyData: { ...lessonPlanData },
    isSubjectChanged: false,
  });

  useEffect(() => {
    setLessonState((prevState) => ({
      ...prevState,
      lessonWeeklyData: { ...lessonPlanData },
    }));
  }, [lessonPlanData]);

  const handleOpen = (periodTime, subject, taughtBy, day) => {
    console.log(periodTime, subject, taughtBy, day);
    setLessonState((prevState) => ({
      ...prevState,
      activeTimeSlot: periodTime,
      activeSubject: subject || "",
      activeTeacher: taughtBy || "",
      activeDay: day,
      modalOpen: true,
    }));
  };
  const handleClose = () => {
    setLessonState((prevState) => ({ ...prevState, modalOpen: false }));
  };

  const onLessonPlanChanged = () => {
    // let lessonCopydata = { ...lessonState.lessonWeeklyData };
    let lessonCopydata = JSON.parse(
      JSON.stringify(lessonState.lessonWeeklyData)
    );
    let dayFoundIndex = lessonCopydata.days.findIndex(
      (day) => day.dayName === lessonState.activeDay
    );
    let timeSlotIndex;
    if (dayFoundIndex > -1) {
      timeSlotIndex = lessonCopydata.days[dayFoundIndex].timeSlot.findIndex(
        (time) => time.periodTime === lessonState.activeTimeSlot
      );
    }
    if (timeSlotIndex > -1) {
      lessonCopydata.days[dayFoundIndex].timeSlot[timeSlotIndex].subject =
        lessonState.activeSubject;
      let teacherData = staffData.staffData.find(
        (teacher) => teacher._id === lessonState.activeTeacher
      );
      lessonCopydata.days[dayFoundIndex].timeSlot[timeSlotIndex].taughtBy =
        teacherData;
    }
    setLessonState((prevState) => ({
      ...prevState,
      lessonWeeklyData: { ...lessonCopydata },
      isSubjectChanged: true,
      modalOpen: false,
    }));
  };

  return (
    <>
      <Stack mt={3} mb={2}>
        <Modal
          open={lessonState.modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "#d9d9d9",
              border: "1px solid #000",
              borderRadius: "10px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lessonState.activeSubject}
                  label="Subject"
                  onChange={(e) =>
                    setLessonState((prevState) => ({
                      ...prevState,
                      activeSubject: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Physics">Physics</MenuItem>
                  <MenuItem value="Chemistry">Chemistry</MenuItem>
                  <MenuItem value="Maths">Maths</MenuItem>
                  <MenuItem value="Biology">Biology</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Teacher</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lessonState.activeTeacher}
                  label="Teacher"
                  onChange={(e) =>
                    setLessonState((prevState) => ({
                      ...prevState,
                      activeTeacher: e.target.value,
                    }))
                  }
                >
                  {staffData &&
                    staffData.staffData.map((staff) => (
                      <MenuItem key={staff._id} value={staff._id}>
                        {staff.firstName + " " + staff.lastName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Stack direction="row" justifyContent="center" spacing={3}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={onLessonPlanChanged}
                  disabled={
                    !(lessonState.activeSubject && lessonState.activeTeacher)
                  }
                >
                  Add
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            style={{ width: "800px" }}
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow className="attendanceMainHeader">
                <TableCell colSpan={7} align="center">
                  Lesson Plan
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessonState.lessonWeeklyData.days.map((singleDay) => (
                <TableRow key={singleDay.dayName}>
                  <TableCell align="left">{singleDay.dayName}</TableCell>
                  {singleDay.timeSlot.map((time) => (
                    <TableCell
                      className="timeCellContainer"
                      sx={{ border: "solid 1px #D9D9D9", height: "50px" }}
                      align="center"
                      onClick={() =>
                        handleOpen(
                          time.periodTime,
                          time.subject,
                          time.taughtBy._id,
                          singleDay.dayName
                        )
                      }
                      key={time.periodTime}
                      style={
                        time.subject === "Physics"
                          ? { backgroundColor: "#2196f3" }
                          : time.subject === "Chemistry"
                          ? { backgroundColor: "#00bcd4" }
                          : time.subject === "Maths"
                          ? { backgroundColor: "#ffc107" }
                          : time.subject === "Biology"
                          ? { backgroundColor: "#388e3c" }
                          : time.subject === "Hindi"
                          ? { backgroundColor: "#673ab7" }
                          : time.subject === "English"
                          ? { backgroundColor: "#e91e63" }
                          : { backgroundColor: "grey" }
                      }
                    >
                      <span className="timeCellSubject">
                        {time.subject || "Add Subject"}
                      </span>
                      <br />
                      <span className="timeCellTeacher">
                        {time.taughtBy?.firstName
                          ? time.taughtBy.firstName +
                            " " +
                            time.taughtBy.lastName
                          : "Add teacher"}
                      </span>
                      <br />
                      <span className="timeNameCell">{time.periodTime}</span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      {lessonPlanExists ? (
        <Button
          color="warning"
          variant="contained"
          onClick={() => updateLessonPlan(lessonState.lessonWeeklyData)}
          disabled={!lessonState.isSubjectChanged}
        >
          Edit Lesson Plan
        </Button>
      ) : (
        <Button
          color="success"
          variant="contained"
          onClick={() => addLessonPlan(lessonState.lessonWeeklyData)}
        >
          Add Lesson Plan
        </Button>
      )}
    </>
  );
};

export default LessonTable;
