import {Response} from 'express';
import {AuthRequest} from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>
export type GetFeedback = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildGetFeedbackHandler = ({feedback}: Params): GetFeedback=>{
  return async (req, res)=>{
    const id = Number(req.params.id);
    console.log(id)
    const post = await feedback.readById({
      id: id
    })

    return res.status(200).json(post)
  }
}
