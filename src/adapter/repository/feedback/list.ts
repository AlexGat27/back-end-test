import { Prisma } from '@prisma/client';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
import { AdapterParams } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type ListFeedback = (params: Prisma.FeedbackPostFindManyArgs) => Promise<Array<IFeedbackPost> | never>;

export const buildList = ({ db }: Params): ListFeedback => {
  return async (getParams) => {
    const feedbackPosts = await db.client.feedbackPost.findMany({
      ...getParams,
      include: {
        category: {
          select: { name: true },
        },
        status: {
          select: { name: true },
        },
        author: {
          select: { email: true },
        },
        _count: {
          select: { upvotes: true },
        },
      },
      orderBy: [
        {
          upvotes: {
            _count: 'desc',
          },
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    // Преобразование данных из Prisma в ваш тип IFeedbackPost
    return feedbackPosts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      authorEmail: post.author.email,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      categoryName: post.category.name,
      statusName: post.status.name,
      upvotesCount: post._count.upvotes,
    })) as Array<IFeedbackPost>;
  };
};
