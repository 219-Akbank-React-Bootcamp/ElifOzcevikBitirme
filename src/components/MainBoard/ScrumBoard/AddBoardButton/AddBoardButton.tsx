
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useBoardContext } from "../../../../contexts/BoardContext/BoardContext";



const AddBoardButton=({boardInfo}: any) => {
  const navigate = useNavigate()
  const { setState, state } = useBoardContext();
  return (
    <button
    onClick={() => navigate(`/board/${boardInfo.id}`)}
    type="submit"
    className="h-32 w-32 bg-[#FFCB42] border border-solid-6 hover:bg-[#FFB200] hover:underline rounded border-[#277BC0] text-xs m-6 font-bold text-[#275378]"
  >
   {boardInfo.title}
  </button>
  );
};

export default AddBoardButton;
