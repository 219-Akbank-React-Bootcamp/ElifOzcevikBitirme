import React, { useEffect } from "react";
import { initialState, useBoardContext } from "../../../contexts/BoardContext/BoardContext";
import { ListFormValuesProps } from "./AddList.types";
import { ListFormProps } from "./AddList.types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomInput from "../../Enterence/CustomInput/CustomInput";
import List from "../List/List";
import { ICard, IBoard } from "../Interfaces/Kanban";
import {list} from "../../../services/http/patika/endpoints/list/index";
import {card} from "../../../services/http/patika/endpoints/card/index";
import './AddList.css';

const AddList = (props:any) => {
  const [liste, setListe] = useState<any>([]);
  const { currentBoard,state, getCards } = useBoardContext();
  const [deneme, setDeneme] = useState<any>([]);
  const [arr, setArr] = useState<any>([]);
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });
  const { id } = useParams();
  const boardAppCtx = useBoardContext()
  currentBoard(Number(id));

  list.getListA(Number(id)).then(( res ) => {
    setDeneme(res.data)
  })

  const addboardHandler = (name: string) => {

    list.create({ title:name,
      boardId: Number(id), order: 0 }).then(( data ) => {
        boardAppCtx.dispatches.addList(data)
    })

    const tempList = [...liste];
    tempList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
      boardId: id,
    });
    setListe(tempList);
  };

  const addCardHandler = (id: number, title: string) => {

    card.create({ title:title,
      listId: id}).then(( data ) => {
        boardAppCtx.dispatches.addList(data)
        getCards();
    })


    const boardIndex = liste.findIndex((item: IBoard) => item.id === id);
    if (boardIndex < 0) return;

    const tempList = [...liste];
    tempList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      date: "",
      tasks: [],
      desc: "",
    });
    setListe(tempList);
    
  };

  const removeList = (listId: number) => {

    list.deleteList(listId)



    const boardIndex = liste.findIndex((item: IBoard) => item.id === listId);
    if (boardIndex < 0) return;

    const tempList = [...liste];
    tempList.splice(boardIndex, 1);
    setListe(tempList);
    
  };


  const removeCard = (boardId: number, cardId: number) => {

    card.deleteCard(cardId);




    const boardIndex = liste.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempList = [...liste];
    const cards = tempList[boardIndex].cards;

    const cardIndex = cards.findIndex((item:any) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setListe(tempList);
    
  };

  const onDragEnd = (boardId: number, cardId: number) => {
    const sourceBoardIndex = liste.findIndex(
      (item: IBoard) => item.id === boardId,
    );
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = liste[sourceBoardIndex]?.cards?.findIndex(
      (item:any) => item.id === cardId,
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = liste.findIndex(
      (item: IBoard) => item.id === targetCard.boardId,
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = liste[targetBoardIndex]?.cards?.findIndex(
      (item:any) => item.id === targetCard.cardId,
    );
    if (targetCardIndex < 0) return;

    const tempList = [...liste];
    const sourceCard = tempList[sourceBoardIndex].cards[sourceCardIndex];
    tempList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard,
    );
    setListe(tempList);

    setTargetCard({
      boardId: 0,
      cardId: 0,
    });
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  const updateCard = (boardId: number, cardId: number, card: ICard) => {


    const boardIndex = liste.findIndex((item:any) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempList = [...liste];
    const cards = tempList[boardIndex].cards;

    const cardIndex = cards.findIndex((item:any) => item.id === cardId);
    if (cardIndex < 0) return;

    tempList[boardIndex].cards[cardIndex] = card;

    setListe(tempList);
  };
  
  return (
    <div className="app">
    <div className="app-boards-container">
      <div className="app-boards">
      {deneme.map((item:any) => (
            <List
              key={item.id}
              list={item}
              addCard={addCardHandler}
              removeList={() => removeList(item.id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
            />
          ))}
  

        <div className="app-boards-last">
              <CustomInput
                displayClass="app-boards-add-board"
                editClass="app-boards-add-board-edit"
                placeholder="Enter List Name"
                text="Add List"
                buttonText="Add List"
                onSubmit={addboardHandler}
              />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddList;
