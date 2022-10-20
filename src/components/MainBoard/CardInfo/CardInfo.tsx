import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import { initialState, useBoardContext } from "../../../contexts/BoardContext/BoardContext";
import Modal from "../Modal";
import CustomInput from "../../Enterence/CustomInput/CustomInput";
import {card} from "../../../services/http/patika/endpoints/card/index";
import {comment} from "../../../services/http/patika/endpoints/comment/index";
import {check} from "../../../services/http/patika/endpoints/check/index";
import "./CardInfo.css";
import { ICard, ILabel, ITask } from "../Interfaces/Kanban";

interface CardInfoProps {
  onClose: () => void;
  card: ICard;
  boardId: number;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}
function CardInfo(props: CardInfoProps) {
  const {getCards } = useBoardContext();
  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState<ICard>({
    ...props.card,
  });

  const updateTitle = (value: string) => {

    card.updateCard(props.card.id,{
      title: value,
      listId: props.boardId,
    }).then(() => getCards()) 

    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value: string) => {
    comment.create({
      cardId:props.card.id,
      message:value,
    })
    setCardValues({ ...cardValues, desc: value });
  };

  const addTask = (value: string) => {
    check.create({checklistId:1,
    title:value,
    isChecked:false})

    const task: ITask = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({
      ...cardValues,
      tasks: [...cardValues.tasks, task],
    });
  };

  const removeTask = (id: number) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setCardValues({
      ...cardValues,
      tasks: tempTasks,
    });
  };

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({
      ...cardValues,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!cardValues.tasks?.length) return 0;
    const completed = cardValues.tasks?.filter(
      (item) => item.completed,
    )?.length;
    return (completed / cardValues.tasks?.length) * 100;
  };

  const updateDate = (date: string) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, cardValues.id, cardValues);
  }, [cardValues]);


  const calculatedPercent = calculatePercent();

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Comment</p>
          </div>
          <CustomInput
            defaultValue={cardValues.desc}
            text={cardValues.desc || "Add a Comment"}
            placeholder="Enter comment"
            onSubmit={updateDesc}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={cardValues.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className="cardinfo-box-progress-bar">
            <div
              className="cardinfo-box-progress"
              style={{
                width: `${calculatedPercent}%`,
                backgroundColor: calculatedPercent === 100 ? "limegreen" : "",
              }}
            />
          </div>
          <div className="cardinfo-box-task-list">
            {cardValues.tasks?.map((item) => (
              <div key={item.id} className="cardinfo-box-task-checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <CustomInput
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
          />
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
