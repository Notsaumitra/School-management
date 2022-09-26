import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Yearly = ({ attendanceDetails }) => {
  let rowAttendanceObj = [];
  const prepareAttendance = () => {
    if (attendanceDetails.length) {
      for (let i = 0; i < attendanceDetails[0].students.length; i++) {
        let studentRowObj = {
          firstName: attendanceDetails[0].students[i].student_id.firstName,
          lastName: attendanceDetails[0].students[i].student_id.lastName,
          studentId: attendanceDetails[0].students[i].student_id.studentId,
          _id: attendanceDetails[0].students[i].student_id._id,
          present: 0,
          absent: 0,
          sick: 0,
          leave: 0,
        };
        rowAttendanceObj.push(studentRowObj);
      }

      for (let j = 0; j < attendanceDetails.length; j++) {
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
          )[attendanceType]++;
          // );
        }
      }
    }
  };
  prepareAttendance();
  const getAttendanceTypeCells = () => {
    let attendanceTypeCells = [];
    for (let i = 0; i < 1; i++) {
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
    <div className="viewAttendanceContainer">
      <Stack mt={10}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            style={{ width: "800px" }}
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow className="attendanceMainHeader">
                <TableCell colSpan={1}>Yearly View</TableCell>
                <TableCell align="center" colSpan={4}>
                  Current Year
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
                  <TableCell className="presentCell" align="center">
                    {stu.present}/360
                  </TableCell>
                  <TableCell className="absentCell" align="center">
                    {stu.absent}/360
                  </TableCell>
                  <TableCell className="sickCell" align="center">
                    {stu.sick}/360
                  </TableCell>
                  <TableCell className="leaveCell" align="center">
                    {stu.leave}/360
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
};

export default Yearly;
