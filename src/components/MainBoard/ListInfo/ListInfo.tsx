import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

const ListInfo = () => {
  const [showDropDown, setShowDropDown]=useState(false)
  return (
    <div className="p-2 bg-[#FFF4CF] rounded-md inline-flex w-full justify-between mb-1">
      <span className="font-bold font-sans">{}listtitle</span>
      <span className="material-symbols-outlined">more_vert</span>
      <div onClick={()=>setShowDropDown(true)}>{showDropDown && <Dropdown onClose={()=>setShowDropDown(false)}><div><p>Delete List</p></div></Dropdown>}</div>
    </div>
  );
};

export default ListInfo;
