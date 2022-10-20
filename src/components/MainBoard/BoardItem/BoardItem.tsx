import React, { useState } from "react";
import { BoardFormValuesProps } from "./BoardItem.types";
import { useBoardContext } from "../../../contexts/BoardContext/BoardContext";
import { board } from "../../../services/http/patika/endpoints/board/index";
import { useNavigate } from "react-router-dom";

const BoardItem=(props: any) => {
  const { getBoards  } = useBoardContext();
  const [boardFormValues, setBoardFormValues] = useState<BoardFormValuesProps>({
    title: "Untitled Board",
    members: []
  });
  const navigate = useNavigate()

  const handleAddBoard = (e:any) => {
    e.preventDefault()
    props.onBoardRegister(boardFormValues);
  };

  return (
    
    <div className="card" style={{width: "15rem", height: "150px", marginLeft:"20px", marginTop:"10px"}}>
      <div className="card-body">
        <h5 className="card-subtitle mb-2 text-muted flex justify-center content-center" onClick={handleAddBoard}>{props.board.title}</h5>
        <a onClick={() => board.deleteBoard(props.board?.id ).then(() => getBoards())} style={{ marginRight: "50px"}}>Delete</a>
        <button
    onClick={() => navigate(`/board/${props.board?.id}`)}
    type="submit"
    className="card-link"
  >
   Open
  </button>
        </div>
      </div>
  );
};

export default BoardItem;
