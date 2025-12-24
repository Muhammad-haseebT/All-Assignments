import { useState } from "react";
import "./App.css";
import Welcome from "./Welcome";
import { States } from "./States";
// import Students_Info from "./Students_Info";
import Asg_1 from "./assignments/Asg_1";
import FormData from "./labTasks/FormData";
import EmployeeForm from "./labTasks/EmployeeForm";
import Task1 from "./labTasks/Task1";
import IndexedDB from "./labTasks/IndexedDB";
import Home from "./project/pages/Home";
import StudentsDataWithDB from "./labTasks/StudentsDataWithDB";
import AdminSide from "./project/admin/AdminSide";
import Asg_2 from "./assignments/Asg_2";
import SignupWithApi from "./labTasks/SignupWithApi";
import UserDataApi from "./labTasks/UserDataApi";
import Asg_3 from "./assignments/Asg_3";

function App() {
  return (
    <>
      {/* <Welcome name="Zaman Ali" /> */}
      {/* <States /> */}
      {/* <Students_Info /> */}
      {/* <Asg_1/> */}
      {/* <FormData /> */}
      {/* <EmployeeForm /> */}
      {/* <Task1/> */}
      {/* <IndexedDB /> */}
      {/* <Home/> */}
      {/* <StudentsDataWithDB /> */}
      {/* <AdminSide/> */}
      {/* <Asg_2 /> */}
      {/* <SignupWithApi /> */}
      {/* <UserDataApi/> */}
      <Asg_3/>
    </>
  );
}

export default App;
