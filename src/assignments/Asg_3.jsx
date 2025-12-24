import { useEffect, useState } from "react";
import AddMobileForm from "./Components/AddMobileForm";
import axios from "axios";
import "./asg_3.css";
import MobileCard from "./Components/MobileCard";

export default function Asg_3() {
  const [mobiles, setMobiles] = useState([]);

  const load = async () => {
    const res = await axios.get("http://localhost:1627/mobiles");
    setMobiles(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Mobile Management System</h1>
      <AddMobileForm refresh={load} />
      <div className="grid">
        {mobiles.map((m) => (
          <MobileCard key={m.id} mobile={m} refresh={load} />
        ))}
      </div>
    </div>
  );
}
