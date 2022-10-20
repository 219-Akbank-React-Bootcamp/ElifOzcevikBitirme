import {
    Children,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { board } from "../../services/http/patika/endpoints/board";
import {list} from "../../services/http/patika/endpoints/list/index"
import {card} from "../../services/http/patika/endpoints/card/index"
import { StateType, ContextType } from './types'

export const initialState: any = {
  board: [],
  list: [],
  card: [],
}

export const BoardContext = createContext<ContextType>({
  state: initialState,
  setState: () => {},
  dispatches: {},
  getBoards: () => {},
  currentBoard: (id:number)=>{},
  getCards: () => {},
})

export const BoardProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, setState] = useState<StateType>(initialState)
  const dispatches: ContextType['dispatches'] = {}
  useEffect(() => {
    getBoards()
  }, [])

  const getBoards = async() => {
    await board.getBoardAll().then((res) => setState(res.data)) 
  }

  const getCards = async() => {
    await card.getCardAll().then((res) => setState(res.data)) 
  }

  const currentBoard = async(id:number) => {
    await board.getBoardById(id).then((res) => setState(res.data))

    dispatches.addList = (list: any) => {
      setState((prev) => ({
        ...prev,
        list: [...prev.list, list],
      }))
    }
  
    dispatches.addCard = (card: any) => {
      setState((prev) => ({
        ...prev,
        card: [...prev.card, card],
      }))
    }
  }

  

  return (
    <BoardContext.Provider
      value={{
        state,
        dispatches,
        setState,
        getBoards,
        currentBoard,
        getCards
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export const useBoardContext = ()=>{
    return useContext(BoardContext)
}