import {AdapterParams} from '@/adapter/types';
import {Prisma} from '@prisma/client'
import {IFeedbackPost} from '@/domain/entity/feedbackPost';

type Params = Pick<AdapterParams, 'db'>

export type GetFeedback = (params:Prisma.FeedbackPostFindFirstArgs)=>Promise<IFeedbackPost | null | never>
export const buildGet = ({db}: Params): GetFeedback =>{
  return async (getParams )=>{
    const feedback = await db.client.feedbackPost.findFirst({
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
      },
    });

    if (!feedback) return null;

    return {
      id: feedback.id,
      title: feedback.title,
      description: feedback.description,
      categoryName: feedback.category.name,
      statusName: feedback.status.name,
      authorEmail: feedback.author.email,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt,
    } as IFeedbackPost | null;
  }
}
