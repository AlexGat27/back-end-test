import {Response} from 'express';
import {AuthRequest} from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>
export type GetCategoriesHandlerType = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildGetCategoriesHandler = ({feedback}: Params): GetCategoriesHandlerType=>{
  return async (req, res)=>{
    const data = await feedback.readCategories()
    return res.status(200).json(data)
  }
}
