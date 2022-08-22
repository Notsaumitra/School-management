import { Outlet } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import SelectRole from "./Components/SelectRole";
import ClassRoom from "./Components/StaffModule/ClassRoom";

import SingleClass from "./Components/StaffModule/SingleClass";
import PageNotFound from "./Components/Shared/PageNotFound";
import AttendanceView from "./Components/AttendanceModule/AttendanceView";

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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
