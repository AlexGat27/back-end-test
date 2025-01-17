import { UseCaseParams } from '../types';
import {IFeedbackPost} from '@/domain/entity/feedbackPost';

type Params = UseCaseParams;

export type Feedback = (data: {id: number}) => Promise<IFeedbackPost | null>;

export const buildGetByIdFeedbackPost = ({ adapter }: Params): Feedback => (
  async ({id}) => {
    console.log(id)
    return await adapter.feedbackRepository.get({
      where: {
        id
      }
    });
  }
);