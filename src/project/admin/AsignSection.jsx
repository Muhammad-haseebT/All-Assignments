import React, { use, useEffect, useState } from "react";
import { db } from "../../db/db";

const AsignSection = ({ setShowAsignSection }) => {
  const [formData, setFormData] = useState({
    teacherName: "",
    className: "",
    sectionName: "",
  });
  const [sections, setSections] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadSectionData = async () => {
    const data = await db.sections.toArray();
    setSections(data);
  };

  const handleSubmit = async () => {
    if (!formData.teacherName || !formData.className || !formData.sectionName) {
      alert("Please fill all fields");
      return;
    }
    const section = sections.find(
      (sec) =>
        sec.className === formData.className &&
        sec.sectionName === formData.sectionName
    );
    await db.asignSection.add({
      teacherName: formData.teacherName,
      sectionId: section.id,
    });
    alert("Section assigned successfully");
    setShowAsignSection(false);
  };

  useEffect(() => {
    loadSectionData();
  }, []);
  return (
    <div
      style={{
        marginLeft: "40px",
        border: "2px solid gray",
        padding: "10px",
      }}
    >
      <h3>Assign Section</h3>
      Teacher Name:
      <input
        name="teacherName"
        value={formData.teacherName}
        onChange={handleChange}
      />{" "}
      <br />
      Class:
      <select
        name="className"
        id=""
        value={formData.className}
        onChange={handleChange}
      >
        <option value="">Select ClassName</option>
        {sections.map((item, index) => (
          <option key={index} value={item.className}>
            {item.className}
          </option>
        ))}
      </select>
      <br />
      Section:
      <select
        name="sectionName"
        id=""
        value={formData.sectionName}
        onChange={handleChange}
      >
        <option value="">Select Section Name</option>
        {sections.map((item, index) => (
          <option key={index} value={item.sectionName}>
            {item.sectionName}
          </option>
        ))}
      </select>
      <br />
      <button type="button" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default AsignSection;
