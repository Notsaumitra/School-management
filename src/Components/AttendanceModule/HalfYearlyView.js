import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Stack } from "@mui/material";
import isBefore from "date-fns/isBefore";
import React from "react";

const HalfYearlyView = ({ attendanceDetails }) => {
  const today = new Date();
  const getHalfYearToCompare = () => {
    if (today.getMonth() <= 5) {
      return today.getFullYear();
    }
    return today.getFullYear() + 1;
  };

  let rowAttendanceObj = [];
  const prepareAttendance = () => {
    if (attendanceDetails.length) {
      for (let i = 0; i < attendanceDetails[0].students.length; i++) {
        let studentRowObj = {
          firstName: attendanceDetails[0].students[i].student_id.firstName,
          lastName: attendanceDetails[0].students[i].student_id.lastName,
          studentId: attendanceDetails[0].students[i].student_id.studentId,
          _id: attendanceDetails[0].students[i].student_id._id,
          attendance: [
            {
              present: 0,
              absent: 0,
              sick: 0,
              leave: 0,
            },
            {
              present: 0,
              absent: 0,
              sick: 0,
              leave: 0,
            },
          ],
        };
        rowAttendanceObj.push(studentRowObj);
      }

      for (let j = 0; j < attendanceDetails.length; j++) {
        let dateArr = attendanceDetails[j].date.split("-");
        const halfYear = isBefore(
          new Date(dateArr[0], dateArr[1], dateArr[2]),
          new Date(getHalfYearToCompare(), 0, 1)
        )
          ? 0
          : 1;
        for (let k = 0; k < attendanceDetails[j].students.length; k++) {
          const attendanceType = attendanceDetails[j].students[k].isPresent
            ? "present"
            : attendanceDetails[j].students[k].isAbsent
            ? "absent"
            : attendanceDetails[j].students[k].isSick
            ? "sick"
            : "leave";
          rowAttendanceObj.find(
            (student) =>
              attendanceDetails[j].students[k].student_id.studentId ===
              student.studentId
          ).attendance[halfYear][attendanceType]++;
        }
      }
    }
    console.log(rowAttendanceObj);
  };
  prepareAttendance();

  const getAttendanceTypeCells = () => {
    let attendanceTypeCells = [];
    for (let i = 0; i < 2; i++) {
      attendanceTypeCells = [
        ...attendanceTypeCells,
        "Present",
        "Absent",
        "Sick",
        "Leave",
      ];
    }
    return attendanceTypeCells;
  };

  return (
    <div>
      <Stack mt={10}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow className="attendanceMainHeader">
                <TableCell colSpan={1}> Half Yearly View</TableCell>
                <TableCell align="center" colSpan={4}>
                  H1
                </TableCell>
                <TableCell align="center" colSpan={4}>
                  H2
                </TableCell>
              </TableRow>
              <TableRow className="attendanceSecondaryHeader">
                <TableCell>Name</TableCell>
                {getAttendanceTypeCells().map((cell, index) => (
                  <TableCell key={index} align="center">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowAttendanceObj.map((stu) => (
                <TableRow key={stu.studentId}>
                  <TableCell className="studentNameColumn">
                    {stu.firstName + " " + stu.lastName}
                  </TableCell>
                  {stu.attendance.map((hf, index) => (
                    <React.Fragment key={index}>
                      <TableCell className="presentCell" align="center">
                        {hf.present}/180
                      </TableCell>
                      <TableCell className="absentCell" align="center">
                        {hf.absent}/180
                      </TableCell>
                      <TableCell className="sickCell" align="center">
                        {hf.sick}/180
                      </TableCell>
                      <TableCell className="leaveCell" align="center">
                        {hf.leave}/180
                      </TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
};

export default HalfYearlyView;
