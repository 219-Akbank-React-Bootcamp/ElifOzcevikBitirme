import React from "react";
import { useState } from "react";
import { list } from "../../../services/http/patika/endpoints/list";
import { CardFormValuesProps } from "./AddCard.types";

const AddCard = () => {

const handleAddCard = (title:any, listId:any) =>{
  const card={
    title: "Untitled Card",
    listId: 0,
    order: 0,
    description: "",
    duedate: "",
  }
}

  return (
    <div className="w-full h-10 p-2 flex bg-[#2c2923] my-1 rounded-md hover:bg-[#FFF4CF]">
      <span className="material-symbols-outlined">add</span>
    </div>
  );
};

export default AddCard;
