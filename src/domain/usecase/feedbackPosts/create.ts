import {UseCaseParams} from '@/domain/usecase/types';
import {InternalError} from '@/domain/errors';
import {IFeedbackPost} from '@/domain/entity/feedbackPost';

export type CreateFeedbackPost = (params: {
    title: string,
    description: string,
    categoryName: string,
    statusName: string,
    authorId: number,
}) => Promise<{ 
    feedback: IFeedbackPost;
}>;

export const buildCreateFeedbackPost = ({ adapter }: UseCaseParams): CreateFeedbackPost => 
  async ({ title, description, categoryName, statusName, authorId }) => {
    const feedback = await adapter.feedbackRepository.create({
      title,
      description,
      categoryName,
      statusName,
      authorId
    });

    if (!feedback) {
      throw new InternalError();
    }

    return {feedback};
  };