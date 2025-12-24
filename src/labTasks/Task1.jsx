import React, { useState } from "react";

const Task1 = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Ali",
      age: 20,
      gender: "Male",
      isAdmin: "no",
      skill: "Java",
    },
    {
      id: 2,
      name: "Raza",
      age: 22,
      gender: "Male",
      isAdmin: "yes",
      skill: "C++",
    },
    {
      id: 3,
      name: "Sana",
      age: 25,
      gender: "female",
      isAdmin: "no",
      skill: "React",
    },
  ]);

  const [formData, setFormData] = useState("all");
  const [skill, setSkill] = useState("");
  const [ageSortAsc, setAgeSortAsc] = useState(true);

  const handleSort = () => {
    setAgeSortAsc((prev) => !prev);
  };

  const filteredAndSortedData = () => {
    let filtered = [...data];

    if (formData === "yes" || formData === "no") {
      filtered = filtered.filter((item) => item.isAdmin === formData);
    }

    if (formData === "skill" && skill.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.skill.toLowerCase().includes(skill.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      return ageSortAsc ? a.age - b.age : b.age - a.age;
    });

    return filtered;
  };

  console.log("filter",filteredAndSortedData)

  return (
    <div>
      <h3>Select Filter</h3>
      <select value={formData} onChange={(e) => setFormData(e.target.value)}>
        <option value="all">All</option>
        <option value="yes">Admin</option>
        <option value="no">Non-Admin</option>
        <option value="skill">Skill</option>
      </select>

      {/* Skill input field */}
      {formData === "skill" && (
        <input
          type="text"
          placeholder="Search by skill..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      )}

      <table border={1} cellPadding={10} style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th style={{ cursor: "pointer" }} onClick={handleSort}>
              {/* Age {ageSortAsc ? "▲" : "▼"} */}
              Age
            </th>
            <th>Gender</th>
            <th>Skill</th>
            <th>IsAdmin</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            filteredAndSortedData?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.skill}</td>
                <td>{item.isAdmin}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Task1;
