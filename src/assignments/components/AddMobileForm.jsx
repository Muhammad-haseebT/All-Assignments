import axios from "axios";
import { useState } from "react";

export default function AddMobileForm({ refresh }) {
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);

  const submit = async () => {
    if (!model || !price || !cover) return alert("All fields required");

    const fd = new FormData();
    fd.append("model", model);
    fd.append("price", price);
    fd.append("cover", cover);
    images.forEach((i) => fd.append("images", i));

    await axios.post("http://localhost:1627/mobiles", fd);
    setModel("");
    setPrice("");
    setCover(null);
    setImages([]);
    refresh();
  };

  return (
    <div className="glass form">
      <h2>Add Mobile</h2>
      <input
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label className="upload">
        Cover Image
        <input
          type="file"
          hidden
          onChange={(e) => setCover(e.target.files[0])}
        />
      </label>

      <label className="upload">
        Additional Images
        <input
          multiple
          type="file"
          hidden
          onChange={(e) => setImages([...e.target.files])}
        />
      </label>

      <button onClick={submit}>Save Mobile</button>
    </div>
  );
}
