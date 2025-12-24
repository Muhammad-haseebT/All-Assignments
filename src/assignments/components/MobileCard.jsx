import { useState } from "react";
import EditMobileModal from "./EditMobileModal";
import axios from "axios";

export default function MobileCard({mobile,refresh}){
  const [edit,setEdit]=useState(false);

  const del = async ()=>{
    if(confirm("Delete this mobile?")){
      await axios.delete(`http://localhost:1627/mobiles/${mobile._id}`);
      refresh();
    }
  };

  return (
    <>
    <div className="card">
      <img src={`http://localhost:1627/mobiles/${mobile.cover_image}`} />
      <h3>{mobile.model}</h3>
      <p>${mobile.price}</p>
      <div className="actions">
        <button onClick={()=>setEdit(true)}>Edit</button>
        <button className="danger" onClick={del}>Delete</button>
      </div>
    </div>
    {edit && <EditMobileModal mobile={mobile} close={()=>setEdit(false)} refresh={refresh}/>}
    </>
  );
}
