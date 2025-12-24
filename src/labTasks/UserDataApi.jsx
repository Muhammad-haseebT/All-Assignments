import axios from "axios";
import React, { useEffect, useState } from "react";

const UserDataApi = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    origin: "",
    meaning: "",
  });
  const [findName, setFindName] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:1627/newData", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("saved data successfully");
  };

  const getUserData = async () => {
    const res = await axios.get(`http://localhost:1627/newData/${findName}`);
    setData(res.data.data);
  };
  return (
    <>
      <div style={{ padding: "50px" }}>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          name="name"
        />
        <br />
        <label htmlFor="gender">Gender</label>
        <input
          type="text"
          required
          value={formData.gender}
          onChange={handleChange}
          name="gender"
        />
        <br />
        <label htmlFor="origin">Origin</label>
        <input
          type="text"
          required
          value={formData.origin}
          onChange={handleChange}
          name="origin"
        />
        <br />
        <label htmlFor="meaning">Meaning</label>
        <input
          type="text"
          required
          value={formData.meaning}
          onChange={handleChange}
          name="meaning"
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </div>

      <label htmlFor="findName">Search by Name</label>
      <input
        type="text"
        required
        value={findName}
        onChange={(e) => setFindName(e.target.value)}
        name="findName"
      />
      <br />
      <button type="button" onClick={getUserData}>
        Get
      </button>

      <h2>Gender: {data?.gender}</h2>
      <h2>Meaning: {data?.meaning}</h2>
    </>
  );
};

export default UserDataApi;
