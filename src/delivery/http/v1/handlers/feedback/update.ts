import {Response} from 'express';
import { DeliveryParams } from '@/delivery/types';
import {AuthRequest} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'feedback'>

export type UpdateFeedbackHandlerType = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildUpdateFeedbackHandler = ({feedback}: Params): UpdateFeedbackHandlerType=>{
  return async (req, res)=>{
    const id = Number(req.params.id);
    const authorId = Number(req.user?.id)
    const data = await feedback.update({
      id: id,
      title: req.body.title,
      description: req.body.description,
      categoryName: req.body.categoryName,
      statusName: req.body.statusName,
      authorId: authorId,
    });

    return res.status(200).json(data);
  }
}
