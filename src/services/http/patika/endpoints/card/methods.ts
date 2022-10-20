import service from '../../instance'
import { CardRequestPayload } from './types'

export const create = (
    payload: CardRequestPayload
  ): Promise<CardRequestPayload> => service.post('card', payload)

export const card = (payload: CardRequestPayload) => service.post('card', payload)

export const getCardAll = () => service.get('card')

export const deleteCard = (cardId : number) => service.delete(`card/${cardId}`)

export const updateCard = (id:number, payload:CardRequestPayload) => service.put(`card/${id}`, {title:payload.title, order:payload.order, description:payload.description, duedate:payload.duedate})
