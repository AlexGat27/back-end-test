import {Response} from 'express';
import { DeliveryParams } from '@/delivery/types';
import {AuthRequest} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'feedback'>

export type CreateFeedbackType = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildCreateFeedbackHandler = ({feedback}: Params): CreateFeedbackType=>{
  return async (req, res)=>{
    const authorId = Number(req.user?.id)
    console.log(req.user)

    const data = await feedback.create({
      title: req.body.title,
      description: req.body.description,
      categoryName: req.body.categoryName,
      statusName: req.body.statusName,
      authorId: authorId,
    });

    return res.status(200).json(data);
  }
}
