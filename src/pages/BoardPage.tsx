import { BoardFormProps } from "../components/MainBoard/ScrumBoard/ScrumBoard.types"
import { useBoardContext } from "../contexts/BoardContext/BoardContext";
import { useLoginContext } from "../contexts/LoginContext/LoginContext";
import { board } from "../services/http/patika/endpoints/board";
import { useNavigate } from "react-router";
import ScrumBoard from "../components/MainBoard/ScrumBoard";
import { BoardFormValuesProps } from "../components/MainBoard/ScrumBoard/ScrumBoard.types";

const BoardPage = () => {
  const navigate = useNavigate();
  const { getBoards, state,  } = useBoardContext();
  const handleBoardRegister: BoardFormProps["onBoardRegister"] = (values) => {
   
    board.board(values).then(({ data }) => {
      getBoards()
      navigate(`/board/${data.id}`)
    }) 
  };

  return (
      <ScrumBoard onBoardRegister={handleBoardRegister}/>)
};

export default BoardPage;
