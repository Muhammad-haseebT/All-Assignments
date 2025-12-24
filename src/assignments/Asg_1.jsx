import { Bike, Car } from "lucide-react";
import React, { useState } from "react";

const Asg_1 = () => {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    id: 1,
    regNo: "",
    type: "car",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchRegNo, setSearchRegNo] = useState("");

  const hndleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.regNo || !formData.type) {
      alert("Fill all required fields");
      return;
    }
    const isMatch = vehicles.find((data) => data.regNo == formData.regNo);
    if (isMatch) {
      alert("Vehicle alredy added");
      return;
    }
    let data = {
      id: formData.id++,
      regNo: formData.regNo,
      type: formData.type,
    };
    setVehicles((prevData) => [...prevData, data]);
    setFormData({
      id: 0,
      regNo: "",
      type: "car",
    });
  };

  const filterVehicles = vehicles.filter((data) =>
    data.regNo.toLowerCase().includes(searchRegNo)
  );

  const calculateTotalPrice = (Vehicle) => {
    if (Vehicle.type == "car") {
      setTotalPrice((prev) => prev + 100);
    } else {
      setTotalPrice((prev) => prev + 50);
    }
    setVehicles((prevData) => prevData.filter((data) => data.id != Vehicle.id));
  };
  return (
    <div style={{ border: "2px solid black", padding: "0px 10px" }}>
      <h1 style={{ backgroundColor: "#09dc09" }}>Parking System</h1>
      <h4
        style={{
          border: "2px solid #09dc09",
          borderRadius: "8px",
          padding: "5px",
          color: "#09dc09",
        }}
      >
        Total Earnings: Rs {totalPrice}
      </h4>
      <div style={{ backgroundColor: "#b8cbd2", borderRadius: "8px" }}>
        <input
          style={{ padding: "10px" }}
          type="text"
          placeholder="Registration Number"
          name="regNo"
          value={formData.regNo}
          onChange={hndleChange}
        />
        <br />
        <input
          type="radio"
          name="type"
          id="type"
          value="car"
          onChange={hndleChange}
          checked={formData.type == "car"}
        />
        Car
        <input
          type="radio"
          name="type"
          id="type"
          value="bike"
          onChange={hndleChange}
          checked={formData.type == "bike"}
        />
        Bike
        <br />
        <button
          type="submit"
          onClick={handleSubmit}
          style={{ backgroundColor: "#09dc09" }}
        >
          ParkIn
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#b8cbd2",
          borderRadius: "8px",
          marginTop: "5px",
        }}
      >
        <div>
          <input
            style={{ padding: "10px", width: "-webkit-fill-available" }}
            type="text"
            placeholder="Serach by Registration Number"
            value={searchRegNo}
            onChange={(e) => setSearchRegNo(e.target.value)}
          />
        </div>
        <div className="data">
          {vehicles.length > 0 ? (
            filterVehicles.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px 10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {data.type == "bike" ? <Bike /> : <Car />}
                    <h5>{data.regNo}</h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => calculateTotalPrice(data)}
                    style={{ backgroundColor: "#09dc09" }}
                  >
                    ParkOut
                  </button>
                </div>
              );
            })
          ) : (
            <p>No Vehicle Park</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Asg_1;
