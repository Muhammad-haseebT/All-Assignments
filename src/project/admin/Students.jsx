import React, { useEffect, useState } from "react";
import { db } from "../../db/db";

const Students = () => {
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    class: "",
    age: "",
    cgpa: "",
  });
  const [sectionData, setSectionData] = useState([]);
  const [data, setData] = useState([]);
  const [cgpaAvg, setAvgCgpa] = useState(0);
  // const [ageAvg, setAgeAvg] = useState(0);
  const [ageAvg, setAgeAvg] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.age ||
      !formData.name ||
      !formData.cgpa ||
      !formData.section ||
      !formData.class
    ) {
      alert("All fields are required");
      return;
    }
    await db.students.add({
      ...formData,
      cgpa: parseFloat(formData.cgpa),
      age: parseFloat(formData.age),
    });
    setFormData({
      name: "",
      age: "",
      cgpa: "",
    });
    getStudents();
  };

  const getSectionsData = async () => {
    const data = await db.sections.toArray();
    setSectionData(data);
  };

  const getStudents = async () => {
    const data = await db.students.toArray();
    setData(data);
  };

  const handlelAverage = () => {
    const sumOfCgpa = data.reduce((sum, students) => (sum += students.cgpa), 0);
    const count = data.length;
    const avg = parseFloat(sumOfCgpa / count);
    const sumOfAge = data.reduce((sum, std) => (sum += std.age), 0);
    const ageAvg = parseFloat(sumOfAge / count);
    // const sumOfNames = data.reduce((sum, std) => (sum += std.name.length), 0);
    // const nameAvg = parseFloat(sumOfNames / count);
    setAgeAvg(ageAvg);
    setAvgCgpa(avg);
  };

  useEffect(() => {
    getSectionsData();
  }, []);

  useEffect(() => {
    getStudents();
  }, []);

  console.log("section data",sectionData)
  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "2px solid gray", padding: "20px" }}>
        <h3>Student Information</h3>
        <form onSubmit={handleSubmit}>
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
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            name="age"
            id=""
            value={formData.age}
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
          Section:
          <select
            name="section"
            id="section"
            value={formData.section}
            onChange={handleChange}
          >
            <option value="">Select Section</option>
            {sectionData.map((item, index) => (
              <option value={item.sectionName} key={index}>
                {item.sectionName}
              </option>
            ))}
          </select>
          <br/>
          Class:
          <select
            name="class"
            id="class"
            value={formData.cgpaAvg}
            onChange={handleChange}
          >
             <option value="">Select Class</option>
            {sectionData.map((item, index) => (
              <option value={item.className} key={index}>
                {item.className}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
          <button type="button" onClick={handlelAverage}>
            View Average
          </button>
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
        <h4>Average Cgpa:{cgpaAvg.toFixed(2)}</h4>
        <h4>Average Age:{ageAvg.toFixed(2)}</h4>
        {/* <h4>Average Names Length:{ageAvg.toFixed(2)}</h4> */}
        <table border="2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>CGPA</th>
              <th>Section</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dd) => (
              <tr>
                <>
                  <td>{dd.name}</td>
                  <td>{dd.age}</td>
                  <td>{dd.cgpa}</td>
                  <td>{dd.section}</td>
                  <td>{dd.class}</td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
