import service from '../../instance'
import { BoardRequestPayload, } from './types'



export const board = (payload: BoardRequestPayload) => service.post('board', payload)

export const getBoardAll = () => service.get('board')

export const getBoardById = (id:number) => service.get(`board/${id}`)

export const updateBoard = (payload:BoardRequestPayload) => service.put(`board/${payload.id}?id=${payload.id}`, {title:payload.title, members:payload.members})

export const deleteBoard = (id:number) => service.delete(`board/${id}`)

