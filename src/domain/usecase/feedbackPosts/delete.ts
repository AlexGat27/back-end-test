import { UseCaseParams } from '../types';
import {IFeedbackPost} from '@/domain/entity/feedbackPost';

type Params = UseCaseParams;

export type FeedbackDelete = (data: {id: number, authorId: number}) => Promise<IFeedbackPost | null>;

export const buildDeleteFeedbackPost = ({ adapter }: Params): FeedbackDelete => (
  async ({id, authorId}) => {
    return await adapter.feedbackRepository.delete({id, authorId});
  }
);