import { Dispatch, SetStateAction } from "react";

export type StateType = {
    find(arg0: (brd: any) => boolean): unknown;
    id?: any;
    board?: Array<{
      title?: string
      members?:Array}>
    list?: Array<{
      title?: string,
      boardId?:number,
      order?: number,}>
    card?:Array<{
      title?: string,
      listId?:number,
      order?: number,
      description?: string,
      duedate?: Date,
    }>
  }
  
  export type ContextType = {
    state: StateType,
    setState:Dispatch<SetStateAction<StateType | any>>,
    getList: () => void,
  }