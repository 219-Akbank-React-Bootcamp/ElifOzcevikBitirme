import service from '../../instance'
import { ListRequestPayload } from './types'


export const create = (
    payload: ListRequestPayload
  ): Promise<ListRequestPayload> => service.post('list', payload)


export const list = (payload: ListRequestPayload) => service.post('list', payload)
export const getListAll = () => service.get('list')

export const getListA = (boardId:number) => service.get(`list?boardId=${boardId}`)

export const deleteList = (listId:number) => service.delete(`list/${listId}`)
