import React, { useEffect, useState } from "react";
import { db } from "../../db/db";

const TeacherSide = () => {
  const [sectionsData, setSectionsData] = useState([]);
  const [studentData, setStudentData] = useState(null);

  const loadSectionData = async () => {
    const assignedSections = await db.asignSection.toArray();
    console.log("assigned",assignedSections)
    const mergedData = await Promise.all(
      assignedSections.map(async (item) => {
        try {
          const section = await db.sections.get(item.sectionId);
          console.log("section",section)
          return { ...item, ...section };
        } catch (err) {
          console.error("Error merging item:", err);
          return item;
        }
      })
    );
    console.log("mergerd",mergedData)
    setSectionsData(mergedData);
  };

  const filterData = async (item) => {
    // const data = await Promise.all(
    //   db.students.get({
    //     className: item.className,
    //     sectionName: item.sectionName,
    //   })
    // );
    const data = await db.students.toArray();
    const filtered = data.find(
      (std) => std.class === item.className && std.section === item.sectionName
    );
    setStudentData(filtered);
  };

  useEffect(() => {
    loadSectionData();
  }, []);

  return (
    <div style={{ marginLeft: "30px", border: "2px solid gray", padding:"10px" }}>
      <h2>Teacher Side</h2>

      {sectionsData.map((item, i) => (
        <button type="button" key={i} onClick={() => filterData(item)}>
          {item.className}-{item.sectionName}
        </button>
      ))}

      {studentData ? (
        <>
          <h4>Student Name: {studentData.name}</h4>
          <p>Section Name: {studentData.section}</p>
          <p>Class Name: {studentData.class}</p>
        </>
      ) : (
        <p>No student data available</p>
      )}
    </div>
  );
};

export default TeacherSide;
