import {Response} from 'express';
import {AuthRequest} from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>
export type GetStatusesHandlerType = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildGetStatusesHandler = ({feedback}: Params): GetStatusesHandlerType=>{
  return async (req, res)=>{
    const data = await feedback.readStatuses()
    return res.status(200).json(data)
  }
}
