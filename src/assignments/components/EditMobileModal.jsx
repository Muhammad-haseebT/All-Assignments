import axios from "axios";
import { useState } from "react";

export default function EditMobileModal({mobile,close,refresh}){
  const [model,setModel]=useState(mobile.model);
  const [price,setPrice]=useState(mobile.price);
  const [cover,setCover]=useState(null);
  const [images,setImages]=useState([]);

  const update = async ()=>{
    const fd=new FormData();
    fd.append("model",model);
    fd.append("price",price);
    if(cover) fd.append("cover",cover);
    images.forEach(i=>fd.append("images",i));
    fd.append("oldCover",mobile.cover_image);

    await axios.put(`http://localhost:1627/mobiles/${mobile._id}`,fd);
    close(); refresh();
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>Edit Mobile</h2>
        <input value={model} onChange={e=>setModel(e.target.value)} />
        <input value={price} type="number" onChange={e=>setPrice(e.target.value)} />
        <input type="file" onChange={e=>setCover(e.target.files[0])}/>
        <input multiple type="file" onChange={e=>setImages([...e.target.files])}/>
        <button onClick={update}>Update</button>
        <button className="danger" onClick={close}>Cancel</button>
      </div>
    </div>
  );
}
