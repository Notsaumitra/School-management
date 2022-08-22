import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import SelectRole from "./Components/SelectRole";
import ClassRoom from "./Components/StaffModule/ClassRoom";
import { Provider } from "react-redux";
import { store } from "./store";
import SingleClass from "./Components/StaffModule/SingleClass";
import PageNotFound from "./Components/Shared/PageNotFound";
import AttendanceView from "./Components/AttendanceModule/AttendanceView";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
