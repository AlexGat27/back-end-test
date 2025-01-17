import { AdapterParams, UnknownTx } from '@/adapter/types';
import {IUpvote} from '@/domain/entity/upvote';

type Params = Pick<AdapterParams, 'db'>;

export type UpvoteFeedback = (
  data: {
    userId: number;
    feedbackId: number;
  },
  tx?: UnknownTx
) => Promise<IUpvote | never>;

export const buildUpvote = ({ db }: Params): UpvoteFeedback => {
  return async ({ userId, feedbackId }, tx) => {
    const client = db.getContextClient(tx);
    // Найти существующий пост
    const existingPost = await client.feedbackPost.findFirst({
      where: {
        id: feedbackId,
      },
    });

    if (!existingPost) {
      throw new Error(`Feedback post with ID ${feedbackId} not found`);
    }

    const existingUser = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const existingUpvote = await client.upvote.findFirst({
      where: {
        userId: userId,
        postId: feedbackId
      },
    });

    if (existingUpvote) {
      throw new Error('Этот пользователь уже проголосовал');
    }

    const createUpvote = await client.upvote.create({
      data: {
        userId: userId,
        postId: feedbackId,
      },
      include: {
        user: { select: {email: true }},
        post: { select: {title: true }}
      }
    });

    return {
      id: createUpvote.id,
      userEmail: createUpvote.user.email,
      feedback: createUpvote.post.title
    } as IUpvote;
  };
};
