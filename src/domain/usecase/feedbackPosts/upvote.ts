import {UseCaseParams} from '@/domain/usecase/types';
import {InternalError} from '@/domain/errors';
import {IUpvote} from '@/domain/entity/upvote';

export type UpvoteFeedbackPost = (params: {
  feedbackId: number,
  userId: number
}) => Promise<{
  upvote: IUpvote;
}>;

export const buildUpvoteFeedbackPost = ({ adapter }: UseCaseParams): UpvoteFeedbackPost =>
  async ({ feedbackId, userId }) => {
    const upvote = await adapter.feedbackRepository.upvote({
      userId,
      feedbackId,
    });

    if (!upvote) {
      throw new InternalError();
    }

    return {upvote};
  };
