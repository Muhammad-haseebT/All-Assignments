import axios from "axios";
import React, { useEffect, useState } from "react";

const SignupWithApi = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [profileImage, setprofileImage] = useState(null);
  const [coverImage, setcoverImage] = useState(null);
  const [type, settype] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImages = (e) => {
    const file = e.target.files[0];
    if (e.target.name == "profileImage") {
      setprofileImage(file);
      settype("profile");
    } else if (e.target.name == "coverImage") {
      setcoverImage(file);
      settype("cover");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("profileImage", profileImage);
    data.append("coverImage", coverImage);
    data.append("type", type);

    const res = await axios.post("http://localhost:1627/signup", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("sign up successfully");
    localStorage.setItem("userId", res.data.userId);
    getUserData();
    console.log("data", res.data);
  };

  const getUserData = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:1627/get-signup-data/${id}`);
    setData(res.data);
  };

  useEffect(() => {
    getUserData();
  }, []);
  const imageUrlPath = data?.data?.profileimage?.replace(/\\/g, "/");
  const fullUrl = `http://localhost:1627/${imageUrlPath}`;
  console.log(fullUrl)
  return (
    <>
      <div style={{ padding: "50px" }}>
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
          type="text"
          required
          value={formData.password}
          onChange={handleChange}
          name="password"
        />
        <br />
        Profile Image
        <input
          type="file"
          accept="image/*"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleImages}
        />
        <br />
        Cover Image
        <input
          type="file"
          accept="image/*"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleImages}
        />
        <button type="submit" onClick={handleSubmit}>
          SignUp
        </button>
      </div>

      <img src={fullUrl} alt="No image" />
    </>
  );
};

export default SignupWithApi;
