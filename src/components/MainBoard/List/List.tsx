import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../../Enterence/CustomInput/CustomInput";

import "./List.css";
import { IBoard, ICard } from "../Interfaces/Kanban";

interface ListProps {
  list: IBoard;
  addCard: (boardId: number, title: string) => void;
  removeList: (boardId: number) => void;
  removeCard: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

function List(props: ListProps) {
  const {
    list,
    addCard,
    removeList,
    removeCard,
    onDragEnd,
    onDragEnter,
    updateCard,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="board">
      <div className="board-inner" key={list?.id}>
        <div className="board-header">
          <p className="board-header-title">
            {list?.title}
            <span>{list?.cards?.length || 0}</span>
          </p>
          <div>
                <button onClick={() => removeList(list?.id)}>Delete List</button>
          </div>
        </div>
        <div className="board-cards custom-scroll">
          {list?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={list.id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
            />
          ))}
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value: string) => addCard(list?.id, value)}
          />
        </div>
      </div>
    </div>
  );
}

export default List;
