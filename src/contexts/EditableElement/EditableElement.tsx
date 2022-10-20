import React, { useRef, useEffect, ReactHTMLElement, useState } from "react";
import { EditableElementProps } from "./EditableElement.types";
import { FC } from "react";
import {board} from "../../services/http/patika/endpoints/board/index"
import { useBoardContext } from "../BoardContext/BoardContext";
import Input from "../../components/Enterence/Input";
import { InputProps } from "../../components/Enterence/Input/Input.types";
import { useParams } from "react-router";

const EditableElement = (props: any) => {
  const { getBoards  } = useBoardContext(); 
  const [title, setTitle] = useState("Untitled Board");
  //board.getBoardById(props.id).then((res) => setTitle(res.data.title))
  const handleChange: InputProps["onChange"] = (e, v) => {
    setTitle(v);
    board.updateBoard({
      title: title,
      members: [],
      id: props.id
    }).then(() => getBoards()) 
  };

  return         <Input
  onChange={handleChange}
  value={title}
  type="text"
  style={{ marginBottom: "15px", color:"black" }}
/>
};


export default EditableElement;