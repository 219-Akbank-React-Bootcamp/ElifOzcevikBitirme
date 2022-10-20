import React, { FC, useEffect, useState } from 'react'
import Board from '../components/MainBoard/Board'
import Navbar from '../components/MainBoard/Navbar'
import { useBoardContext } from '../contexts/BoardContext/BoardContext'
import { auth } from "../services/http/patika/endpoints/auth";
import { ListFormProps } from '../components/MainBoard/AddList/AddList.types';
import { useParams } from 'react-router';
export type BoardFormValuesProps = {}

const Layout = () => {
  const { setState, state } = useBoardContext();
  const { id } = useParams()
  const [currentBoard, setCurrentBoard] = useState(null)
  useEffect(() => {
    const selectedBoard:any = state.find((brd:any) => id == brd.id )
    setCurrentBoard(selectedBoard)
  }, [])

  return (
    <div>
      <Navbar currentBoard={currentBoard} />
      <Board />
      
    </div>
  )
}

export default Layout