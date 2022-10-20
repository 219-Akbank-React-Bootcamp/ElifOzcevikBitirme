import service from '../../instance'
import { CheckRequestPayload } from './types'


export const create = (
    payload: CheckRequestPayload
  ): Promise<CheckRequestPayload> => service.post('checklist-item', payload)

export const deleteCheck = (checkId:number) => service.delete(`checklist-item/${checkId}`)
