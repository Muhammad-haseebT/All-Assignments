import { useState } from "react";

export const States = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    skill: ['OOP'],
    cities: "",
  });
  const [isShow, setIsShow] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const updatedSkills = formData.skill.includes(value)
        ? formData.skill.filter((skill) => skill !== value)
        : [...formData.skill, value];

      setFormData({
        ...formData,
        skill: updatedSkills,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all the fields");
      return;
    }
    // alert(`Name: ${formData.name}, Email: ${formData.email}, Password: ${formData.password}`);
    setIsShow(true);
  };

  const skills = ["C#", "OOP", "DSA", "MAP"];
  const cities = ["Gujranwala", "Islamabad", "Rawalpindi", "Lahore"];
  return (
    <>
      <h1>Enter your detail</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <input
          type="radio"
          value="male"
          name="gender"
          onChange={handleChange}
        />
        Male
        <input
          type="radio"
          value="female"
          name="gender"
          onChange={handleChange}
        />
        Female
        <br />
        {skills?.map((skill, index) => (
          <>
            <input
              key={index}
              type="checkbox"
              name={skill}
              checked={formData.skill.includes(skill)}
              id="skills"
              value={skill}
              
              onChange={handleChange}
            />
            {skill}
          </>
        ))}
        <br />
        <select name="cities" id="cities" onChange={handleChange}>
          {cities.map((city, index) => (
            <option value={city} key={index}>
              {city}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>

      {isShow && (
        <p>
          <span style={{ fontWeight: "bold" }}>Your name:</span> {formData.name}
          , <span style={{ fontWeight: "bold" }}>email:</span> {formData.email}{" "}
          , <span style={{ fontWeight: "bold" }}>password:</span>{" "}
          {formData.password}, gender: {formData.gender} and skills:{" "}
          {formData.skill?.join(",")}, Cities: {formData.cities}
        </p>
      )}
    </>
  );
};
