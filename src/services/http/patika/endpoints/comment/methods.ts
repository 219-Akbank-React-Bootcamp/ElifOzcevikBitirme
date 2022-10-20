import service from '../../instance'
import { CommentRequestPayload } from './types'


export const create = (
    payload: CommentRequestPayload
  ): Promise<CommentRequestPayload> => service.post('comment', payload)

export const deleteComment = (commentId:number) => service.delete(`comment/${commentId}`)
