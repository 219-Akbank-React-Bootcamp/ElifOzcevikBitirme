import React from "react";
import { useNavigate } from "react-router";
import Button from "../../Enterence/Button";
import { Navigate, NavLink } from "react-router-dom";
import EditableElement from "../../../contexts/EditableElement/EditableElement";
import { useLoginContext } from "../../../contexts/LoginContext/LoginContext"
import { useBoardContext } from "../../../contexts/BoardContext/BoardContext";
import { useParams } from 'react-router';

const Navbar = ({currentBoard}:any) => {
  const { logout, username } = useLoginContext();
  const { setState, state } = useBoardContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="inline-flex bg-[#3e4891] w-full text-white font-['Libre_Baskerville'] justify-between">
      
      <div className="board-div m-2 flex justify-center font-semibold">
        <span className="material-symbols-outlined">dataset</span>
        <NavLink to="/" end>
          BOARDS
        </NavLink>
      </div>
      <div className="boardName-div m-2 flex justify-center">
      <EditableElement id={id}>
      </EditableElement>
      </div>
      
      <div className="logout-div m-2 flex justify-center font-semibold">
        <span className="material-symbols-outlined">logout</span>
        <Button type="submit" onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
};

export default Navbar;
