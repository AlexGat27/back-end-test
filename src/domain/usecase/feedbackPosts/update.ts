import {UseCaseParams} from '@/domain/usecase/types';
import {InternalError} from '@/domain/errors';
import {IFeedbackPost} from '@/domain/entity/feedbackPost';

export type UpdateFeedbackPost = (params: {
  id: number,
  title?: string,
  description?: string,
  categoryName?: string,
  statusName?: string,
  authorId: number,
}) => Promise<{
  feedback: IFeedbackPost;
}>;

export const buildUpdateFeedbackPost = ({ adapter }: UseCaseParams): UpdateFeedbackPost =>
  async ({ id, title, description, categoryName, statusName, authorId }) => {
    const feedback = await adapter.feedbackRepository.update({
      id,
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
