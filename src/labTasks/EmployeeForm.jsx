import React, { useState } from "react";

const EmployeeForm = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    emailId: "",
    email: "",
    salary: "",
    gender: "Male",
    experience: "",
    isAgree: false,
    country: "",
    city: "",
    division: "",
  });

  const [updateData, setUpdateData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchData, setSearchData] = useState(null);

  const countries = [
    { code: "92", name: "Pakistan" },
    { code: "91", name: "India" },
    { code: "1", name: "United States" },
  ];

  const cities = [
    { code: "44000", name: "Islamabad", countryCode: "92" },
    { code: "54000", name: "Lahore", countryCode: "92" },
    { code: "110001", name: "Delhi", countryCode: "91" },
    { code: "400001", name: "Mumbai", countryCode: "91" },
    { code: "10001", name: "New York", countryCode: "1" },
    { code: "90001", name: "Los Angeles", countryCode: "1" },
  ];

  const division = [
    { name: "satellite town", code: "44000" },
    { name: "6th road", code: "44000" },
    { name: "hall road", code: "54000" },
    { name: "london", code: "1" },
    { name: "nathiya gali", code: "110001" },
  ];

  const filteredCities = cities.filter(
    (c) =>
      (isUpdate ? updateData?.country : formData.country) &&
      c.countryCode === (isUpdate ? updateData?.country : formData.country)
  );

  const filterDivisions = division.filter(
    (c) =>
      (isUpdate ? updateData?.city : formData.city) &&
      c.code === (isUpdate ? updateData?.city : formData.city)
  );

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    if (isUpdate) {
      setUpdateData({ ...updateData, [name]: updatedValue });
    } else {
      setFormData({ ...formData, [name]: updatedValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.isAgree) {
      setData((prevData) => [...prevData, formData]);
      setFormData({
        emailId: "",
        email: "",
        salary: "",
        gender: "Male",
        experience: "",
        isAgree: false,
        country: "",
        city: "",
        division: "",
      });
    } else {
      alert("If you agree then submit the form");
    }
  };

  const handleDelete = (emp) => {
    setData((prevData) => prevData.filter((e) => e.emailId !== emp.emailId));
    alert("Employee Deleted");
  };

  const handleEdit = (emp) => {
    setUpdateData(emp);
    setIsUpdate(true);
  };

  const handleUpdateData = () => {
    setData((prev) =>
      prev.map((e) => (e.emailId === updateData.emailId ? updateData : e))
    );
    setIsUpdate(false);
    setUpdateData(null);
  };
  const [sort, setSort] = useState(false);
  const filterBySearch = data.filter((e) => {
    const isMatch =
      e.emailId.toLowerCase().includes(searchData) ||
      e.email.toLowerCase().includes(searchData) ||
      e.salary.toLowerCase().includes(searchData) ||
      e.gender.toLowerCase().includes(searchData) ||
      e.experience.toLowerCase().includes(searchData) ||
      e.country.toLowerCase().includes(searchData) ||
      e.city.toLowerCase().includes(searchData) ||
      e.division.toLowerCase().includes(searchData);
    const isSort =
      sort == false
        ? data.sort((a, b) => Number(a.salary) - Number(b.salary))
        : data.sort((a, b) => Number(b.salary) - Number(a.salary));
    // if (sort == false) {
    //   console.log("false", sort);
    //   return data.sort((a, b) => Number(a.salary) - Number(b.salary));
    // } else if (sort == true) {
    //   console.log("true");
    //   return data.sort((a, b) => Number(b.salary) - Number(a.salary));
    // }
    return isMatch && isSort;
  });

  return (
    <>
      <h2>Employee Form</h2>
      <form onSubmit={isUpdate ? handleUpdateData : handleSubmit}>
        <label htmlFor="emailId">Email Id</label>
        <input
          type="text"
          name="emailId"
          id="emailId"
          value={isUpdate ? updateData.emailId : formData.emailId}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="email">Email Name</label>
        <input
          type="text"
          name="email"
          id="email"
          value={isUpdate ? updateData.email : formData.email}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          name="salary"
          id="salary"
          value={isUpdate ? updateData.salary : formData.salary}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="experience">Experience</label>
        <input
          type="text"
          name="experience"
          id="experience"
          value={isUpdate ? updateData.experience : formData.experience}
          onChange={handleChange}
        />
        <br />

        <label>Gender</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={
              (isUpdate ? updateData.gender : formData.gender) === "Male"
            }
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={
              (isUpdate ? updateData.gender : formData.gender) === "Female"
            }
            onChange={handleChange}
          />
          Female
        </label>
        <br />

        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          value={isUpdate ? updateData.country : formData.country}
          onChange={(e) => {
            const newCountry = e.target.value;
            if (isUpdate) {
              setUpdateData((prev) => ({
                ...prev,
                country: newCountry,
                city: "",
              }));
            } else {
              setFormData((prev) => ({
                ...prev,
                country: newCountry,
                city: "",
              }));
            }
          }}
        >
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="city">City</label>
        <select
          name="city"
          id="city"
          disabled={!(isUpdate ? updateData.country : formData.country)}
          value={isUpdate ? updateData.city : formData.city}
          onChange={handleChange}
        >
          <option value="">-- Select City --</option>
          {filteredCities.map((city) => (
            <option key={city.code} value={city.code}>
              {city.name}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="division">Divisions</label>
        <select
          name="division"
          id="division"
          disabled={!(isUpdate ? updateData.city : formData.city)}
          value={isUpdate ? updateData.division : formData.division}
          onChange={handleChange}
        >
          <option value="">-- Select Division --</option>
          {filterDivisions.map((division) => (
            <option key={division.code} value={division.code}>
              {division.name}
            </option>
          ))}
        </select>
        <br />

        <label>
          <input
            type="checkbox"
            name="isAgree"
            checked={isUpdate ? updateData.isAgree : formData.isAgree}
            onChange={handleChange}
          />
          I agree
        </label>
        <br />

        {isUpdate ? (
          <>
            <button type="button" onClick={handleUpdateData}>
              Update
            </button>
            <button type="button" onClick={() => setIsUpdate(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>

      <label htmlFor="search">
        Search By ID,name,email,salary,experience,gender,country,city,division
      </label>
      <input
        type="text"
        id="search"
        placeholder="search here...."
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
      />

      <h3>Employee List</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Email ID</th>
            <th>Email</th>
            <th style={{ cursor: "pointer" }} onClick={() => setSort(!sort)}>
              Salary
            </th>
            <th>Experience</th>
            <th>Gender</th>
            <th>Country</th>
            <th>City</th>
            <th>Agreement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterBySearch.map((item, i) => (
            <tr key={i}>
              <td>{item.emailId}</td>
              <td>{item.email}</td>
              <td>{item.salary}</td>
              <td>{item.experience}</td>
              <td>{item.gender}</td>
              <td>{item.country}</td>
              <td>{item.city}</td>
              <td>{item.isAgree ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                <button onClick={() => handleDelete(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeForm;
