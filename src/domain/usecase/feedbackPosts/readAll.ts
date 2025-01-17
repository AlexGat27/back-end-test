import { UseCaseParams } from '../types';
import {IFeedbackPost} from '@/domain/entity/feedbackPost';

type Params = UseCaseParams;

export type FeedbackAll = (data: {
  category?: string,
  status?: string,
  page: number,
  limit: number,
}) => Promise<Array<IFeedbackPost> | null>;

export const buildGetAllFeedbackPost = ({ adapter }: Params): FeedbackAll => (
  async ({category, status, page, limit}) => {
    return await adapter.feedbackRepository.list({
      where: {
        ...(category && {
          category: {
            name: category
          }
        }),
        ...(status && {
          status: {
            name: status
          }
        })
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        status: true
      }
    });
  }
);