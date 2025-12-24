import React, { useState } from "react";
import { db } from "../../db/db";

const Signup = ({ setShowSignup }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "admin",
    contact: "",
    address: "",
    isAgree: false,
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { type, value, name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      isAgree,
      password,
      confirmPassword,
      fullName,
      email,
      contact,
      address,
      type,
    } = formData;

    console.log(formData);

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !contact ||
      !address ||
      !type
    ) {
      alert("required all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("validate your email");
      return;
    }
    if (password !== confirmPassword) {
      alert("password is not match");
      return;
    }

    await db.users.add(formData);
    setData((prevData) => [...prevData, formData]);

    alert("User added");
    console.log("added", formData);

    localStorage.setItem("user", JSON.stringify(formData));
    setShowSignup(false);

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "admin",
      contact: "",
      address: "",
      isAgree: false,
    });
  };

  return (
    <>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          name="email"
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          name="password"
        />
        <br />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
        />
        <br />

        <label htmlFor="type">Type</label>
        <select
          name="type"
          id="type"
          required
          value={formData.type}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <br />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          required
          value={formData.contact}
          onChange={handleChange}
          name="contact"
        />
        <br />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          required
          value={formData.address}
          onChange={handleChange}
          name="address"
        />
        <br />

        <label htmlFor="isAgree">isAgree</label>
        <input
          type="checkbox"
          name="isAgree"
          required
          onChange={handleChange}
          checked={formData.isAgree}
        />
        <br />

        <button type="submit" onClick={handleSubmit}>
          SignUp
        </button>
      </div>
    </>
  );
};

export default Signup;
