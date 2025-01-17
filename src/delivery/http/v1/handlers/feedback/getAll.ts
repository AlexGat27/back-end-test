import {Response} from 'express';
import {AuthRequest} from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>
export type GetFeedbackAll = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildGetFeedbackAllHandler = ({feedback}: Params): GetFeedbackAll=>{
  return async (req, res)=>{
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;

    try {
      // Запрашиваем данные с учетом пагинации
      const data = await feedback.readAll({ category, status, page, limit });
      const totalItems = data?.length ? data.length : 0;

      return res.status(200).json({
        data,
        meta: {
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        },
      });
    } catch (error) {
      // @ts-ignore
      return res.status(500).json({ error: error.message });
    }
  }
}
