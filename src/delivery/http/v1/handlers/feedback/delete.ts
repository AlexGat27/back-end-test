import {Response} from 'express';
import {AuthRequest} from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>
export type DeleteFeedbackType = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildDeleteFeedbackHandler = ({feedback}: Params): DeleteFeedbackType=>{
  return async (req, res)=>{
    const id = Number(req.params.id);
    const authorId = Number(req.user?.id);
    const post = await feedback.deleteFeedback({
      id: id,
      authorId: authorId,
    })

    return res.status(200).json(post)
  }
}
