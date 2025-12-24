import React, { useEffect, useState } from "react";
import { db } from "../../db/db";
import Students_Info from "../../labTasks/Students_Info";
import IndexedDB from "../../labTasks/IndexedDB";
import FormData from "../../labTasks/FormData";
import Task1 from "../../labTasks/Task1";
import Students from "./Students";
import Signup from "../pages/Signup";
import AsignSection from "./AsignSection";
import TeacherSide from "./TeacherSide";

const AdminSide = () => {
  const [addSection, setAddSection] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAsignSection, setShowAsignSection] = useState(false);
  const [sectionData, setSectionData] = useState({
    className: "",
    sectionName: "",
  });
  const [users, setUsers] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData({ ...sectionData, [name]: value });
  };
  const handleSave = async () => {
    await db.sections.add(sectionData);
    alert("Section added successfully");
    setAddSection(false);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const getUsers = async () => {
    const data = await db.users.toArray();
    const getData = data.filter((item) => item.email === user.email);
    setUsers(getData || {});
  };

  const handleSection = () => {
    if (!user) {
      alert("user not found");
      return;
    }
    setAddSection(true);
  };
  const handleStudent = () => {
    if (!user) {
      alert("user not found");
      return;
    }
    setAddStudent(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setShowSignup(false);
    window.location.reload();
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(user);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "2px solid gray", padding: "20px" }}>
        <h3 style={{ textTransform: "capitalize" }}>{user?.type} Side</h3>
        {user?.type == "teacher" && (
           <button type="button" onClick={() => setShowAsignSection(true)}>
              Assign Section
            </button>
        )}
        {user?.type == "admin" && (
          <>
            <button type="button" onClick={handleStudent}>
              Add Student
            </button>
            <button type="button" onClick={handleSection}>
              Add Section
            </button>
            <button type="button" onClick={() => setShowAsignSection(true)}>
              Assign Section
            </button>
          </>
        )}
        {!user ? (
          <button type="button" onClick={() => setShowSignup(true)}>
            Sign up
          </button>
        ) : (
          <button type="button" onClick={logout}>
            Logout
          </button>
        )}
      </div>

      {showSignup && <Signup setShowSignup={setShowSignup} />}
      {addStudent && <Students />}
      {showAsignSection && (
        <AsignSection setShowAsignSection={setShowAsignSection} />
      )}

      {user?.type == "teacher" && <TeacherSide />}

      {addSection && (
        <div
          style={{
            marginLeft: "40px",
            border: "2px solid gray",
            padding: "10px",
          }}
        >
          <h3>Add Section</h3>
          ClassName:
          <input
            name="className"
            value={sectionData.className}
            onChange={handleChange}
          />{" "}
          <br />
          SectionName:
          <input
            name="sectionName"
            value={sectionData.sectionName}
            onChange={handleChange}
          />
          <br />
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSide;
