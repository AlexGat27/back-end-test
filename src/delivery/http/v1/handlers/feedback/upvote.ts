import {Response} from 'express';
import { DeliveryParams } from '@/delivery/types';
import {AuthRequest} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'feedback'>

export type UpvoteFeedbackHandlerType = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildUpvoteFeedbackHandler = ({feedback}: Params): UpvoteFeedbackHandlerType=>{
  return async (req, res)=>{
    const feedbackId = Number(req.params.id);
    const userId = Number(req.user?.id)

    const data = await feedback.upvote({
      feedbackId: feedbackId,
      userId: userId
    });

    return res.status(200).json(data);
  }
}
