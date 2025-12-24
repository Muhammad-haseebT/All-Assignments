import React, { useState } from "react";

const Students_Info = () => {
  const [formData, setFormData] = useState({
    regNo: "",
    name: "",
    cgpa: 0,
    gender: "",
  });
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.cgpa ||
      !formData.gender ||
      !formData.name ||
      !formData.regNo
    ) {
      alert("All fields are required");
      return;
    }
    setData((prev) => [...prev, formData]);
    setIsShow(true);
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "2px solid gray", padding: "10px" }}>
        <h3>Student Information</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="regNo">RegNo:</label>
          <input
            type="text"
            name="regNo"
            id=""
            value={formData.regNo}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id=""
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="cgpa">CGPA:</label>
          <input
            type="number"
            name="cgpa"
            id=""
            value={formData.cgpa}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="gender">Gender:</label>
          <input
            type="radio"
            name="gender"
            id=""
            value="Male"
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            id=""
            value="Female"
            onChange={handleChange}
          />
          female
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div
        style={{
          marginLeft: "40px",
          border: "2px solid gray",
          padding: "10px",
        }}
      >
        <h3>Show Information</h3>
        <table border="2">
          <thead>
            <tr>
              <th>RegNo</th>
              <th>Name</th>
              <th>CGPA</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {isShow &&
              data.map((dd) => (
                <tr>
                  <>
                    <td>{dd.regNo}</td>
                    <td>{dd.name}</td>
                    <td>{dd.cgpa}</td>
                    <td>{dd.gender}</td>
                  </>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students_Info;
